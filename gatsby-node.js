const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allMysqlLists(sort: { fields: create_time, order: DESC }) {
        edges {
          node {
            title
            description
            menu
            source
            href
            create_time(formatString: "MM-DD-YYYY")
            href_hash
          }
        }
      }
    }
  `).then(result => {
    const posts = result.data.allMysqlLists.edges
    posts.forEach(({ node }) => {
      createPage({
        // Decide URL structure
        path: `/posts/${node.href_hash}/`,
        // path to template
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          // This is the $slug variable
          // passed to blog-post.js
          slug: node.href_hash,
        },
      })
    })

    const postsPerPage = 100
    const numPages = Math.ceil(posts.length / postsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/${i + 1}`,
        component: path.resolve("./src/templates/blog-list.js"),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })
  })
}
