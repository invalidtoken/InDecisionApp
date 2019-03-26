import React from "react";
import ReactDOM from "react-dom";
import { OptionModal } from "./component/Modal";
import "normalize.css"
import "./styles/styles.scss";

class IndecisionApp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      options : [],
      selected : undefined
    };
    this.handleRemoveAllOptions = this.handleRemoveAllOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleRemoveOption = this.handleRemoveOption.bind(this);
    this.handleHideModal = this.handleHideModal.bind(this);
  }

  // SEE: Lifecycle methods
  componentDidMount(){
    console.log("Component mounted");
    
    
    try{
      
      let json = localStorage.getItem("options");
      let options = json ? JSON.parse(json) : [];
      this.setState(() => {
        return {options};
      });

    }catch(error){
      // SEE: Do Nothing at all
    }

  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.options.length !== this.state.options.length){
      console.log("Component updated");
      let json = JSON.stringify(this.state.options);
      localStorage.setItem("options", json);
    }
  }

  handleRemoveAllOptions(){
    this.setState(() => ({ options : [] }));
  }

  handleRemoveOption(option){
    console.log("hro", option);
    this.setState((prevState) => {
      return {
        options : prevState.options.filter(eachOption => !(eachOption === option))
      };
    });
  }

  handlePick(){
    let random = Math.floor(Math.random()*this.state.options.length);
    if(this.state.options.length > 0){
      let thatValue = this.state.options[random]
      this.setState(() => ({ selected : thatValue }));
    }else{
      console.log("Nothing to pick");
    }
  }

  handleHideModal(){
    this.setState(() => ({ selected : undefined }));
  }

  handleAddOption(option){
    if(!option){
      return "Enter valid value to add item.";
    }else if(this.state.options.indexOf(option) > -1){
      return "This option already exists.";
    }

    this.setState((prevState) => {

      // SEE: Do not manipulate the prevState.options arr directly 
      // prevState.options.push(option);
      
      
      return { options : prevState.options.concat(option) };
    });
  }

  render(){
    console.log("Indecision App render is executed.");

    let appTitle = "Indecision App";
    let appSubTitle = "Put your life in hands of a computer";
    return (
      <div>
        <Header subTitle={appSubTitle}/>
        <div className="container">
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          
          <div className="widget">
            <Options
              handleRemoveAllOptions={this.handleRemoveAllOptions}
              options={this.state.options}
              handleRemoveOption={this.handleRemoveOption}
              />
            <AddOptions handleAddOption=
            {this.handleAddOption}/>
          </div>

        </div>
        <OptionModal 
          optionSelected={this.state.selected}
          handleHideModal={this.handleHideModal}
        />
      </div>
    );
  }
}

// SEE: Stateless functional component
function Header(props){
  return (
    <header className="header">
      <div className="container">
        <h1 className="header__title">{props.title}</h1>
        {props.subTitle && <p className="header__subtitle">{props.subTitle}</p>}
      </div>
    </header>
  );
}
Header.defaultProps = {
  title : "IndecisionApp"
};

// SEE: Stateless functional component
function Action(props){
  return (
    <div>
      <button
        className="big-button"
        disabled={!props.hasOptions}
        onClick={props.handlePick}
      >
        What should I do?
      </button>
    </div>
  );
}

function Options(props){
  return (
    <div>

      <div className="widget-header">
        
        <h3 className="widget-header__title">Your Options</h3>
        <button className="button button--link" onClick={props.handleRemoveAllOptions}>Remove All</button>

      </div>
      {props.options.length === 0 && <p className="widget__message">Please add an option to get started</p>}
      {
        props.options.map((eachOption, index) => {

          return (
            <Option
              key={index}
              handleRemoveOption={props.handleRemoveOption}
              data={eachOption}
              count={index + 1}
            />
          );
        
        })
      }
    </div>
  );
}

function Option(props){
  
  function handleRemoveOption(){
    props.handleRemoveOption(props.data);
  }

  return (
    <div className="option">
      <p className="option__text">{props.count}. {props.data}</p>
      <button className="button button--link" onClick={handleRemoveOption}>Remove</button>
    </div>
  );
}

class AddOptions extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      error : undefined
    };
    this.handleAddOption = this.handleAddOption.bind(this);
  }

  handleAddOption(event){
    event.preventDefault();
    let error = undefined;
    let value = event.target.addItem.value;
    if(value){
      value = value.trim();
      error = this.props.handleAddOption(value);
    }else{
      error = "Please enter a valid string in the form";
    }

    this.setState(() => {
      return {error};
    });

    
    if(!error){
      event.target.addItem.value = "";
    }
  }

  render(){
    return (
      <div>
        {this.state.error && <p className="add-option-error">{this.state.error}</p>}
        <form className="add-option" onSubmit={this.handleAddOption.bind(this)}>
          <input className="add-option__input"  type="text" name="addItem" placeholder="Add Something"/>
          <button className="button">Add Option</button>
        </form>
      </div>
    );
  }
}



ReactDOM.render(<IndecisionApp />, document.getElementById("root"));




































