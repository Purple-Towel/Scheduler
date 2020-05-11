import React from "react";

import "components/DayListItem.scss";
import Classnames from "classnames";

export default function DayListItem(props) {
  let dayClass = {"day-list__item": true, "day-list__item--selected": props.selected, "day-list__item--full": (props.spots === 0)};
  let classNames = Classnames(dayClass);
  return (
    <li 
      className={classNames}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots}</h3>
    </li>
  );
}