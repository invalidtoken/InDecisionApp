
import React from "react";
import ReactDOM from "react-dom";
function App(props){
  return (
    <div>
      <h1>{props.title}</h1>
      {props.children}
      <p>{props.body}</p>
    </div>
  );
}

let layout = (
  <App title="App" boy="Practice-App">
    <p>para-1</p>
    <p>para-2</p>
  </App>
);

console.log(layout);