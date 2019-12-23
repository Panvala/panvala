import { addDonation, getPublicDonations } from '../utils/donations';
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
