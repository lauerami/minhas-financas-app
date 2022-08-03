import React from "react";
import { useNavigate } from "react-router-dom";

function ButtonSuccess(props) {
  let navigate = useNavigate();
  function handleClick() {
    navigate(props.onClick);
  }
  return (
      <button onClick={handleClick} className="btn btn-success">{props.label}</button>
  );
}

export default ButtonSuccess