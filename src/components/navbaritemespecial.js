import React from "react";
import { NavLink } from "react-router-dom"

function Navbaritemespecial( {render, ...props} ){

    if(render){
        return(
            <li>
                <NavLink className="nav-link" to={props.href} onClick={e => props.exitAction()}>{props.label}</NavLink>
            </li>
        )
    }else{
        return false;
    }
}

export default Navbaritemespecial