import React from "react";
import { useNavigate } from "react-router-dom";

function ButtonDanger(props) {
  let navigate = useNavigate();
  function handleClick() {
    navigate(props.onClick);
  }
  return (
      <button onClick={handleClick} className="btn btn-danger">{props.label}</button>
  );
}

export default ButtonDanger