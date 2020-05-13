import React from "react";

import "components/InterviewerListItem.scss"
import Classnames from "classnames";

export default function InterviewerListItem(props) {
  const { name, avatar, selected, setInterviewer} = props;
  let interviewerClass = {"interviewers__item": true, "interviewers__item--selected": selected}
  let classNames = Classnames(interviewerClass);


return (
    <li 
      className={classNames}
      onClick={setInterviewer}
    >
    <img
      className="interviewers__item-image"
      src={avatar}
      alt={name}
    />
    {selected && name}
    </li>
  );
};