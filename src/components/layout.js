/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"

import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <div style={{ backgroundColor: `#fafafa` }}>
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
          }}
        >
          <main
            style={{
              maxWidth: 660,
            }}
          >
            {children}
          </main>

          <footer
            style={{
              textAlign: `center`,
              margin: `2rem 0`,
            }}
          >
            © {new Date().getFullYear()}, Built with
            {` Limitoo News `}
            <a href="https://limitoo.com">limitoo.com</a>
          </footer>
        </div>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
