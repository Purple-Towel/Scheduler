import React from "react";

// renders a simple header with the time slot passed in as a prop
export default function Header(props) {
  const { time } = props;
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{time}</h4>
      <hr className="appointment__separator" />
    </header>
  );
};