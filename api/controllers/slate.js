const { validationResult } = require('express-validator/check');
const ipfs = require('../utils/ipfs');
const { getAllSlates } = require('../utils/slates');
const { IpfsMetadata, Slate } = require('../models');

module.exports = {
  /**
   * Get the list of slates
   */
  async getAll(req, res) {
    getAllSlates()
      .then(slates => {
        // console.log('DATA', slates);
        res.send(slates);
      })
      .catch(err => {
        console.error('ERROR', err);
        res.status(500).json({
          err: err.message,
        });
      });
  },

  /**
   * Save slate information to the database
   *
   * Fails if a row with the given slateID already exists.
   */
  async create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.log(errors.array());
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const data = req.body;

    // this could be problematic
    // maybe we should move all `ipfs.add` logic to the api (for adding slate metadata, that would be here)
    const slateMetadata = await ipfs.get(data.metadataHash, { json: true });

    // write to db, but don't duplicate
    IpfsMetadata.findOrCreate({
      where: {
        multihash: data.metadataHash,
      },
      defaults: {
        multihash: data.metadataHash,
        data: slateMetadata,
      },
    }).then(() => {
      Slate.create(data)
        .then(s => {
          res.send(s);
        })
        .catch(err => {
          console.error('ERROR', err);
          res.status(400).send(`Improper slate format: ${err}`);
        });
    });
  },
};
