const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
  {
    allMysqlLists(sort: {fields: create_time, order: DESC}) {
      edges {
        node {
          title
          description
          menu
          source
          href
          create_time(formatString: "MM-DD-YYYY")
        }
      }
    }
  }`).then(result => {
    result.data.allMysqlLists.edges.forEach(({ node }, index) => {
      createPage({
        // Decide URL structure
        path: `/posts/${index}`,
        // path to template
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          // This is the $slug variable
          // passed to blog-post.js
          slug: node.href,
        },
      })
    })
  })
}
