import React, { Component } from "react"
import axios from "axios"
import { Skeleton, Switch, List, Avatar } from 'antd';
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';

import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Item from "../components/item"
import "./index.css"

class ClientFetchingExample extends Component { 

  state = {
    loading: false,
    error: false,
    data: [],
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
          Loading ...
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
    await axios.get(`https://h5fs.com/v1/news-en`).then(ret => {
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
