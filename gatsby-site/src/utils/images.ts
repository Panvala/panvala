import { toCamelCase, toKebabCase } from './format';

export const loadImage = (communityName: string) => {
  const extensions = ['png', 'jpg', 'jpeg', 'gif', 'svg'];
  const filenames = [
    communityName.replace(/ /g, '').toLowerCase(),
    toKebabCase(communityName),
    toCamelCase(communityName),
  ];
  for (let e = 0, el = extensions.length; e < el; e += 1) {
    for (let f = 0, fl = filenames.length; f < fl; f += 1) {
      try {
        return require(`../img/league/${filenames[f]}.${extensions[e]}`);
      } catch (err) {
        continue;
      }
    }
  }
};
