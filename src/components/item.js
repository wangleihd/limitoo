/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"

import "./item.css"

function Item({news}) {
    const {Id,Title, Description, Source, ImgUrl, Href, Content} = news
    const context = JSON.parse(Content)

  return (
    <div className="item" key={Id}>
        <div className="title">{Title}</div>
        <div className="desc">{Description}</div>
    </div>
  )
}

Item.defaultProps = {
    news: {}
}

Item.propTypes = {
    news: PropTypes.object
}

export default Item
