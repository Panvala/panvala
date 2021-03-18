import { toKebabCase } from './format';

export const loadImage = (communityName: string) => {
  const extensions = ['png', 'jpg', 'jpeg', 'gif', 'svg'];
  const kebabName = toKebabCase(communityName);
  for (let i = 0, il = extensions.length; i < il; i += 1) {
    try {
      return require(`../img/communities/${kebabName}.${extensions[i]}`);
    } catch (err) {
      continue;
    }
  }
};
