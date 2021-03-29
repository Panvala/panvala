import { ethers, Wallet } from 'ethers';

import { Sequelize } from '../models';
import { hasDuplicates } from '.';
const {
  FundingCategory,
  CategoryPoll,
  CategoryPollOption,
  CategoryPollResponse,
  CategoryPollAllocation,
} = require('../models');
const { in: opIn, notIn: opNotIn } = Sequelize.Op;

// ===== Categories

export async function getCategories() {
  return FundingCategory.findAll();
}

export async function getCategoryByName(name: string) {
  return FundingCategory.findOne({ where: { displayName: name } });
}

export async function getCategoriesByName(names: string[]) {
  return FundingCategory.findAll({ where: { displayName: names } });
}

export async function excludeCategoriesByIds(ids: number[]) {
  return FundingCategory.findAll({
    where: {
      id: {
        [opNotIn]: ids,
      },
    },
  });
}

// Throw if the category already exists
export async function createCategory(name: string) {
  const data = {
    displayName: name,
  };

  return FundingCategory.create(data);
}

// ===== Polls

/**
 * Return the poll with the options included
 * @param pollID
 */
export async function getPollByID(pollID: number) {
  return CategoryPoll.findOne({
    where: { id: pollID },
    include: [{ model: CategoryPollOption, as: 'options' }],
  });
}

export async function createEmptyPoll(name: string) {
  return CategoryPoll.create(
    { name },
    {
      include: [{ model: CategoryPollOption, as: 'options' }],
    }
  );
}

export async function createPoll(name: string, categoryNames: string[]) {
  // check that the categories are unique
  if (hasDuplicates(categoryNames)) {
    throw new Error('Duplicate categories');
  }

  // get categories matching the given strings
  const where = {
    displayName: {
      [opIn]: categoryNames,
    },
  };
  const categories = await FundingCategory.findAll({ where });
  if (categories.length !== categoryNames.length) {
    throw new Error('Invalid categories included');
  }

  // create poll with the given categories, return the poll with its options
  return CategoryPoll.create({
    name,
  }).then(poll => {
    const options = categories.map(cat => {
      return { pollID: poll.id, categoryID: cat.id };
    });
    return CategoryPollOption.bulkCreate(options).then(() =>
      poll.reload({
        include: [
          {
            model: CategoryPollOption,
            as: 'options',
          },
        ],
      })
    );
  });
}

/**
 * Add an option to an existing poll
 *
 * @param pollID
 * @param name
 * @returns poll with options included
 */
export async function addPollOption(pollID: number, name: string) {
  // throws if poll does not exist
  const poll = await CategoryPoll.findOne({ where: { id: pollID } });
  // console.log('FOUND POLL', poll.get({plain: true}));

  // get or create a category, then create an option
  return FundingCategory.findOrCreate({ where: { displayName: name } }).then(result => {
    const [category] = result;
    // console.log('CATEGORY', category.get({plain:true}));

    // associate it
    return CategoryPollOption.create({
      pollID: poll.id,
      categoryID: category.id,
    }).then(() => getPollByID(pollID));
  });
}

// ===== Responses

export interface IPollData {
  signature: string;
  response: IPollResponse;
}

export interface IPollResponse {
  account: string;
  allocations: ICategoryAllocation[];
}

export interface ICategoryAllocation {
  categoryID: number;
  points: number;
}

export interface IDBPollResponse extends IPollResponse {
  pollID: number;
}

/**
 * Add a response to an existing poll
 * allocations must match the poll options
 * @param response
 * @returns newly created response
 */
export async function addPollResponse(response: IDBPollResponse) {
  const sanitizedResponse: IDBPollResponse = response;
  sanitizedResponse.account = ensureChecksumAddress(response.account);

  return CategoryPollResponse.create(sanitizedResponse, {
    include: [{ model: CategoryPollAllocation, as: 'allocations' }],
  });
}

export async function responseCount(pollID: number): Promise<number> {
  return CategoryPollResponse.count({ where: { pollID } });
}

export async function hasAccountRespondedToPoll(pollID: number, account: string) {
  return CategoryPollResponse.findOne({
    where: { pollID, account: ensureChecksumAddress(account) },
  }).then(response => {
    // console.log(response);
    return response != null;
  });
}

// ===== Calculations
export function ensureChecksumAddress(address: string): string {
  return ethers.utils.getAddress(address.toLowerCase());
}

function generateMessage(response: IDBPollResponse): string {
  // Always use checksum address in the message
  const account = ensureChecksumAddress(response.account);
  return `Response from ${account} for poll ID ${response.pollID}`;
}

export async function verifyPollSignature(signature: string, response: IDBPollResponse) {
  const { account } = response;

  const message = generateMessage(response);
  const recoveredAddress = ethers.utils.verifyMessage(message, signature);
  console.log('recovered:', recoveredAddress);

  return ensureChecksumAddress(recoveredAddress) === ensureChecksumAddress(account);
}

export async function signResponse(wallet: Wallet, response: IDBPollResponse): Promise<string> {
  const message = generateMessage(response);
  // console.log(`signing message '${message}'`);
  return wallet.signMessage(message);
}

export async function createSignedResponse(
  wallet: Wallet,
  response: IDBPollResponse
): Promise<IPollData> {
  return signResponse(wallet, response).then(signature => {
    // console.log('signed', signature);
    const { account, allocations } = response;
    return { response: { account, allocations }, signature };
  });
}
