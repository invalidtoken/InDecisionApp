console.log("Started Running app.js file");

import React from "react";
import ReactDOM from "react-dom";
import StateFullApp from "./classes"


export function App(props){
  return (
    <div>
      <h1>Complete React-Webpack Setup</h1>
      <p>{props.body}</p>
    </div>
  );
}

let element = React.createElement(StateFullApp);

ReactDOM.render(element, document.getElementById("add"));





console.log("Finished Running app.js file");












