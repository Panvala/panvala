const path = require('path');
const fs = require('fs');
const csvParse = require('csv-parse');

/**
 * Load communities CSV data and convert to JSON
 */
 function getCommunitiesCsvData() {
  return new Promise((resolve) => {
    const communities = {};
    let totals = null;
    fs.createReadStream(path.resolve(__dirname, 'src/data/communities.csv'))
      .pipe(csvParse({columns: true}))
      .on('data', row => {
        if (row['Community Name'] !== '') {
          communities[row['Community Name']] = row;
        }
      })
      .on('end', () => resolve({ communities, totals }));
  });
}

/**
 * Load scoreboard CSV data and convert to JSON
 */
 function getCommunityScoreboardsCsvData(filname) {
  return new Promise((resolve) => {
    const communities = {};
    let totals = {};
    fs.createReadStream(path.resolve(__dirname, 'src/data/communities-scoreboard.csv'))
      .pipe(csvParse({columns: true}))
      .on('data', row => {
        if (row['Community'] === '__Totals__') {
          totals = row;
        } else if (row['Community Name'] !== '') {
          communities[row['Community Name']] = row;


          // if (row['Staked Tokens']) {
          //   if (!totals['Staked Tokens'])
          //     totals['Staked Tokens'] = 0;
          //   totals['Staked Tokens'] += parseFloat(row['Staked Tokens']);
          // }
          // else if (row['PAN Donated']) {
          //   if (!totals['PAN Donated'])
          //     totals['PAN Donated'] = 0;
          //   totals['PAN Donated'] += parseFloat(row['PAN Donated']);
          // }
          // else if (row['Donation Count']) {
          //   if (!totals['Donation Count'])
          //     totals['Donation Count'] = 0;
          //   totals['Donation Count'] += parseInt(row['Donation Count'], 10);
          // }
          // else if (row['Quadratic Funding']) {
          //   if (!totals['Quadratic Funding'])
          //     totals['Quadratic Funding'] = 0;
          //   totals['Quadratic Funding'] += parseFloat(row['Quadratic Funding']);
          // }
        }
      })
      .on('end', () => resolve({ communities, totals }));
  });
}

/* Convert to camelCase */
const toCamelCase = (input) => {
  const word = input.replace(/[' ']/g, '').replace(/\r/g, '').replace(/\n/g, '');
  return word[0].toLowerCase() + word.slice(1);
};

/* Convert to kebab-case */
const toKebabCase = (input) => input.replace(/[' ']/g, '-').toLowerCase();

exports.createPages = async ({ graphql, actions: { createPage }, reporter }) => {
  const result = await graphql(
    `
      {
        allFundraisersJson {
          edges {
            node {
              id
              firstName
              lastName
              image {
                publicURL
              }
              story
              team {
                name
                description
              }
              goal
              slug
            }
          }
        }
      }
    `
  );

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Create pages for each json fundraiser
  const fundraiserTemplate = path.resolve(__dirname, 'src/templates/Fundraiser.js');
  result.data.allFundraisersJson.edges.forEach(({ node }) => {
    const team = node.team.name.toLowerCase().replace(' ', '-');
    const firstName = node.firstName.toLowerCase();

    createPage({
      path: `/league/${team}/${firstName}`,
      component: fundraiserTemplate,
      context: {
        id: node.id,
        firstName: node.firstName,
        lastName: node.lastName,
        image: node.image,
        story: node.story,
        team: node.team,
        goal: node.goal,
      },
    });
  });

  // Create pages for each community
  const communityTemplate = path.resolve(__dirname, 'src/templates/Community.tsx');
  const communityDonationTemplate = path.resolve(__dirname, 'src/templates/CommunityDonate.tsx');
  const communitiesData = await getCommunitiesCsvData();
  const scoreboardsData = await getCommunityScoreboardsCsvData();
  const communityNames = Object.keys(communitiesData.communities);
  
  for (let c = 0, cl = communityNames.length; c < cl; c += 1) {
    const communityName = communityNames[c];
    const kebabCaseName = toKebabCase(communityName);
    const communityData = communitiesData.communities[communityName];
    const scoreboardData = scoreboardsData.communities[communityName];

    if (!scoreboardData)
      continue;

    const pageContext = {};
    pageContext.scoreboard = {};
    pageContext.scoreboardTotals = {};

    Object.keys(communityData).forEach(dataKey => pageContext[toCamelCase(dataKey)] = communityData[dataKey]);
    Object.keys(scoreboardData).forEach(dataKey => {
      if (!!dataKey)
        pageContext.scoreboard[toCamelCase(dataKey)] = scoreboardData[dataKey];
    });
    Object.keys(scoreboardsData.totals).forEach(dataKey => {
      if (!!dataKey)
        pageContext.scoreboardTotals[toCamelCase(dataKey)] = scoreboardsData.totals[dataKey];
    });

    // if (scoreboardData['Staked Tokens'])
    //   pageContext.scoreboard.stakedTokens = scoreboardData['Staked Tokens'];
    // if (scoreboardData['Share of Quadratic Funding'])
    //   pageContext.scoreboard.donationShare = scoreboardData['Share of Quadratic Funding'];
    // if (scoreboardData['PAN Donated'])
    //   pageContext.scoreboard.panDonated = scoreboardData['PAN Donated'];
    // if (scoreboardData['Donation Count'])
    //   pageContext.scoreboard.donationCount = scoreboardData['Donation Count'];

    // pageContext.scoreboardTotals = scoreboardsData.totals;

    console.log(`\n\nCreating community info page at url "/${kebabCaseName}" with context: `, pageContext);
    createPage({
      path: `/${kebabCaseName}`,
      component: communityTemplate,
      context: pageContext,
    });

    console.log(`\n\nCreating community donation page at url "/${kebabCaseName}/donate" with context: `, pageContext);
    createPage({
      path: `/${kebabCaseName}/donate`,
      component: communityDonationTemplate,
      context: pageContext,
    });
  }
};
