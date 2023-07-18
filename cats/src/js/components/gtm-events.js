/* eslint-disable no-use-before-define */
// GTM EVENTS
export function gtmSet() {
  // click event
  document.body.addEventListener('click', (event) => {
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

      gaPush(clickEventData);
    }
  });

  /// scroll event
  let pageScrolling = false;
  const scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight,
  );

  const { clientHeight } = document.documentElement;

  document.addEventListener('scroll', () => {
    const currentPos = 100 * (window.scrollY / (scrollHeight - clientHeight));

    if (!pageScrolling) {
      window.requestAnimationFrame(() => {
        scrollEvt(currentPos);
        pageScrolling = false;
      });
      pageScrolling = true;
    }
  });
  const scrollGtm = {
    10: '', 30: '', 50: '', 70: '', 90: '',
  };
  function scrollEvt(scrollPos) {
    const points = Object.keys(scrollGtm);
    points.forEach((point) => {
      if (scrollPos >= point) {
        delete scrollGtm[point];
        scrollEventPush(point);
      }
    });
  }

  function scrollEventPush(scrolledPercent) {
    const scrollEventData = {
      eventAction: 'scroll',
      eventLabel: `scrollPage-${scrolledPercent}%`,
      eventCategory: 'Interactions',
    };
    gaPush(scrollEventData); // console.log(scrollEventData)
  }
}

export function gaPush(eventData) {
  const fullEventData = {
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
    /// Unique ID
  function generateId(len) {
    const arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join('');
  }

  function dec2hex(dec) {
    return (`0${dec.toString(16)}`).substring(-2);
  }

  try {
    dataLayer.push(fullEventData);
  } catch (e) {
    console.log(fullEventData);
  }
}
