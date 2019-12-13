const path = require('path');

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
              story
              teamInfo
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
    createPage({
      path: `/fundraisers/${node.firstName.toLowerCase()}`,
      component: fundraiserTemplate,
      context: {
        id: node.id,
        firstName: node.firstName,
        lastName: node.lastName,
        story: node.story,
        teamInfo: node.teamInfo,
      },
    });
  });
};
