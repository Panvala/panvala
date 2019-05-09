const { utils } = require('ethers');
const { getAllEvents } = require('../utils/transactions');
const { normalizedNotificationByEvent, notifications } = require('../utils/notifications');

module.exports = {
  /**
   * Get all notifications for a user's address
   */
  getByAddress(req, res) {
    const { address } = req.params;

    try {
      const addy = utils.getAddress(address);
      getAllEvents(addy).then(events => {
        console.log('events:', events);
        //   const notifications = events.map(event => normalizedNotificationByEvent(event));
        //   console.log('notifications:', notifications);
        res.json(notifications);
      });
    } catch (error) {
      res.status(400).send(`Invalid address provided in body: ${error}`);
    }
  },
};
