import React from 'react';

class CounterStorage{
  constructor(){
    this.num = 1
  }
  getNum(){
    return new Promise((resolve, reject) =>{
      setTimeout(() => {
        resolve(this.num)
      }, 500)
    })
  }
  increment(){
    return new Promise((resolve, reject) => {
      this.num++
      resolve();
    })
  }
}

class Counter extends React.Component{
  render(){
    return <div>{this.props.count}</div>
  }
}

class Button extends React.Component{
  render(){
    return <button>+</button>
  }
}

export default class App extends React.Component{
  constructor(){
    super()
    this.state = {count: 0}
    let storage = new CounterStorage()
    let gen = (function *(){
      yield storage.getNum()
    })()
    console.log(gen)
    let num = gen().next()
    this.setState({
      count: num
    })
  }
  render(){
    return <div> 
      <Counter count={this.state.count} />
      <Button />
    </div>
  }
}