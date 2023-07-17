/// Detect device
import { UAParser } from 'ua-parser-js';

const getMobileOs = () => {
  const userAgent = navigator.platform || navigator.vendor || window.opera;
  const parser = new UAParser();
  // console.log(parser.getDevice().type);
  // console.warn(`${navigator.vendor}|| ${navigator.vendorSub}`);

  if (parser.getDevice().vendor === 'Huawei') {
    return 'huawei';
  }
  if (/android/i.test(userAgent)) {
    return 'android';
  }
  if (parser.getDevice().vendor === 'Apple') {
    return 'ios';
  }

  return 'unknown';
};

// detect iOS
// const isIOS = () => getMobileOs() === 'ios';

function detectDevice() {
  const deviceOs = getMobileOs();
  document.body.classList.add(`platform_${deviceOs}`);
}

function setLinkHref() {
  const deviceOs = getMobileOs();
  const appLink = {
    ios: 'https://redirect.appmetrica.yandex.com/serve/315401363163010541',
    android: 'https://redirect.appmetrica.yandex.com/serve/388180713033187193',
    huawei: 'https://redirect.appmetrica.yandex.com/serve/244065662866049837',
  };

  let appLinkHrf = appLink.android;

  if (deviceOs === 'ios') {
    appLinkHrf = appLink.ios;
  } else if (deviceOs === 'huawei') {
    appLinkHrf = appLink.huawei;
  }

  return appLinkHrf;
}

export default detectDevice;
