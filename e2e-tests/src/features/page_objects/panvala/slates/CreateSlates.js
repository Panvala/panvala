import { BasePanvala } from '../BasePanvala';
import { HtmlElement } from '../../../framework/controls/HtmlElement';
import { Select } from '../../../framework/controls/Select';

class CreateSlates extends BasePanvala {

  constructor() {
    super('/slates/create');
    this.slateType = () => new Select('select[name="category"]');
    this.back = () => new HtmlElement('.Flex-sc-1qv9hxw-0.bATvpO div:nth-child(1)');
    this.begin = () => new HtmlElement('.Flex-sc-1qv9hxw-0.bATvpO div:nth-child(2)');
  }

  selectSlateType(slateType) {
    return this.slateType().select(slateType);
  }

  clickBack() {
    return this.back().click();
  }

  clickBegin() {
    return this.begin().click();
  }

}

export { CreateSlates };
