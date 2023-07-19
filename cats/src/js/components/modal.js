const hidden = 'popup-modal-hidden';
const active = 'modal-box-active';
const noscroll = 'modal-box-viewed';
const closeIconClassName = 'close';
const { body } = document;

export function openModal(modalBoxId) {
  const modalBox = document.querySelector(modalBoxId);
  const modal = modalBox.closest('.popup-modal');
  body.classList.add(noscroll);
  modal.classList.remove(hidden);
  modalBox.classList.add(active);

  // закрыть эту модалку
  modal.addEventListener('click', (e) => {
    const { target } = e;
    const closeModalButton = (
      target.classList.contains(closeIconClassName))
      ? target
      : target.closest(`.${closeIconClassName}`);

    if (!target.closest('.modal-box') || closeModalButton) {
      closeModal(modalBoxId);
    }
  });
}

export function closeModal(modalBoxId) {
  const modalBox = document.querySelector(modalBoxId);
  body.classList.remove(noscroll);
  modalBox.closest('.popup-modal').classList.add(hidden);
}
