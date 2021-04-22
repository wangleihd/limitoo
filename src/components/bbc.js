/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useState } from "react"
import PropTypes from "prop-types"
import * as dayjs from "dayjs"
import * as relativeTime from "dayjs/plugin/relativeTime"
import { Link } from "gatsby"
import { Row, Col, Image, Tag } from "antd"

import "./bbc.css"
const getUuid = require('uuid-by-string')

function Bbc({ news }) {
  const { title,
    status,
    src,
    source,
    menu,
    local_src,
    load_img,
    img_url,
    href,
    description,
    create_time,
    country,
} = news
dayjs.extend(relativeTime)
const ctime = dayjs().to(dayjs(create_time))
let backImgUrl = `https://oss.edms.site/news/${load_img}`
let imagesUrl = img_url
if (local_src) {
backImgUrl = `https://oss.edms.site/news/${local_src}`
imagesUrl = src
}

  return (
    <div className="item-bbc" key={img_url}>
      <Row gutter={[8]} justify="start">
        <Col span={24}>
        <Link to={`/posts/${getUuid(title)}/`}>
             <div className="title">{title}</div>
          </Link>
          <div className="desc">{description}</div>
        </Col>
        <Col span={24}>
          <Image
            preview={false}
            className="image-size-bbc"
            src={imagesUrl}
            fallback={backImgUrl}
          />
        </Col>
      </Row>
      <Row gutter={[8]} justify="start" align="middle">
        <Col span={8}>
          <Tag>{menu}</Tag>
        </Col>
        <Col span={8}>
          <div className="ctime">{ctime}</div>
        </Col>
        <Col span={8}>
          <div className="source">
            source:{" "}
            <a href={href} target="blank">
              {source.toUpperCase()}
            </a>
          </div>
        </Col>
      </Row>
    </div>
  )
}

Bbc.defaultProps = {
  news: {},
}

Bbc.propTypes = {
  news: PropTypes.object,
}

export default Bbc
