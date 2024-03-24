function set(name,value,{maxAge,domain,path,secure}={}){
  let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if(typeof maxAge === 'number'){
    cookieText+='; maxAge='+maxAge;
  }
  if(domain){
    cookieText+='; domain='+domain;
  }
  if(path){
    cookieText+='; path='+path;
  }
    cookieText+='; secure'+secure;
  document.cookie = cookieText;
}
function getByName(name){
  const cookieText = decodeURIComponent(document.cookie);
  const cookieArr = cookieText.split('; ');
  const value = cookieArr.find(val=>{
    return val.split('=')[0] === name;
  });
  // console.log(value);
  if(!value)return;
  return value.split('=')[1];
}
function remove(name,{domain,path}={}){
  set(name,'',{maxAge:-1,path,domain});
}
export {
  set,
  getByName,
  remove
}