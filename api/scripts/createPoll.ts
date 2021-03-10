import * as yargs from 'yargs';

import { excludeCategoriesByIds, createPoll } from '../src/utils/polls';
import { sequelize } from '../src/models';

sequelize.options.logging = false;

// EXAMPLE USAGE: npm run poll:create -- -c 42 -e 1 2 3 4 5 6 15
// Creates a poll with 42 options that exclude ids 1-6 (which aren't community options) and 15 (Shefi)

async function run() {
  // if there are no categories, prompt the user to create them
  // Parse arguments
  const argv = yargs
    .scriptName('createPoll')
    .number('choices')
    .alias('choices', 'c')
    .demandOption('choices', 'Please specify the number of choices the poll should contain.')
    .array('exclude')
    .alias('exclude', 'e')
    .demandOption(
      'exclude',
      'Please provide a list of FundingCategory ids to exclude for the poll.'
    )
    .help().argv;

  const categories = await excludeCategoriesByIds((argv.exclude as string[]).map(x => parseInt(x)));
  if (categories.length !== argv.choices) {
    console.log('Some categories were not found');
    console.log('');
    console.log("> Did you remember to run 'yarn seed'?");
    process.exit(0);
  }

  // create the poll
  console.log('creating poll');
  const name = 'A poll';
  const categoryNames = categories.map(c => c.displayName);
  console.log('Category names: ', categoryNames);

  const poll = await createPoll(name, categoryNames);

  console.log(`created poll ${name} with id ${poll.id}`);
  // console.log(poll.get({ plain: true }));
  process.exit(0);
}

run();
