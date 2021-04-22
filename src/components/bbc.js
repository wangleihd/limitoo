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

import { Row, Col, Image, Modal, Tag } from "antd"

import "./bbc.css"

function Bbc({ news }) {
  const [isShowModal, setIsShowModal] = useState(false)
  const {
    Id,
    Title,
    Description,
    Source,
    ImgUrl,
    LoadImg,
    Href,
    CreateTime,
    Content,
    Menu,
  } = news
  const context = JSON.parse(Content)
  dayjs.extend(relativeTime)
  const ctime = dayjs().to(dayjs(CreateTime))
  const backImgUrl = `https://oss.edms.site/news/${LoadImg}`

  const showModal = () => {
    setIsShowModal(true)
  }
  const handleOk = () => {
    setIsShowModal(false)
  }

  return (
    <div className="item-bbc" key={Id}>
      <Row gutter={[8]} justify="start" onClick={showModal}>
        <Col span={24}>
          <div className="title">{Title}</div>
          <div className="desc">{Description}</div>
        </Col>
        <Col span={24}>
          <Image
            preview={false}
            className="image-size-bbc"
            src={ImgUrl}
            fallback={backImgUrl}
          />
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
            source:{" "}
            <a href={Href} target="blank">
              {Source.toUpperCase()}
            </a>
          </div>
        </Col>
      </Row>
      <Modal
        title={Source.toUpperCase()}
        visible={isShowModal}
        onCancel={handleOk}
        onOk={handleOk}
        okText="Close"
      >
        <h4>{Title}</h4>
        {context.map((item, index) => {
          const img = "<img"
          const greyLine = "grey line"
          if (!item.includes(greyLine)) {
            if (item.includes(img)) {
              const html = { __html: item }
              return (
                <div
                  className="content"
                  key={index}
                  dangerouslySetInnerHTML={html}
                ></div>
              )
            } else {
              return (
                <div className="content" key={index}>
                  {item}
                </div>
              )
            }
          }
        })}
      </Modal>
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
