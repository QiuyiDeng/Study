import Ajax from "./Ajax.js";

const ajax = (url,options) =>{
  // return new Ajax(url,options).getXHR();
  let xhr;
  const p = new Promise((resolve,reject)=>{
    xhr = new Ajax(url,{...options,...{
      success(response){
        resolve(response);
      },
      httpCodeError(status){
        reject({
          type:1, // httpCode错误
          text:`HTTP状态码异常 ${status}`
        })
      },
      error(xhr){
        reject({
          type:2, // 请求错误
          text:`请求错误 `
        })
      },
      about(xhr){
        reject({
          type:3, // 请求终止错误
          text:`请求终止错误`
        })
      },
      timeout(xhr){
        reject({
          type:4, // 请求超时错误
          text:`请求超时错误`
        })
      }
    }}).getXHR();
  })
  p.xhr = xhr;
  return p;
}
const get = (url,options) =>{
  return ajax(url,{...options,method:'GET'});
}
const getJSON = (url,options) =>{
  return ajax(url,{...options,method:'GET',responseType:'json'});
}
const post = (url,options) =>{
  return ajax(url,{...options,method:'POST'});
}
export {
  ajax,
  get,
  getJSON,
  post
}