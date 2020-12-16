import fs from 'fs';
import csvParse from 'csv-parse';
import path from 'path';

import { parseCommaFloat } from './calculations';

export function getSpreadsheetData() {
  return new Promise((resolve) => {
    const scoreboard = {};
    let totals = null;
    fs.createReadStream(path.resolve(process.cwd(), 'data/scoreboard-batch-9.csv'))
      .pipe(csvParse({columns: true}))
      .on('data', row => {
        if(row['Community'] === '' && parseCommaFloat(row['Staked Tokens']) > 0) {
          totals = row;
        } else if (row['Community Name'] !== '') {
          scoreboard[row['Community Name']] = row;
        }
      })
      .on('end', () => resolve({ scoreboard, totals }));
  });
}