import React from "react";

import "components/DayListItem.scss";
import Classnames from "classnames";

export default function DayListItem(props) {
  // logic for applying CSS styling
  let dayClass = {"day-list__item": true, "day-list__item--selected": props.selected, "day-list__item--full": (props.spots === 0)};
  let classNames = Classnames(dayClass);

  // logic for formatting the remaining number of spots as a sentence
  const formatSpots = () => {
    let { spots } = props;
    if (spots === 0) {
      return "no spots remaining"
    } else if (spots === 1) {
      return `${spots} spot remaining`
    } else {
      return `${spots} spots remaining`
    }
  };

  // returns a single day item
  return (
    <li 
      data-testid="day"
      className={classNames}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}