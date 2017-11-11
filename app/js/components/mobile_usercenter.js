import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col, Modal} from 'antd';
import {Menu, Icon} from 'antd';
import {Tabs,message,Form,Input,Button,Checkbox,Card,notification,Upload} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router'
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class MobileUserCenter extends React.Component {
  constructor(){
    super();
    this.state={
      usercollection:'',
      usercomments:'',
      previewImage:'',
      previewVisible:false
    };
  };

  componentDidMount(){
    var myFetchOptions={
      method:'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid="
          +localStorage.userid, myFetchOptions)
          .then(response=>response.json())
          .then(json=>this.setState({usercomments:json});
  };

  render(){
    const {usercollection,usercomments} = this.state;
    const usercollectionList=usercollection.length?
          usercollection.map((item,index)=>(
            <Card key={index} title={item.uniquekey}
                extra={<a href={`/#/details/${item.uniquekey}`}>查看</a>}>
                <p>{item.Title}</p>
            </Card>
          )):'您还没有收藏任何的新闻';
    const usercommentsList = usercomments.length ?
          usercomments.map((item,index)=>(
    		      <Card key={index} title={`于 ${item.datetime} 评论了文章`}
                  extra={<a href={`/#/details/${item.uniquekey}`}>查看</a>}>
    			       <p>{item.Comments}</p>
    		      </Card>
          )):'您还没有发表过任何评论';
    return(
      <div>
        <MobileHeader/>
        <Row>
          <Col span={24}>
            <Tabs>
                <TabPane tab="我的收藏列表" key="1">
                  <Row>
                    <Col span={24}>
                      {usercollectionList}
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tab="我的评论列表" key="2">
							    <Row>
    								<Col span={24}>
    									{usercommentsList}
    								</Col>
    							</Row>
  							</TabPane>
  							<TabPane tab="头像设置" key="3"></TabPane>
            </Tabs>
          </Col>
        </Row>
        <MobileFooter/>
      </div>
    );
  };
}
