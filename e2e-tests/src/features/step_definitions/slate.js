import { Then } from 'cucumber';
import panvala from '../page_objects/panvala/index';
import { expect } from 'chai';
const slate = new panvala.Slate();

Then(/^The first name is displayed on the Panvala Slate page$/, async function() {
  const actual = await slate.getCreatedBy();
  const slateInfo = this.getSlate();
  const expected = slateInfo.firstname;
  expect(actual).to.include(expected);
});

Then(/^The description is displayed on the Panvala Slate page$/, async function() {
  const actual = await slate.getDescription();
  const slateInfo = this.getSlate();
  const expected = slateInfo.description;
  expect(actual).to.include(expected);
});
