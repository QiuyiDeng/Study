// 轮播图特效
(function(){
  // 得到元素
  var banner = document.querySelector('#banner');
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
  // 节流锁，如果是关闭的那就什么都不做
  var lock = true;

  left_btn.onclick = function(){   
    if(!lock)return;
    lock = false;
    if(idx<=0){
      carousel_list.style.transition = 'none';
      carousel_list.style.transform = 'translateX('+-16.66*5+'%)';
      setTimeout(function(){ 
        carousel_list.style.transition = 'transform .5s ease 0s';
        carousel_list.style.transform = 'translateX('+-16.66*4+'%)';
      },0); 
      idx=4;
    }else{
      idx--;
      carousel_list.style.transform = 'translateX('+-16.66*idx+'%)';
    }
    setCircle();
    setTimeout(function(){
      lock = true;
    },500);
  };
 
  function rightBtn(){
    if(!lock)return;
    lock = false;
    carousel_list.style.transition = 'transform .5s ease 0s';
    idx++;
    carousel_list.style.transform = 'translateX('+-16.66*idx+'%)';
    // 最后一张瞬间移动回来
    if(idx > 4){
      setTimeout(function(){
        carousel_list.style.transition = 'none';
        carousel_list.style.transform = 'none';
      },500); 
      idx=0;
    }
    setCircle();
    setTimeout(function(){
      lock = true;
    },500);
  }
  right_btn.onclick = rightBtn;
  // 自动轮播，定时触发右按钮
  var timer = setInterval(rightBtn,3000);
  // 设置小圆点的current在谁身上
  function setCircle(){
    for(var i=0;i<5;i++){
      if(i == idx){
        circle_list[i].className = 'current';
      }else{
        circle_list[i].className = '';
      }
    }
  }
  console.log(circle_ol);
  // 小圆点事件委托
  circle_ol.onclick = function(e){
    if(e.target.tagName.toLowerCase() == 'li'){
      e.target.className = 'current';
      circle_list[idx].className = '';
      idx = e.target.getAttribute('data-n');
      carousel_list.style.transform = 'translateX('+-16.66*idx+'%)';
    }
  }

  // 鼠标进入，自动轮播暂停
  
  banner.onmouseenter = function(){
    clearInterval(timer);
  }
  // 鼠标离开，自动轮播开始
  banner.onmouseleave = function(){
    clearInterval(timer);
    timer = setInterval(rightBtn,3000);
  }
})();