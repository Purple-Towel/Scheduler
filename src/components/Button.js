import React from "react";

import "components/Button.scss";
import Classnames from "classnames";

// renders a button with text 
export default function Button(props) {
   let { children, disabled, onClick, confirm, danger } = props;
   
   // logic to apply CSS styling
   let buttonClass = "button";
   let classNames = Classnames(buttonClass, {"button--confirm": confirm}, {"button--danger": danger})

   return (
      <button 
         className={classNames} 
         onClick={onClick}
         disabled={disabled}
      >
         {children}
      </button>
   );
}
