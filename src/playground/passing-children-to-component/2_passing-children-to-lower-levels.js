import React from "react";
import ReactDOM from "react-dom";


function Details(props){
  console.log("Props inside Details - ", props);
  return (
    <div>
      <h1>This is heading</h1>
      {props.children}
    </div>
  );
}

function AuthDetails(props){
  console.log("Props inside AuthDetails - ", props);
  return (
    <div>
      {props.isAuthenticated ? (
        <Details {...props}/>
      ) : (
        <p>Not Authenticated</p>
      )}
    </div>
  );
}

let element = (
  <AuthDetails isAuthenticated={true}>
    <p>This is para-1</p>
    <p>This is para-2</p>
  </AuthDetails>
);

console.log(element);

ReactDOM.render(element, document.getElementById("root"));