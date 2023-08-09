/* eslint-disable no-use-before-define */
// GTM EVENTS

import { generateId } from './utils';

class GTMEvents {
  constructor() {
    this.scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight,
    );
    this.clientHeight = document.documentElement.clientHeight;
    this.fullEventData = {};
    this.scrollGtm = new Set([10, 30, 50, 70, 90]);
  }

  /**
  * @param {MouseEvent} event
  */
  handleClick(event) {
    const className = 'js-gtm-event';
    const target = (event.target.classList.contains(className))
      ? event.target
      : event.target.closest(`.${className}`);

    if (target) {
      const eventBlock = target;
      const clickEventData = {
        eventAction: 'click',
        eventLabel: eventBlock.getAttribute('data-event') || null,
        eventLocation: eventBlock.getAttribute('data-section') || null,
        eventContext: eventBlock.getAttribute('data-context') || null,
        eventCategory: eventBlock.getAttribute('data-event-category') || 'Interactions',
      };

      this.gaPush(clickEventData);
    }
  }

  handleScroll() {
    const currentPos = 100 * (window.scrollY / (this.scrollHeight - this.clientHeight));
    this.scrollEvt(currentPos);
  }

  /**
  * @param {number} scrollPos
  */
  scrollEvt(scrollPos) {
    this.scrollGtm.forEach((point) => {
      if (scrollPos >= point) {
        this.scrollGtm.delete(point);
        this.scrollEventPush(point);
      }
    });
  }

  /**
   * @param {number} scrolledPercent
   */
  scrollEventPush(scrolledPercent) {
    const scrollEventData = {
      eventAction: 'scroll',
      eventLabel: `scrollPage-${scrolledPercent}%`,
      eventCategory: 'Interactions',
    };
    this.gaPush(scrollEventData); // console.log(scrollEventData)
  }

  gaPush(eventData) {
    this.fullEventData = {
      eventLabel: eventData.eventLabel,
      eventLocation: eventData.eventLocation || null, // data-section
      eventContext: eventData.eventContext || null,
      hitsTime: Date.now(),
      requestId: generateId(7),
      firingOptions: 'onesPerEvent',
      event: 'event',
      eventStream: 'flight',
      eventAction: eventData.eventAction,
      eventCategory: eventData.eventCategory,
      eventContent: eventData.eventContent || null,
      eventValue: eventData.eventValue || null,
      ecommerce: null,
      ecommerceAction: false,
      noninteraction: false,
    };

    try {
      dataLayer.push(this.fullEventData);
    } catch (e) {
      console.log(this.fullEventData);
    }
  }

  addEventListeners() {
    document.body.addEventListener('click', this.handleClick.bind(this));
    document.addEventListener('scroll', () => {
      this.handleScroll();
    });
  }
}

export default GTMEvents;
