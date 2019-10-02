import { When } from 'cucumber';
import panvala from '../page_objects/panvala/index';
const createSlates = new panvala.CreateSlates();

When(/^I select the (.*) slate type on the Panvala Create a Slate page$/, async (slateType) => {
    await createSlates.selectSlateType(slateType);
    await createSlates.clickBegin();
});
