import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

const labels=['1','2','3','⌫','AC','4','5','6','+','-','7','8','9','*','/','0','.','=','^']
const keyCodes=['+','-','*','/','^','=','1','2','3','4','5','6','7','8','9','0','Enter', 'Backspace','Delete','Tab','.']

class CalcButton extends React.Component {
  render() {
    return (
      <input type="button" value={this.props.value} onClick={this.props.onClick}/>
    );
  }
}

class CalculatorView extends React.Component{
  constructor() {
    super();
    this.clickHandler = this.clickHandler.bind(this)
    this.inputChange = this.inputChange.bind(this)
    this.inputEnter = this.inputEnter.bind(this)
    this.clear = this.clear.bind(this)
    this.state={calc:0,value:'', result:'0',op:'=',
    funcs:{'+':(a,b)=>{return a+b},'-':(a,b)=>{return a-b},'*':(a,b)=>{return a*b},'/':(a,b)=>{return a/b}, '^':(a,b)=>{return a**b},'=':(a,b)=>{return b}}}
  }

  render() {
    return (
      <form className="container" id='root'>
        <div className="result" id="result" >{this.state.result}</div>  
        <input type="text" id="inp"ref={(el) => { this.inp = el;}}  value={this.state.value} onKeyDown={this.inputEnter} onChange={this.inputChange} placeholder="0"/>
        <div className="buttons">
          {labels.map((item) => <CalcButton value={item}  onClick={this.clickHandler}/>)}
        </div>
      </form>
    );
  }

  clickHandler(e){
    this.click(e.target.value)
  }

  click(operation){
    this.inp.focus()
    if(operation.toString().match(/[0-9]/)!==null){
      this.setState({value:this.state.value+operation})
      return
    }
    if(operation==='.'){
      if(this.state.value.toString().indexOf('.')===-1)
        this.setState({value:this.state.value+'.'})
      return
    }
    if(operation==='AC'){
      this.clear()
      return
    }
    if(operation==='⌫'){
      this.deleteLast();
      return
    }
    this.update()
    this.setState({
      op:operation,
      value:""},()=>{this.setState({result:this.state.calc.toString()+(operation==='='?'':operation)})})
  }

  update(){
    if(this.state.value!=='')
    this.setState({calc:this.state.funcs[this.state.op.toString()](this.state.calc,parseFloat(this.state.value))})
  }

  clear(){
    this.setState({calc:0, value:'', result:'0', op:'='})
    this.setState({calc:0, value:'', result:'0', op:'='})
  }

  inputEnter(e){
    var keyCode = e.key;
    if(keyCode === 'Enter'){
      e.preventDefault();
      this.inputUpdate(this.state.value+'=')
    }
    if(keyCode === 'Backspace'){
      e.preventDefault();
      this.deleteLast();
    }
    if(keyCode === 'Delete'){
      e.preventDefault();
      this.clear()
    }
    if(!keyCodes.includes(keyCode)){
      e.preventDefault();
    }
  }

  inputChange(e){
    this.inputUpdate(e.target.value)
  }

  inputUpdate(value){
    let lastChar=value.charAt(value.length-1)
    if(lastChar.toString().match(/[0-9.]/)===null)
      this.setState({value:value.substr(0,value.length-1)})
    else
      this.setState({value:value})
    if(lastChar.toString().match(/[/*+-=^]/)!==null)
      this.click(lastChar)
    if(lastChar==='.' && this.state.value.toString().indexOf('.')!==-1)
      this.setState({value:value.substr(0,value.length-1)})
  }

  deleteLast(){
    this.setState({value:this.state.value.substr(0,this.state.value.length-1)})
  }
}

ReactDOM.render(
  <CalculatorView />,
  document.getElementById('root')
);
reportWebVitals();
