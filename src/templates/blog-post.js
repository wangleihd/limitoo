import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

const blogPost = ({ data }) => {
  const post = data.allMysqlLists.edges[0].node
  return (
    <Layout>
      <div>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <p> By: {post.menu} </p>
        <p> Src: {post.source} </p>
        <p> On: {post.create_time} </p>
      </div>
    </Layout>
  )
}

export const query = graphql`
query($slug: String!) {
  allMysqlLists(filter: { href: { eq: $slug } }) {
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
export default blogPost;