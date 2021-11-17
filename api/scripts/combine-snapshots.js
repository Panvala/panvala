import * as yargs from 'yargs';
import * as csvParse from 'csv-parse';
import * as stringify from 'csv-stringify/lib/sync';
import * as fs from 'fs';
import { readdir } from 'fs/promises';
import * as path from 'path';
import { DateTime, Duration } from 'luxon';

function getCSV(filename) {
  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(path.resolve('./', filename))
      .pipe(csvParse({ columns: true }))
      .on('data', row => {
        rows.push(row);
      })
      .on('end', () => resolve(rows));
  });
}

function generateCSV(rows) {
  return stringify(rows, {
    header: true,
    columns: [
      'Address',
      'Category',
      'Category ID',
      'Points',
      'Source',
      'Balance',
      'Mainnet Balance',
      'zkSync Balance',
      'xDai Balance',
      'Matic Balance',
      'Uniswap PAN/ETH Balance',
      'Honeyswap PAN/WETH Balance',
      'Quickswap PAN/USDC Balance',
      'Date',
    ],
  });
}

async function run() {
  const argv = yargs
    .scriptName('combine-snapshots')
    .demandOption(
      'start',
      'Provide the date (ISO 8601) to start combining snapshots from (must be a Friday)'
    )
    .demandOption('weeks', 'Provide the number of weeks to combine snapshots for (4 or 5)')
    .help().argv;

  const startDate = DateTime.fromISO(argv.start);

  if (startDate.weekdayLong != 'Friday') {
    const msg = `Snapshots must begin on a Friday. The specified start date was ${startDate.toLocaleString(
      DateTime.DATE_HUGE
    )}`;
    console.error(msg);
    throw new Error(msg);
  }

  if (!(argv.weeks === 4 || argv.weeks === 5)) {
    const msg = `Combined snapshots must be for 4 or 5 weeks at the time of this script's creation. You asked for ${argv.weeks} weeks.`;
    console.error(msg);
    throw new Error(msg);
  }
  const endDate = startDate.plus(Duration.fromObject({ weeks: argv.weeks }));

  console.log(
    `Combining ${argv.weeks} weeks of snapshots from ${startDate.toLocaleString(
      DateTime.DATE_HUGE
    )} to ${endDate.minus(Duration.fromObject({ days: 1 })).toLocaleString(DateTime.DATE_HUGE)}`
  );

  // output the list of csv's that will be combined and the number of days each one will count for
  const filenames = await readdir('.');
  const csvRegex = /^responses-poll-\d+-(.*)\.csv$/;
  const csvFilenames = filenames.filter(x => csvRegex.test(x)).sort();
  const dateFiles = [];
  for (let i = 0; i < csvFilenames.length; i++) {
    const csvDate = DateTime.fromISO(csvRegex.exec(csvFilenames[i])[1]);
    if (csvDate < startDate || csvDate >= endDate) {
      continue;
    }
    if (csvDate > startDate && dateFiles.length === 0) {
      // When the start date doesn't have its own CSV, we'll reach a date beyond the start date without any data
      // collected. Use the previous CSV for the start date instead.
      dateFiles.push({ date: startDate, filename: csvFilenames[i - 1] });
    }
    dateFiles.push({ date: csvDate, filename: csvFilenames[i] });
  }

  for (let i = 0; i < dateFiles.length; i++) {
    const item = dateFiles[i];
    if (i === dateFiles.length - 1) {
      item.days = endDate.diff(item.date, 'days').toObject().days;
    } else {
      item.days = dateFiles[i + 1].date.diff(item.date, 'days').toObject().days;
    }
  }

  dateFiles.forEach(x => console.log(`Appending ${x.filename} ${x.days} times`));

  let combinedRows = [];
  for (let j = 0; j < dateFiles.length; j++) {
    const item = dateFiles[j];
    const fileRows = await getCSV(item.filename);
    for (let i = 0; i < item.days; i++) {
      const iterationDate = item.date.plus(Duration.fromObject({ days: i }));
      const rowsWithDate = fileRows.map(x => ({ ...x, Date: iterationDate.toLocaleString() }));
      combinedRows = combinedRows.concat(rowsWithDate);
    }
  }

  fs.writeFileSync(
    `combined-responses-${startDate.toISODate()}-thru-${endDate.toISODate()}.csv`,
    generateCSV(combinedRows)
  );

  // TODO edge case: IRL Art will count as fully staked
}

run();
