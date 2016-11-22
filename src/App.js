import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.setDisplay = this.setDisplay.bind(this);
    this.setResult = this.setResult.bind(this);  
    this.state={
      display:[],
      float:true,
      parenthes:0,
      result:""
    }
  }
  setDisplay(e){
    let val = e.target.value;
    let lastLtr = this.state.display;
    lastLtr = lastLtr[lastLtr.length-1];
    let newVal;

    if((Number(val) || val==="0") && lastLtr!=")" ){
      newVal = val;
    }else if(val==="." && this.state.float && lastLtr!="."){
      if(lastLtr!="0" && !Number(lastLtr)){
        newVal = "0."
      }else{
        newVal="."
      }
      this.setState({
        float:false
      });
    }else if(!Number(val) && val!="parenthesis"){
      if( (Number(lastLtr) || lastLtr==="0" || lastLtr===")") && val!=="."){
        this.setState({
          float:true
        });
        newVal = val;
      }else{
        newVal="";
      }
    }else if(val==="parenthesis"){
        if(this.state.parenthes===0 || lastLtr==="("){
          if(Number(lastLtr) || lastLtr==="0" || lastLtr===")"){
            newVal="x(";
          }else{
            newVal="(";
          }
          this.setState({
            parenthes:this.state.parenthes+1
          })
        }else if(Number(lastLtr) || lastLtr==="0"){
          newVal=")";
          this.setState({
            parenthes:this.state.parenthes-1
          })
        }
    }else{
      newVal="";
    }

    if(newVal){
      this.setState({
        display:this.state.display.concat([newVal])
      })
    }

  }

  delDisplay(){
    let disp = this.state.display;
    disp.pop();
    this.setState({
      display:disp
    })
  }
  clrDisplay(){
    this.setState({
      display:[],
      float:true,
      parenthes:0,
      result:[]
    })
  }
  setResult(){
    let resultVal = this.state.display;
    resultVal=eval(resultVal.join("").replace(/x/ig,"*").replace(/÷/ig,"/"));
    this.setState({
      result:resultVal
    })
  }
  render() {
    return (
      <div className="calculator">
        <div className="screen">
          <div className="display">{this.state.display}</div>
          <div className="result txt-green">{this.state.result}</div>
        </div>
        <div className="buttons">
          <button value="c" className="bg-gray" onClick={this.clrDisplay.bind(this)}>C</button>
          <button value="&divide;" className="bg-gray" onClick={this.setDisplay}>&divide;</button>
          <button value="x" className="bg-gray" onClick={this.setDisplay}>x</button>
          <button className="bg-gray" onClick={this.delDisplay.bind(this)}><span className="delete">X</span></button>
          <button value="7" onClick={this.setDisplay}>7</button>
          <button value="8" onClick={this.setDisplay}>8</button>
          <button value="9" onClick={this.setDisplay}>9</button>
          <button value="-" className="bg-gray" onClick={this.setDisplay}>-</button>
          <button value="4" onClick={this.setDisplay}>4</button>
          <button value="5" onClick={this.setDisplay}>5</button>
          <button value="6" onClick={this.setDisplay}>6</button>
          <button value="+" className="bg-gray" onClick={this.setDisplay}>+</button>
          <button value="1" onClick={this.setDisplay}>1</button>
          <button value="2" onClick={this.setDisplay}>2</button>
          <button value="3" onClick={this.setDisplay}>3</button>
          <button value="parenthesis" className="bg-gray" onClick={this.setDisplay}>()</button>
          <button value="0" onClick={this.setDisplay}>0</button>
          <button value="." onClick={this.setDisplay}>.</button>
          <button value="negative">+/-</button>
          <button value="=" className="bg-gray txt-green" onClick={this.setResult}>=</button>
        </div>
      </div>
    );
  }
}

export default App;
