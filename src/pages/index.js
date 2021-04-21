import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({data}) => {
  const lists = data.allMysqlLists.edges
  console.log("111111", lists);
  return (
  <Layout>
    <SEO title="Home" />
    {data.allMysqlLists.edges.map(({node}, index) => (
      <tr key={index}>
        <td>{index+1}</td>
        <td>{node.title}</td>
        <td>{node.menu}</td>
        <td>{node.source}</td>
        <td>{node.create_time}</td>
        
      </tr>
    ))

    }
  </Layout>

  )
}
export const query = graphql`
{
  allMysqlLists(sort: {fields: create_time, order: DESC}) {
    edges {
      node {
        title
        description
        menu
        source
        create_time(formatString: "MM DD, YYYY")
      }
    }
  }
}
`
export default IndexPage
