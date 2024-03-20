// 轮播图特效
(function(){
  // 得到元素
  var carousel_list = document.querySelector('#carousel_list');
  var left_btn = document.querySelector('#left_btn');
  var right_btn = document.querySelector('#right_btn');
  var circle_ol = document.querySelector('.circles');
  var circle_list = circle_ol.querySelectorAll('li');
  // 克隆
  var clone_li = carousel_list.firstElementChild.cloneNode(true);
  carousel_list.appendChild(clone_li);

  // 当前正在显示图片
  var idx = 0;

  left_btn.onclick = function(){   
    if(idx<=0){
      carousel_list.style.transition = 'none';
      carousel_list.style.transform = 'translateX('+-16.66*5+'%)';
      setTimeout(function(){ 
        carousel_list.style.transition = 'transform .5s ease 0s';
        carousel_list.style.transform = 'translateX('+-16.66*4+'%)';
        idx=4;
      },0); 
    }else{
      idx--;
      carousel_list.style.transform = 'translateX('+-16.66*idx+'%)';
    }
    setCircle();
  };
  right_btn.onclick = function(){
    carousel_list.style.transition = 'transform .5s ease 0s';
    idx++;
    carousel_list.style.transform = 'translateX('+-16.66*idx+'%)';
    // 最后一张瞬间移动回来
    if(idx > 4){
      setTimeout(function(){
        carousel_list.style.transition = 'none';
        carousel_list.style.transform = 'none';
        idx=0;
      },500); 
    }
    setCircle();
  };
  // 设置小圆点的current在谁身上
  function setCircle(){
    vat lis
  }
})();