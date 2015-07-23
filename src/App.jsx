import React from 'react';

var randomDelay = function(fn) {
  setTimeout(() => {
    fn()
  }, Math.random() * 500)
}
class CounterStorage{
  constructor(){
    this.num = 1
  }
  getNum(){
    return new Promise((resolve, reject) =>{
      randomDelay(() => {
        resolve(this.num)
      })
    })
  }
  increment(){
    return new Promise((resolve, reject) => {
      randomDelay(() => {
        this.num++
        resolve();
      })
    })
  }
  decrement(){
    return new Promise((resolve, reject) => {
      randomDelay(() => {
        this.num--
        resolve();
      })
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
    return <button onClick={this.props.onClick}>{this.props.label}</button>
  }
}

export default class App extends React.Component{
  constructor(){
    super()
    this.storage = new CounterStorage()
    this.state = {count: 0}
    this.syncStorage();
  }
  syncStorage(){
    this.storage.getNum().then((num) => {
      this.setState({
        count: num
      })
    })
  }
  doIncrement(){
    this.storage.increment().then((num) => {
      this.syncStorage()
    })
  }
  doDecrement(){
    this.storage.decrement().then((num) => {
      this.syncStorage()
    })
  }
  render(){
    return <div> 
      <Counter count={this.state.count} />
      <Button  onClick={this.doIncrement.bind(this)} label="+"/>
      <Button  onClick={this.doDecrement.bind(this)} label="-"/>
    </div>
  }
}