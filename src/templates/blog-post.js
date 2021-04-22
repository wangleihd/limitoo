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
  
  switch(post.source) {
    case 'foxnews':
      imgshow = <Image preview={false} className="image-size" src={post.img_url} fallback={post.iconload_img}/>
      showtext = context.map((item, index) => {
        const strong = "<strong"
        if (!item.includes(strong)) {
          const html = { __html: item }
          return (
            <div className="content" key={index} dangerouslySetInnerHTML={html} />
          )
        }
      })
      break;
    case 'cbsnews':
      imgshow = <Image preview={false} className="image-size" src={post.img_url} fallback={post.load_img}/>
      showtext = context.map((item, index) => {
        const strong = "<strong"
        if (!item.includes(strong)) {
          const html = { __html: item }
          return (
            <div className="content" key={index} dangerouslySetInnerHTML={html} />
          )
        }
      })
      break;
      case 'bbc':
      showtext = context.map((item, index) => {
        const img = "<img"
        const greyLine = "grey line"
        if (!item.includes(greyLine)) {
          if (item.includes(img)) {
            const html = { __html: item }
            return (
              <div className="content" key={index} dangerouslySetInnerHTML={html} />
            )
          } 
            return (
              <div className="content" key={index}>
                {item}
              </div>
            )
        }
      })
      break;
      default:
        if(post.src) {
            imgshow = <Image preview={false} className="image-size" src={imagesUrl} fallback={backImgUrl}/>
          }
        showtext = context.map((item, index) => (
            <div className="content" key={index}>
              {item}
            </div>
          ))
  }

  return (
    <Layout>
      <div className="postmain">
      <SEO title={post.title} description={post.description} />
      <div style={{ textAlign:"right", marginRight:20 }}>
      <Affix offsetTop={520}>
          <Button type="primary" size="large" shape="circle" icon={<CaretLeftOutlined />} onClick={() => navigate(-1)} />
      </Affix>
      </div>
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