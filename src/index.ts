import { initAdManager } from 'managers/AdManager/AdManager.utils';
import getCurrentPageInfo from 'utils/helpers/getCurrentPageInfo';

const runApp = async () => {
  try {
    const page = getCurrentPageInfo();

    if (page) {
      const AdManager = initAdManager(page);
      AdManager.injectAdnPixelScript();
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }
};

if (document.readyState !== 'loading') {
  runApp();
} else {
  window.addEventListener('DOMContentLoaded', async () => {
    runApp();
  });
}
