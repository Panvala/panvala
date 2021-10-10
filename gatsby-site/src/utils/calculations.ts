export function parseCommaFloat(text) {
  return parseFloat(text.replace(/,/g, ''));
}

export function parsePercent(text) {
  return parseFloat(text) / 100;
}

export function getFullyStakedAmount(communityRow, totals) {
  const fairShareScore = parseCommaFloat(communityRow.fairShareScore);
  const utilizedFairShareScore = parseCommaFloat(communityRow.utilizedFairShareScore);
  const totalUtilizedFairShareScore = parseCommaFloat(totals.utilizedFairShareScore);

  const targetShare = fairShareScore / (totalUtilizedFairShareScore - utilizedFairShareScore + fairShareScore);
  if (targetShare === 0)
    return 0;
  
  const currentStakedTokens = parseCommaFloat(communityRow.stakedTokens);
  const totalStakedTokens = parseCommaFloat(totals.stakedTokens);
  const fullyStakedAmount = (targetShare * totalStakedTokens - targetShare * currentStakedTokens) /
  (1 - targetShare);

  return fullyStakedAmount;
}

export function getMatchingMultiplier(communityRow, totals) {
  const subsidy = parseCommaFloat(communityRow['estimatedSubsidy(PAN)']);
  const donations = parseCommaFloat(communityRow.pANDonated);

  if (donations > 0) {
    return parseFloat(((donations + subsidy) / donations).toFixed(1));
  } else {
    // If the community doesn't have any donations yet, use the League average multiplier as the current multiplier.
    const totalSubsidy = parseCommaFloat(totals['estimatedSubsidy(PAN)']);
    const totalDonations = parseCommaFloat(totals.pANDonated);
    return parseFloat(((totalDonations + totalSubsidy) / totalDonations).toFixed(1));
  }
}

export function getMaxMatchingMultiplier(communityRow, totals) {
  console.log(Object.keys(communityRow));
  const fairShareScore = parseCommaFloat(communityRow.fairShareScore);
  const spreadsheetSubsidyPoints = parseCommaFloat(communityRow.subsidyPoints);
  const totalSubsidyPoints = parseCommaFloat(totals.subsidyPoints);
  const totalSubsidy = parseCommaFloat(totals['estimatedSubsidy(PAN)']);
  const shareOfSubsidy = fairShareScore / (totalSubsidyPoints - spreadsheetSubsidyPoints + fairShareScore);
  const maxSubsidy = shareOfSubsidy * totalSubsidy;
  const donations = parseCommaFloat(communityRow.pANDonated);
  console.log('donations', donations);
  if (donations > 0) {
    return parseFloat(((donations + maxSubsidy) / donations).toFixed(1));
  } else {
    // If the community doesn't have any donations yet, use the League average multiplier as the max multiplier.
    const totalDonations = parseCommaFloat(totals.pANDonated);
    return parseFloat(((totalDonations + totalSubsidy) / totalDonations).toFixed(1));
  }
}
