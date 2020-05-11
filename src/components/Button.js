import React from "react";

import "components/Button.scss";
import Classnames from "classnames";

export default function Button(props) {
   let buttonClass = "button";
   let classNames = Classnames(buttonClass, {"button--confirm": props.confirm}, {"button--danger": props.danger})

   return (
      <button 
         className={classNames} 
         onClick={props.onClick}
         disabled={props.disabled}
      >
         {props.children}
      </button>
   );
}
