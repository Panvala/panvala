import { When } from 'cucumber';
import panvala from '../page_objects/panvala/index';
const slates = new panvala.Slates();

When(/^I navigate to the slates page$/, async function() {
await slates.openPage();
});
