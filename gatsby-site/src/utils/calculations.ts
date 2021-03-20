export function parseCommaFloat(text) {
  return parseFloat(text.replace(/,/g, ''));
}

export function parsePercent(text) {
  return parseFloat(text) / 100;
}

export function getFullyStakedAmount(communityRow, totals) {
  const donationShare = parsePercent(communityRow.shareofQuadraticFunding);
  if (donationShare === 0)
    return 0;
  
  const currentStakedTokens = parseCommaFloat(communityRow.stakedTokens);
  const totalStakedTokens = parseCommaFloat(totals.stakedTokens);
  const fullyStakedAmount = (donationShare * totalStakedTokens - donationShare * currentStakedTokens) /
  (1 - donationShare);

  return fullyStakedAmount;
}

export function getMatchingMultiplier(communityRow) {
  const subsidy = parseCommaFloat(communityRow['estimatedSubsidy(PAN)']);
  const donations = parseCommaFloat(communityRow.pANDonated);
  return parseFloat(((donations + subsidy) / donations).toFixed(1));
}

export function getMaxMatchingMultiplier(communityRow) {
  const maxSubsidy = parseCommaFloat(communityRow['fullyStakedSubsidy(PAN)']);
  const donations = parseCommaFloat(communityRow.pANDonated);
  return parseFloat(((donations + maxSubsidy) / donations).toFixed(1));
}
