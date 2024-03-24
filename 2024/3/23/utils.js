// 工具函数

// 序列化
const serialize = param =>{
  const results = [];
  for(const [key,value] of Object.entries(param)){
    results.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  }
  // console.log(param);
  return results.join('&');
}
// 给URL添加参数
const addURLData=(url,data)=>{
  if(!data)return '';
  const mark = url.includes('?')?'&':'?';
  return `${mark}${data}`
}
export {
  serialize,
  addURLData
}