import React from "react";
import { NavLink } from "react-router-dom"

function Navbaritem( {render, ...props} ){
    
    if(render){
        return(
            <li>
                <NavLink className="nav-link" to={props.href}>{props.label}</NavLink>
            </li>
        )
    }else{
        return false;
    }
}

export default Navbaritem