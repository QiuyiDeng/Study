import "core-js/stable";
let name = 'Bob';
const age = 18;

const add = (x,y) => x+y;

new Promise((resolve,rejest)=>{
  resolve('成功');
}).then(value =>{
	console.log(value);
});

Array.from('hello')

class Person{
  constructoe(name,age){
    Object.assign(this,{name,age})
  }
}

export default age;