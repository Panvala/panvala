import { HtmlElement } from '../../../framework/controls/HtmlElement';

class Modal {

  constructor() {
    this.root = '.Modal__ModalBody-sc-1u9wd4r-2 ';
    this.modalTitle = () => new HtmlElement(this.root + '.Modal__ModalTitle-sc-1u9wd4r-0');
    this.modalDescription = () => new HtmlElement(this.root + '.Modal__ModalDescription-sc-1u9wd4r-1');
    this.done = () => new HtmlElement(this.root + 'button');
  }

  isDisplayed() {
    return new HtmlElement(this.root).isDisplayed();
  }

  getTitle() {
    return this.modalTitle().getText();
  }

  getDescription() {
    return this.modalDescription().getText();
  }

  clickDone() {
    return this.done().click();
  }

};

export { Modal };
