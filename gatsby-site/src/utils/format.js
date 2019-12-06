export function sliceDecimals(floatingPt, decimalDigits = 3) {
  const point = floatingPt.indexOf('.');
  const integer = floatingPt.slice(0, point);
  const fractional = floatingPt.slice(point, point + decimalDigits);
  return integer + fractional;
}
