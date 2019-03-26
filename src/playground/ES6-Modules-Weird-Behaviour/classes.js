console.log("Started Running classes.js file");
import React,{Component} from "react";
import {App} from "./app.js";


export default class StateFullApp extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div>
        <App body="This is the body."/>
      </div>
    );
  }
}

console.log("Finished Running classes.js file");