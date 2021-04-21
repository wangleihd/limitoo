import React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

class IndexLists extends React.Component {
    render() {
      const { data, pageContext } = this.props
      const posts = data.allMysqlLists.edges
      const { currentPage, numPages } = pageContext
      const isFirst = currentPage === 1
      const isLast = currentPage === numPages
      const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString()
      const nextPage = (currentPage + 1).toString()
      return (
    <Layout>
      {posts.map(({ node }, index) => (
          <div key={index}>
          <SEO title={node.title} />
          <Link to={`/posts/${node.title.split(' ').join('_')}/`}>
            <p>{node.title}</p>
          </Link>
          <p>{node.description}</p>
          <p>{node.href}</p>
          <p>{node.create_time}</p>
        </div>
      ))}

      <div className="container">
            <nav className="pagination" role="navigation">
              <ul>
                {!isFirst && (
                  <p>
                    <Link to={`/${prevPage}/`} rel="prev" className="newer-posts">
                      ← Previous Page
                    </Link>
                  </p>
                )}
                <p>
                  <span className="page-number">
                    Page {currentPage} of {numPages}
                  </span>
                </p>
                {!isLast && (
                  <p>
                    <Link to={`/${nextPage}/`} rel="next" className="older-posts">
                      Next Page →
                    </Link>
                  </p>
                )}
              </ul>
            </nav>
          </div>
    </Layout>
      )
                }
            }

export const query = graphql`
query($skip: Int!, $limit: Int!) {
  allMysqlLists(sort: {fields: create_time, order: DESC}
    limit: $limit
    skip: $skip
    ) {
    edges {
      node {
        title
        status
        src
        source
        menu
        local_src
        load_img
        img_url
        href
        description
        country
        create_time
      }
    }
  }
}
`
export default IndexLists
