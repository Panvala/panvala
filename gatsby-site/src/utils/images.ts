export const loadImage = (communityName: string) => {
  const extensions = ['png', 'jpg', 'jpeg', 'gif', 'svg'];
  for (let i = 0, il = extensions.length; i < il; i += 1) {
    try {
      return require(`../img/league/${communityName.replace(/ /g, '').toLowerCase()}.${extensions[i]}`);
    } catch (err) {
      continue;
    }
  }
};
