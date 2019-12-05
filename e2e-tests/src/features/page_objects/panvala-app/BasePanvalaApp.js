import { BasePage } from '../../framework/page_object/BasePage';
import { PANVALA_APP_URL } from '../../config/envConfig';

class BasePanvalaApp extends BasePage {

  constructor(path) {
    super(PANVALA_APP_URL, path);
  }

}

export { BasePanvalaApp };
