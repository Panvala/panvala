export function parseCommaFloat(text) {
  return parseFloat(text.replace(/,/g, ''));
}

export function parsePercent(text) {
  return parseFloat(text) / 100;
}

export function getStakingYieldCurveData(communityRow, totals, { sampleCount = 20 } = {}) {
  const donationShare = parsePercent(communityRow['Share of Quadratic Funding']);
  if (donationShare === 0) {
    return [{
      stakedAmount: 0,
      subsidy: 0,
      funding: 0,
    }];
  }
  
  const currentStakedTokens = parseCommaFloat(communityRow['Staked Tokens']);
  const totalStakedTokens = parseCommaFloat(totals['Staked Tokens']);
  const fullyStakedAmount = (donationShare * totalStakedTokens - donationShare * currentStakedTokens) /
  (1 - donationShare);
  
  const stakedAmounts = [fullyStakedAmount];
  for (let i = 0; i < sampleCount; i++) {
    stakedAmounts.push(fullyStakedAmount / sampleCount * i);
  }
  if (currentStakedTokens < fullyStakedAmount && stakedAmounts.findIndex(x => x === currentStakedTokens) === -1) {
    stakedAmounts.push(currentStakedTokens);
  }
  
  const OVERFLOW_SLOPE = 2;
  const quadraticFunding = parseCommaFloat(communityRow['Quadratic Funding']);
  const spreadsheetSubsidyPoints = parseCommaFloat(communityRow['Subsidy Points']);
  const totalSubsidyPoints = parseCommaFloat(totals['Subsidy Points']);
  const totalSubsidy = parseCommaFloat(totals['Estimated Subsidy\n(PAN)']);
  return stakedAmounts.map(stakedAmount => {
    const utilization = stakedAmount === 0 ? 0 : donationShare * (stakedAmount + totalStakedTokens - currentStakedTokens) / stakedAmount;
    const adjustedUtilization = Math.sqrt(-4 * (OVERFLOW_SLOPE / 2) * (1 - (OVERFLOW_SLOPE / 2 ) - utilization)) / OVERFLOW_SLOPE;
    const subsidyPoints = utilization === 0 ? 0 : adjustedUtilization / utilization * quadraticFunding;
    const shareOfSubsidy = subsidyPoints / (totalSubsidyPoints - spreadsheetSubsidyPoints + subsidyPoints);
    const subsidy = shareOfSubsidy * totalSubsidy;
    return {
      stakedAmount,
      subsidy,
      funding: subsidy + parseCommaFloat(communityRow['PAN Donated']),
      reference: currentStakedTokens < fullyStakedAmount ? stakedAmount === currentStakedTokens : stakedAmount === fullyStakedAmount,
    };
  });
}

export function getLeagueSubsidyChartData(scoreboard, totals) {
  const chartData = {};
  Object.values(scoreboard).forEach(communityRow => {
    const communityData = getStakingYieldCurveData(communityRow, totals);
    communityData.forEach(item => {
      const stakedAmount = Math.round(item.stakedAmount * 100) / 100;
      chartData[stakedAmount] = chartData[stakedAmount] || { stakedAmount };
      chartData[stakedAmount][communityRow['Community']] = Math.round(item.subsidy * 100) / 100;
    })
  });
  return Object.values(chartData).sort((a, b) => {
    if (a.stakedAmount === b.stakedAmount) {
      return 0;
    }
    if (a.stakedAmount > b.stakedAmount) {
      return 1;
    }
    return -1;
  });
}

export function getCommunitySubsidyChartData(communityName, scoreboard, totals) {
  const communityRow = scoreboard[communityName];
  const chartData = {};
  const communityData = getStakingYieldCurveData(communityRow, totals, { sampleCount: 50 });
  let referenceDot = null;
  communityData.forEach(item => {
    const stakedAmount = Math.round(item.stakedAmount * 100) / 100;
    chartData[stakedAmount] = chartData[stakedAmount] || { stakedAmount };
    chartData[stakedAmount].subsidy = Math.round(item.subsidy * 100) / 100;
    if (item.stakedAmount > 0) {
      const percentYield = Math.log((item.subsidy + item.stakedAmount) / item.stakedAmount) / 0.25 * 100;
      chartData[stakedAmount].yield = Math.round(percentYield * 100) / 100;
    }
    if (item.reference) {
      referenceDot = chartData[stakedAmount];
    }
  });

  return {
    line: Object.values(chartData).sort((a, b) => {
      if (a.stakedAmount === b.stakedAmount) {
        return 0;
      }
      if (a.stakedAmount > b.stakedAmount) {
        return 1;
      }
      return -1;
    }),
    dot: referenceDot,
  };
}