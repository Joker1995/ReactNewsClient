import React from 'react';
import {Row, Col} from 'antd';
import {Menu,Icon,Tabs,message,Form,Input,Button,CheckBox,Modal} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;

export default class MobileHeader extends React.Component{
  constructor(){
    super();
    this.state={
      current:'top',
      modalVisiable:false,
      action:'login',
      hasLogined:false,
      userNickName:'',
      userid:0
    };
  };

  setModalVisible(value){
    this.setState({modalVisiable:value});
  };

  componentWillMount(){
    if(localStorage.userid!=''){
      this.setState({hasLogined:true});
      this.setState({
        userNickName:localStorage.userNickName,
        userid:localStorage.userid
      });
    }
  };

  handleClick(e){
    if(e.key="register"){
      this.setState({current:'register'});
      this.setModalVisible(true);
    }else{
      this.setState({current:e.key});
    }
  };

  handleSumbit(e){
    e.preventDefault();
    var myFetchOptions={
      method:'GET'
    };
    var formData=this.props.form.getFieldsValue();
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action
        +"&username="+formData.username+"&password="+formData.password
        +"&r_userName="+formData.r_userName+"&r_password="+formData.r_password
        +"&r_confirmPassword="+formData.r_confirmPassword,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
          this.setState({userNickName:json.NickUserName,userid:json.UserId});
        });
    if(this.state.action=="login"){
      this.setState({hasLogined:true});
    }
    message.success("请求成功！");
    this.setModalVisible(false);
  };

  login(){
    this.setModalVisible(true);
  };

  callback(key){
    if(key==1){
      this.setState({action:'login'});
    }else if(key==2){
      this.setState({action:'register'});
    }
  };

  render(){
    let {getFieldProps}=this.props.form;
    return();
  };
}
