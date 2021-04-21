import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({data}) => (
    <Layout>
      <SEO title="home" />
      <h1>My WordPress Blog</h1>
      <h4>Posts</h4>
      {data.allMysqlLists.edges.map(({ node }, index) => (
        <div key={index}>
          <Link to={`/posts/${index}`}>
            <p>{node.title}</p>
          </Link>
          <p>{node.description}</p>
          <p>{node.href}</p>
          <p>{node.create_time}</p>
        </div>
      ))}
    </Layout>
  )

export const query = graphql`
{
  allMysqlLists(sort: {fields: create_time, order: DESC}) {
    edges {
      node {
        title
        description
        menu
        source
        href
        create_time
      }
    }
  }
}
`
export default IndexPage
