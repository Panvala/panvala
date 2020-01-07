import { addDonation, getPublicDonations, getDonationsForFundraiser } from '../utils/donations';
import { validateDonation } from '../utils/validation';

export function create(req, res) {
  // Validate input
  const valid = validateDonation(req.body);
  if (!valid) {
    const msg = 'Invalid donation request data';
    const errors = validateDonation.errors;

    console.error(errors);
    return res.status(400).json({
      msg,
      errors,
    });
  }

  const donation = req.body;
  console.log('Donation:', donation);

  return addDonation(donation)
    .then(result => res.json(result))
    .catch(error => {
      console.error(error);
      return res.status(400).json({
        msg: error.message,
        errors: error.errors,
      });
    });
}

export function list(req, res) {
  return getPublicDonations()
    .then(result => res.json(result))
    .catch(error => {
      console.error(error);
      return res.status(400).json({
        msg: error.message,
        errors: error.errors,
      });
    });
}

export function getByFundraiser(req, res) {
  const { fundraiser } = req.params;

  // fundraiser must be a non-empty string
  if (fundraiser == null || typeof fundraiser !== 'string' || fundraiser.length === 0) {
    return res.status(404);
  }

  return getDonationsForFundraiser(fundraiser)
    .then(donations => {
      return res.json(donations);
    })
    .catch(error => {
      const msg = `Error getting donations: ${error}`;
      console.error(msg);
      return res.status(500).send(msg);
    });
}
