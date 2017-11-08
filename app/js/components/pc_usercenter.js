import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col, Modal} from 'antd';
import {Menu, Icon} from 'antd';
import {Tabs,message,Form,Input,Button,Checkbox,Card,notification,Upload} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class PCUserCenter extends React.Component{
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

    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid="+localStorage.userid,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
          this.setState({usercollection:json});
        });
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid="+localStorage.userid,
          myFetchOptions)
    		.then(response=>response.json())
    		.then(json=>{
    			this.setState({usercomments:json});
    		});
  };

  render(){
    const props={
      action:'http://newsapi.gugujiankong.com/handler.ashx',
      headers: {
				"Access-Control-Allow-Origin": "*"
			},
      listType: 'picture-card',
      defaultFileList: [
        {
          uid:-1,
          name:'xxx.png',
          state:'done',
          url:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
					thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
        }
      ],
      onPreview:(file)=>{
        this.setState({previewImage:file.url,previewVisible:true});
      }
    };

    const {usercollection,usercomments}=this.state;
    const usercollectionList=usercollection.lengh?usercollection.map((item,index)=>{
      <Card key={index} title={item.uniquekey}
          extra={<a target="_blank" href={`/#/details/${item.uniquekey}`}>查看</a>}>
        <p>{item.Title}</p>
      </Card>
    }):'您还没有收藏任何新闻';

    const usercommentsList=usercomments.length?usercomments.map((item,index)=>{
      <Card key={index} title={`于 ${item.datatime} 评论了文章 ${item.uniquekey}`}
          extra={<a target="_blank" href={`/#/details/${item.uniquekey}`}>查看</a>}>
        <p>{item.Comments}</p>
      </Card>
    }):'您还没有发表任何评论';

    return(
      <div>
        <PCHeader/>
        <Row>
          <Col span={2}></Col>
          <Col span={20}>
            <Tabs>
              <TabPane tab="我的收藏列表" key="1">
                <div class="comment">
                  <Row>
                    <Col span={24}>
                      {usercollectionList}
                    </Col>
                  </Row>
                </div>
              </TabPane>
              <TabPane tab="我的评论列表" key="2">
                <div class="comment">
                  <Row>
                    <Col span={24}>
                      {usercommentsList}
                    </Col>
                  </Row>
                </div>
              </TabPane>
              <TabPane tab="头像设置" key="3">
                <div class="clearfix">
                  <Upload {...props}>
                    <Icon type="plus"/>
                    <div className="ant-upload-text">上传图片</div>
                  </Upload>
                  <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handlerCancel}>
                    <img alt="预览" src={this.state.previewImage}/>
                  </Modal>
                </div>
              </TabPane>
            </Tabs>
          </Col>
          <Col span={2}></Col>
        </Row>
        <PCFooter/>
      </div>
    );
  };
}
