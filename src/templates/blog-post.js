import React, { useState }  from "react"
import { graphql, navigate } from "gatsby"
import { Affix, Button, Image } from 'antd';
import { CaretLeftOutlined } from '@ant-design/icons';
import Layout from "../components/layout"
import SEO from "../components/seo"

const blogPost = ({ data }) => {
  const post = data.allMysqlLists.edges[0].node
  const context = JSON.parse(post.content)
  const backImgUrl = `https://oss.edms.site/news/${post.local_src}`
  const imagesUrl = post.src
  let imgshow = <></>
  let showtext = <></>
  if(post.src) {
    imgshow = <Image preview={false} className="image-size" src={imagesUrl} fallback={backImgUrl}/>
  }
  switch(post.source) {
    case 'foxnews':
      showtext = context.map((item, index) => (
        <div className="content" key={index}>
          {item}
        </div>
      ))
      break;
      case 'bbc':
      showtext = context.map((item, index) => (
        <div className="content" key={index}>
          {item}
        </div>
      ))
      break;
      default:
        showtext = context.map((item, index) => (
            <div className="content" key={index}>
              {item}
            </div>
          ))
  }

  return (
    <Layout>
      <SEO title={post.title} description={post.description} />
      <div style={{ textAlign:"right", marginRight:20 }}>
      <Affix offsetTop={520}>
          <Button type="primary" size="large" shape="circle" icon={<CaretLeftOutlined />} onClick={() => navigate(-1)} />
      </Affix>
      </div>
      <div className="post-main">
      <h4>{post.title}</h4>
      {imgshow}
      {showtext}
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
        content
      }
    }
  }
}
`
export default blogPost;