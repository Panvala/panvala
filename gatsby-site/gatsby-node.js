const path = require('path');
const fs = require('fs');
const csvParse = require('csv-parse');

/**
 * Load communities CSV and convert to JSON
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
  const communityDonationTemplate = path.resolve(__dirname, 'src/templates/CommunityDonate.tsx');
  const communitiesData = await getCommunitiesCsvData();
  const communityNames = Object.keys(communitiesData.communities);
  
  for (let c = 1, cl = communityNames.length; c < cl; c += 1) {
    const communityName = communityNames[c];
    const communityData = communitiesData.communities[communityName];

    if (communityData['Layer 2 Preference'] === '' || communityData['Layer 2 Address'] === '')
      continue;
  
    const camelCaseName = communityName.replace(/[' ']/g, '-').toLowerCase();
    const pageContext = {
      communityName: communityData['Community Name'],
      ethereumAddress: communityData['Ethereum Address'],
      layer2Preference: communityData['Layer 2 Preference'],
      layer2Address: communityData['Layer 2 Address'],
    };
  
    console.log(`\n\nCreating community donation page at url "/${camelCaseName}/donate" with context: `, pageContext);
  
    createPage({
      path: `/${camelCaseName}/donate`,
      component: communityDonationTemplate,
      context: pageContext,
    });
  }
};
