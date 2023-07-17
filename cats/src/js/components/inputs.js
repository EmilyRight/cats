export function fieldListener(el, events, _h) { events.forEach((ev) => el.addEventListener(ev, _h)); }

export function prepField(ee) {
  const _tf = 'text-field';
  const _hldr = '.text-field-holder';
  const $fld = (ee.target.classList.contains(_tf)) ? ee.target : ee.target.closest(`.${_tf}`);
  if ($fld) {
    const $holder = $fld.closest(_hldr); const
      _val = $fld.value;
    (_val.length > 0) ? checkVal(_val, $holder) : $holder.classList.remove('text-active');
  }
}
export function keyField(ee) {
  const _tf = 'text-field';
  const _hldr = '.text-field-holder';
  const $fld = (ee.target.classList.contains(_tf)) ? ee.target : ee.target.closest(`.${_tf}`);
  if ($fld) {
    const $holder = $fld.closest(_hldr);
    $holder.classList.add('text-active');
    const _fc = $fld.classList;

    if (_fc.contains('js-name')) { $fld.value = $fld.value.replace(/[^а-яёА-ЯЁ ]/g, ''); }
    if (_fc.contains('js-tel')) { validatePhone(ee); }
    if (_fc.contains('js-inn')) { $fld.value = $fld.value.replace(/\D/g, ''); }

    if (ee.type === 'beforeinput') { $holder.classList.remove('text-error'); }
    if (ee.type === 'paste') { console.log('paste'); }
    if (ee.type === 'click') {}
    if (ee.type === 'keydown') {
      const _k = ee.key; const
        _kc = ee.code; // console.log(_k);
      if (ee.key === 'Backspace') {}
    }
  }
}

export function validateFields() {
  const $_holders = document.querySelectorAll('.text-field-holder');
  const _er = 'text-error';

  [...$_holders].forEach((h) => { showErrors(h); });
  function showErrors(_h) {
    const _fld = _h.querySelector('input.text-field');
    const _fClass = _fld.classList; const
      _fVal = _fld.value;
    if (_fClass.contains('js-name')) {
      (_fVal.length < 2) ? _h.classList.add(_er) : _h.classList.remove(_er);
    }
    if (_fClass.contains('js-tel')) {
      (_fVal.length < 17) ? _h.classList.add(_er) : _h.classList.remove(_er);
    }
  }
}

function validatePhone(e) {
  const el = e.target;
  const clearVal = el.dataset.phoneClear;
  const pattern = el.dataset.phonePattern;
  const matrix_def = '+7(9__) ___-__-__';
  const matrix = pattern || matrix_def;
  let i = 0; const def = matrix.replace(/\D/g, '');
  let val = e.target.value.replace(/\D/g, '');
  if (clearVal !== 'false' && e.type === 'blur') {
    if (val.length < matrix.match(/([\_\d])/g).length) {
      e.target.value = '';
      return;
    }
  }
  if (def.length >= val.length) val = def;
  e.target.value = matrix.replace(/./g, (a) => (/[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a));
}
function checkVal(v, _hldr) {}
