/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useState } from "react"
import * as dayjs from "dayjs"
import * as relativeTime from "dayjs/plugin/relativeTime"

import PropTypes from "prop-types"

import { Row, Col, Image, Modal, Tag } from "antd"

import "./item.css"

function FoxNews({ news }) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const {
    Id,
    Title,
    Description,
    Source,
    ImgUrl,
    LoadImg,
    Href,
    CreateTime,
    Menu,
    Content,
  } = news
  const context = JSON.parse(Content)
  dayjs.extend(relativeTime)
  const ctime = dayjs().to(dayjs(CreateTime))
  const backImgUrl = `https://oss.edms.site/news/${LoadImg}`
  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleOk = () => {
    setIsModalVisible(false)
  }
  return (
    <div className="item" key={Id}>
      <Row gutter={[8]} justify="start" onClick={showModal}>
        <Col span={8}>
          <Image
            preview={false}
            className="image-size"
            src={ImgUrl}
            fallback={backImgUrl}
          ></Image>
        </Col>
        <Col span={16}>
          <div className="title">{Title}</div>
        </Col>
        <Col span={24}>
          <div className="desc">{Description}</div>
        </Col>
      </Row>
      <Row gutter={[8]} justify="start" align="middle">
        <Col span={8}>
          <Tag>{Menu}</Tag>
        </Col>
        <Col span={8}>
          <div className="ctime">{ctime}</div>
        </Col>
        <Col span={8}>
          <div className="source">
            src:{" "}
            <a href={Href} target="blank">
              {Source.toUpperCase()}
            </a>
          </div>
        </Col>
      </Row>
      <Modal
        title={Source.toUpperCase()}
        visible={isModalVisible}
        onCancel={handleOk}
        onOk={handleOk}
        okText="Close"
      >
        <h4>{Title}</h4>
        {context.map((item, index) => {
          const strong = "<strong"
          if (!item.includes(strong)) {
            const html = { __html: item }
            return (
              <div
                className="content"
                key={index}
                dangerouslySetInnerHTML={html}
              ></div>
            )
          }
        })}
      </Modal>
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
