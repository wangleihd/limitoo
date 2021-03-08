import React, { Component } from "react"
import ReactMtfScrollList from 'react-mtfscrolllist'
import axios from "axios"
import { Skeleton, Switch, List, Avatar } from 'antd';
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';

import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Item from "../components/item"
import "./index.css"

const listData = [];
for (let i = 0; i < 20; i++) {
  listData.push({});
}

const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);



class ClientFetchingExample extends Component { 
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      error: false,
      data: [],
      page: 1,
    }
  }

  componentDidMount() {
    this.getNewData()
  }
  render() {
    const { data, loading } = this.state
    if(loading === true) {
      return (
        <Layout>
         <div className="loading">
         <List
          itemLayout="vertical"
          size="large"
          dataSource={listData}
          renderItem={item => (
            <List.Item
              key={item.title}
              actions={
                !loading && [
                  <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                  <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                  <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                ]
              }
              extra={
                !loading && (
                  <img
                    width={272}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                )
              }
            >
              <Skeleton loading={loading} active avatar>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<a href={item.href}>{item.title}</a>}
                  description={item.description}
                />
                {item.content}
              </Skeleton>
            </List.Item>
          )}
        />

         </div>
        </Layout>
      )
    } else {
      return (
        <Layout>
          { data.map(item => (
            <Item news={item} key={item.id} ></Item>
          ))
          }
        </Layout>
      )
    }

  }
  async getNewData(){
    this.setState({ loading: true })
    const page = this.state.page
    await axios.get(`https://h5fs.com/v1/newslists?page=${page}`).then(ret => {
        const { data, code } = ret
        if(!code){
          this.setState({ data: data.data })
        }
      })
      .catch(error => {
        this.setState({ loading: false, error })
      })
    this.setState({ loading: false })
  }
}

export default ClientFetchingExample
