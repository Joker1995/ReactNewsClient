import React from 'react';
import {Row, Col} from 'antd';
import {Tabs, Carousel} from 'antd'

import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block';
import PCProduct from './pc_products';
const TabPane = Tabs.TabPane;

export default class PCNewsContainer extends React.Component{
  render(){
    const setting={
      dots:true,
      infinite:true,
      speed:500,
      slidesToShow:1,
      autoplay:true
    };
    return(
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20} class="container">
            <div class="leftContainer">
              <div class="carousel">
                <Carousel {...setting}>
                  <div><img src="./app/images/carousel_1.jpg"/></div>
                  <div><img src="./app/images/carousel_2.jpg"/></div>
                  <div><img src="./app/images/carousel_3.jpg"/></div>
                  <div><img src="./app/images/carousel_4.jpg"/></div>
                </Carousel>
              </div>
              <PCNewsImageBlock count={6} type="guoji" width="400px" carTitle="国际头条"></PCNewsImageBlock>
            </div>
            <Tabs class="tabs_news">
              <TabPane tab="头条新闻" key=1>
                <PCNewsBlock count={22} type="top" width="100%" bordered="false"/>
              </TabPane>
              <TabPane tab="国际" key=2>
                <PCNewsBlock count={22} type="top" width="100%" bordered="false"/>
              </TabPane>
            </Tabs>
            <Tabs class="tabs_product">
              <TabPane tab="ReactNews 产品" key=1>
                <PCProduct/>
              </TabPane>
            </Tabs>
            <div>
              <PCNewsImageBlock count={8} type="guonei" width="100%" carTitle="国内新闻" imageWidth="132px"/>
              <PCNewsImageBlock count={16} type="yule" width="100%" carTitle="娱乐新闻" imageWidth="132px"/>
            </div>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    );
  };
}
