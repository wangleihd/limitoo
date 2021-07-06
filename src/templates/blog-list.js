import React from "react"
import { Link, graphql } from "gatsby"
import { Row, Col, Button } from "antd"

import Item from "../components/item"
import Bbc from "../components/bbc"
import Foxnews from "../components/foxnews"

import Layout from "../components/layout"
import SEO from "../components/seo"

class IndexLists extends React.Component {
  render() {
    const { data, pageContext } = this.props
    const posts = data.allMysqlLists.edges
    const siteTitle = data.site.siteMetadata.title
    const { currentPage, numPages } = pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()
    return (
      <Layout>
        <SEO
          title={siteTitle}
          keywords={[
            `News`,
            `The World Newes`,
            `media`,
            `politics`,
            `magazine`,
          ]}
        />
        {posts.map(({ node }, index) => {
          switch (node.source) {
            case "foxnews":
              return <Foxnews news={node} key={index} />
            case "bbc":
              return <Bbc news={node} key={index} />
            case "nytime":
              return <Item news={node} key={index} />
            case "abc":
              return <Foxnews news={node} key={index} />
            case "newsweek":
              return <Foxnews news={node} key={index} />
            case "lemonde":
              return <Foxnews news={node} key={index} />
            default:
              return <Item news={node} key={index} />
          }
        })}

        <div className="item">
          <Row gutter={[8]} justify="start">
            <Col span={8}>
              {!isFirst && (
                <Link to={`/${prevPage}/`} rel="prev">
                  <Button type="primary" ghost>
                    ← Previous
                  </Button>
                </Link>
              )}
            </Col>
            <Col span={8} style={{ textAlign: "center" }}>
              Page {currentPage} of {numPages}
            </Col>
            <Col span={8} style={{ textAlign: "right" }}>
              {!isLast && (
                <Link to={`/${nextPage}/`} rel="next">
                  <Button type="primary" ghost>
                    Next →
                  </Button>
                </Link>
              )}
            </Col>
          </Row>
        </div>
      </Layout>
    )
  }
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMysqlLists(
      sort: { fields: create_time, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          title
          href_hash
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
