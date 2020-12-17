function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return (
      txt.charAt(0).toUpperCase() +
      txt.substr(1).toLowerCase()
    );
  });
}

// Use this function to convert the json data exported from excel sheet to camelcase, remove comma, $ and % from values etc

function convertExcelData(data) {
  return panData.map((p) => {
    let final = {};

    let keys = Object.keys(p)
      .map((k) => k.toLowerCase())
      .map((k) =>
        k
          .replace('(', '')
          .replace(')', '')
          .replace('/', '')
          .replace(',', '')
          .replace('\n', '')
      )
      .map((p) => toTitleCase(p))
      .map((o) => o.replace(' ', ''))
      .map((o) => o.split(' ').join(''))
      .map((c) => {
        let arr = c.split('');
        arr[0] = arr[0].toLowerCase();
        return arr.join('');
      });

    let values = Object.values(p)
      .map((p) => p.replace(',', ''))
      .map((p) => p.replace('%', ''))
      .map((p) => p.replace('$', ''))
      .map((o) => o.split(',').join(''))
      .map((p, i) => {
        if (i === 18) {
          return p.replace('x', '');
        }
        return p;
      });

    keys.forEach((key, i) => {
      final[key] = values[i];
    });
    return final;
  });
}
