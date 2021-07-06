/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useState } from "react"
import * as dayjs from "dayjs"
import * as relativeTime from "dayjs/plugin/relativeTime"
import { Link } from "gatsby"
import PropTypes from "prop-types"

import { Row, Col, Image, Tag } from "antd"

import "./item.css"

const getUuid = require("uuid-by-string")

function FoxNews({ news }) {
  const {
    title,
    status,
    href_hash,
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
    <div className="items" key={img_url}>
      <div className="it">
        <Row gutter={[8]} justify="start">
          <Col span={24}>
            <Link to={`/posts/${href_hash}/`} className="head1">
              {title}
            </Link>
          </Col>
          <Col span={24}>
            <div className="desc">{description}</div>
          </Col>
        </Row>
      </div>
      <div>
        <Image
          preview={false}
          className="image-size"
          src={imagesUrl}
          fallback={backImgUrl}
        />
      </div>
      <div className="it">
        <Row gutter={[8]} justify="start" align="middle">
          <Col span={8}>
            <Tag>{menu}</Tag>
          </Col>
          <Col span={8}>
            <div className="ctime">{ctime}</div>
          </Col>
          <Col span={8}>
            <div className="source">
              src:{" "}
              <a href={href} target="blank">
                {source.toUpperCase()}
              </a>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

FoxNews.defaultProps = {
  news: {},
}

FoxNews.propTypes = {
  news: PropTypes.object,
}

export default FoxNews
