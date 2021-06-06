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
  const seourl = `https://limitoo.com/posts/${post.href_hash}/`
  let imgshow = <></>
  let showtext = <></>
  let seoimges = post.img_url
  if(post.src) {
      seoimges = post.src
  }
  
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
      case 'abc':
        imgshow = <Image preview={false} className="image-size" src={post.img_url} fallback={post.load_img}/>
        showtext = context.map((item, index) => {
          const img = "<img"
          const div = "<div"
          const greyLine = "grey line"
          if (!item.includes(greyLine)) {
            if (item.includes(img)) {
              const html = { __html: item }
              return (
                <div key={index} dangerouslySetInnerHTML={html} />
              )
            } if (item.includes(div)) {
              const html = { __html: item }
              return (
                <div key={index} dangerouslySetInnerHTML={html} />
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
      case 'lemonde':
        showtext = context.map((item, index) => {
          const img = "<img"
          const div = "<div"
          const greyLine = "grey line"
          if (!item.includes(greyLine)) {
            if (item.includes(img)) {
              const html = { __html: item }
              return (
                <div key={index} dangerouslySetInnerHTML={html} />
              )
            } if (item.includes(div)) {
              const html = { __html: item }
              return (
                <div key={index} dangerouslySetInnerHTML={html} />
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
      <SEO title={post.title} description={post.description} images={seoimges} url={seourl} />
      <div style={{ textAlign:"right", marginRight:20 }}>
      <Affix offsetTop={520}>
          <Button type="primary" size="large" shape="circle" icon={<CaretLeftOutlined />} onClick={() => navigate(-1)} />
      </Affix>
      </div>
      <div className="posttitle">{post.title}</div>
      {imgshow}
      {showtext}
      </div>
      
    </Layout>
  )
}

export const query = graphql`
query($slug: String!) {
  allMysqlLists(filter: { href_hash: { eq: $slug } }) {
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
        href_hash
      }
    }
  }
}
`
export default blogPost;