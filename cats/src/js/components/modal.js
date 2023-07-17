const modal = 'popup-modal';
const hidden = 'popup-modal-hidden';
const active = 'modal-box-active';
const modalReady = 'modal-box-ready';
const noscroll = 'modal-box-viewed';
const animateEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
const _body = document.querySelector('body');

export function openModal(box) {
  _body.classList.add(noscroll);
  const bb = document.querySelector(box);
  const bModal = bb.closest('.popup-modal');

  bb.classList.add(active);
  bModal.classList.remove(hidden);
  bb.classList.add(modalReady);

  // закрыть эту модалку
  bModal.addEventListener('click', (e) => {
    const _trg = e.target;
    if (!_trg.closest('.modal-box')) { closeModal(box); }

    const _cl = 'close';
    const $close = (_trg.classList.contains(_cl)) ? _trg : _trg.closest(`.${_cl}`);
    if ($close) { closeModal(box); }
  });
}

export function closeModal(box) {
  const bb = document.querySelector(box);
  _body.classList.remove(noscroll); //---
  bb.closest('.popup-modal').classList.add(hidden); //---
  bb.classList.remove(active, modalReady); //---
}
