import { Then } from 'cucumber';
import { request } from '../../framework/api/client';
import { expect } from 'chai';
import { AUTOPILOT_API_URL } from '../../config/envConfig';

Then(/^The contact is saved to Autopilot$/, async function() {
    const autoPilotContact = this.getAutoPilotContact();
    const email = autoPilotContact.email;
    const req = {
        method: 'get',
        url: `${AUTOPILOT_API_URL}/v1/contact/${email}`,
        headers: {
          'autopilotapikey': process.env.AUTOPILOT_API_KEY,
          'Content-Type': 'application/json',
        }
    };
    result = await request(req);
    expect(result.status).to.equal(200);
    expect(result.data.Email).to.equal(email);
});
