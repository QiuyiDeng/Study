// Ajax类
const DEFAULTS = { //默认参数
  method:'GET',
  //请求头携带数据
  params:null,
  //请求体携带数据
  data:null,
  contentType:'application/x-www-form-urlencoded',
  responseType:'',
  timeoutTime:0,
  withCredentials:false,
  success(){},
  httpCodeError(){},
  error(){},
  about(){},
  timeout(){},

}
import {serialize,addURLData} from './utils.js'
export default class Ajax{
  constructor(url,options){
    this.url = url;
    this.options = Object.assign({},DEFAULTS,options);
    this.init();
  }
  init(){
    const xhr = new XMLHttpRequest();
    this.xhr = xhr;
    this.bindEvents();
    xhr.open(this.options.method,this.url+this.addParam(),true);// true异步
    // 设置responseType
    this.setResponseType();
    //设置跨越是否设置cookie
    this.setCookie();
    // 设置timeoutTime
    this.setTimeoutTime();
    // 发送请求 
    this.sendData();
    
  }
  bindEvents(){
    const xhr = this.xhr;
    const {success,httpCodeError,error,about,timeout} = this.options;
    // load
    xhr.addEventListener('load',()=>{
      if(xhr.status>=200&&xhr.status<300||xhr.status==304){
        success(xhr.response,xhr);
      }else{
        httpCodeError(xhr.status,xhr);
      }
    },false)
    // error
    xhr.addEventListener('error',()=>{
      error(xhr);
    },false)
    // abort
    xhr.addEventListener('abort',()=>{
      about(xhr);
    },false)
    // timeout
    xhr.addEventListener('timeout',()=>{
      timeout(xhr);
    },false)
  }
  addParam(){
    const {params} = this.options;
    if(!params)return '';
    return addURLData(this.url,serialize(params));
  }
  setResponseType(){
    this.xhr.responseType = this.options.responseType;
  }
  setCookie(){
    this.xhr.withCredentials = this.options.withCredentials;
  }
  setTimeoutTime(){
    this.xhr.timeout = this.options.timeoutTime;
  }
  sendData(){
    const xhr = this.xhr;
    const {data,contentType} = this.options;
    //是否需要发送数据
    if(!data || toLowerCase(this.method) == 'get')return xhr.send(null);
    let resultData = null;
    //发送FormData数据
    if(data instanceof FormData){
      resultData = new FormData(data);
    }else if(contentType.toLowerCase()
    .includes('application/x-www-form-urlencoded')){
      //发送名值对数据
      resultData = serialize(data);
    }else if(contentType.toLowerCase()
    .includes('application/json')){
      //发送JSON数据
      resultData = JSON.stringify(data);
    }else{
      // 发送其他格式
      resultData = data;
    }
    //设置contentType
    xhr.setRequestHeader('Content-Type',contentType);
    xhr.send(resultData);
  }
  getXHR(){
    return this.xhr;
  }
}