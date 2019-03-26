
import React from "react";
import Modal from "react-modal"

export function OptionModal(props){
  console.log("Options Seleted : ",props.optionSelected);
  return (
    <Modal
      isOpen={!!props.optionSelected}
      contentLabel="Selected Option"
      ariaHideApp={false}
      onRequestClose={props.handleHideModal}
      closeTimeoutMS={200}
      className="modal"
    >
      <h3 className="modal__title">Selected Option</h3>
      {props.optionSelected && <p className="modal__body">{props.optionSelected}</p>}
      <button
        className="button"
        onClick={props.handleHideModal}
      >
        Ok Got It!
      </button>
    </Modal>
  );
}

























