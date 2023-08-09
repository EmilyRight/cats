import Inputmask from 'inputmask';

const inputClassName = 'text-field';
const fieldClassName = '.text-field-holder';
const errorText = 'text-error';
const phoneRegionCodeError = 'Проверьте код оператора или региона - он может начинаться на 3, 4, 5, 6, 8 или 9';
const phoneError = 'Заполните все цифры номера';
const im = new Inputmask('+7(999) 999-99-99');

function fieldListener(element, eventsArray, callback) {
  eventsArray.forEach((event) => element.addEventListener(event, callback));
}

function defineInput(event) {
  return event.target.classList.contains(inputClassName) ? event.target : event.target.closest(`.${inputClassName}`);
}

function setPhonemask() {
  const phoneInput = document.querySelector('.js-tel');
  // im = new Inputmask('+7(999) 999-99-99');
  im.mask(phoneInput);
}

function validatePhone() {
  const phoneInput = document.querySelector('.js-tel');
  const correctPhoneNumber = phoneInput.value.match(/^((8|\+7)[\- ]?)?(\(?[3,4,5,6,8,9]\d{2}\)?[\- ]?)[\d\- ]{7,10}$/);
  const incorrectRegion = phoneInput.value.match(/\([1,2,7,0]/);

  return {
    correctPhoneNumber, incorrectRegion,
  };
}

function showErrors(textHolder) {
  const inputField = textHolder.querySelector('input.text-field');
  const inputValue = inputField.value;
  const errorBlock = textHolder.querySelector('.error-text');
  if (inputField.classList.contains('js-name')) {
    if (inputValue.length < 2) {
      textHolder.classList.add(errorText);
    } else {
      textHolder.classList.remove(errorText);
    }
  } else if (inputField.classList.contains('js-tel')) {
    const validatedPhone = validatePhone();

    if (validatedPhone.correctPhoneNumber === null) {
      textHolder.classList.add(errorText);
    } else {
      textHolder.classList.remove(errorText);
    }

    if (validatedPhone.incorrectRegion !== null) {
      errorBlock.innerText = phoneRegionCodeError;
    } else {
      errorBlock.innerText = phoneError;
    }
  }
}

function validateFields() {
  const textHoldersArray = document.querySelectorAll('.text-field-holder');

  textHoldersArray.forEach((textHolder) => {
    showErrors(textHolder);
  });
}

function prepField(event) {
  const textInput = defineInput(event);
  if (textInput) {
    const textHolder = textInput.closest(fieldClassName);
    const inputValue = textInput.value;
    if (inputValue.length === 0 && !textInput.classList.contains('js-tel')) {
      textHolder.classList.remove('text-active');
    }

    if (textInput.classList.contains('js-tel')) {
      im.remove(textInput);
      textInput.placeholder = '';
    }
  }
}

function keyField(event) {
  const textInput = defineInput(event);

  if (textInput) {
    const textHolder = textInput.closest(fieldClassName);
    textHolder.classList.add('text-active');

    if (textInput.classList.contains('js-name')) {
      textInput.value = textInput.value.replace(/[^а-яёА-ЯЁ ]/g, '');
      showErrors(textHolder);
    }
    if (textInput.classList.contains('js-tel')) {
      setPhonemask();
      showErrors(textHolder);
    }
    if (textInput.classList.contains('js-inn')) {
      textInput.value = textInput.value.replace(/\D/g, '');
    }

    if (event.type === 'beforeinput' || event.key === 'Backspace') {
      showErrors(textHolder);
    }
  }
}

export {
  fieldListener, prepField, keyField, validateFields,
};
