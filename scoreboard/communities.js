export const communitiesBySlug = {
  'commons-stack': {
    name: "Commons Stack",
    img: "commonsstack.png",
  },
  'dappnode': {
    name: "DAppNode",
    img: "dappnode.png",
  },
  'metacartel': {
    name: "MetaCartel",
    img: "metacartel.png",
  },
  'dxdao': {
    name: "DXdao",
    img: "dxdao.png",
  },
  'hashing-it-out': {
    name: "Hashing it Out",
    img: "hashingitout.jpg",
  },
  'meta-gamma-delta': {
    name: "Meta Gamma Delta",
    img: "metagammadelta.jpg",
  },
  'kernel': {
    name: "KERNEL",
    img: "kernel.png",
  },
  'future-modern': {
    name: "future modern",
    img: "futuremodern.jpg",
  },
  'depo-dao': {
    name: "DePo DAO",
    img: "depodao.jpg",
  },
  'whalerdao': {
    name: "WhalerDAO",
    img: "whalerdao.png",
  },
  'matic-mitra': {
    name: "Matic Mitra",
    img: "maticmitra.jpg",
  },
  'fightpandemics': {
    name: "FightPandemics",
    img: "fightpandemics.jpg",
  },
  'lab10-collective': {
    name: "lab10 collective",
    img: "lab10collective.png",
  },
  'defi-safety': {
    name: "DeFi Safety",
    img: "defisafety.jpg",
  },
  'web3bridge': {
    name: "Web3Bridge",
    img: "web3bridge.jpg",
  },
  'mol-leart':{
    name: "Mol LeArt",
    img: "molleart.jpg",
  },
  'rotki': {
    name: "Rotki",
    img: "rotki.jpg",
  },
  'brightid': {
    name: "BrightID",
    img: "brightid.jpg",
  },
  'ethereum-france': {
    name: "Ethereum France",
    img: "ethereumfrance.jpg",
  },
  'abridged': {
    name: "Abridged",
    img: "abridged.jpg",
  },
  'nfthub': {
    name: "NFThub",
    img: "nfthub.jpg",
  },
  'metagame': {
    name: "MetaGame",
    img: "metagame.jpg",
  },
  'metaspace': {
    name: "MetaSpace",
    img: "metaspace.jpg",
  },
  'trips-community': {
    name: "Trips Community",
    img: "tripscommunity.jpg",
  },
  'upala': {
    name: "Upala",
    img: "upala.png",
  },
  'bloom-network': {
    name: "Bloom Network",
    img: "bloomnetwork.jpg",
  },
  'handshake-development-fund': {
    name: "Handshake Development Fund",
    img: "handshakedevelopmentfund.png",
  },
  'lexdao': {
    name: "LexDAO",
    img: "lexdao.jpg",
  },
  'grassroots-economics': {
    name: "Grassroots Economics",
    img: "grassrootseconomics.jpg",
  },
};

export const communitySlugs = {};

Object.entries(communitiesBySlug).forEach(([slug, data]) => {
  communitiesBySlug[slug].slug = slug;
  communitySlugs[data.name] = slug;
});