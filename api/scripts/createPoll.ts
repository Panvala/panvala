import * as yargs from 'yargs';

import { getCategoriesByName, createPoll } from '../src/utils/polls';
import { sequelize } from '../src/models';

sequelize.options.logging = false;

// TODO: allow the user to add new categories

async function run() {
  // if there are no categories, prompt the user to create them
  // Parse arguments
  const argv = yargs
    .scriptName('createPoll')
    .array('options')
    .alias('options', 'o')
    .demandOption('options', 'Please provide a list of FundingCategory names for the poll.')
    .help().argv;

  const categories = await getCategoriesByName(argv.options as string[]);
  console.log(categories);
  if (categories.length !== argv.options.length) {
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
