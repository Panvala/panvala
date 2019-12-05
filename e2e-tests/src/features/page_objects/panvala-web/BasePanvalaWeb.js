import { BasePage } from '../../framework/page_object/BasePage';
import { PANVALA_WEB_URL } from '../../config/envConfig';

class BasePanvalaWeb extends BasePage {

  constructor(path) {
    super(PANVALA_WEB_URL, path);
  }

}

export { BasePanvalaWeb };
