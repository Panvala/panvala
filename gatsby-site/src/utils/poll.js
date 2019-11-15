export function calculateTotalPercentage(percentages) {
  return Object.keys(percentages).reduce((acc, val) => {
    if (percentages[val]) {
      return acc + parseInt(percentages[val]);
    }
    return acc;
  }, 0);
}
