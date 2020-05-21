import React from "react";

// renders an empty appointment that has not been booked yet
export default function Empty(props) {
  const { onAdd } = props;
  return (
    <main className="appointment__add">
       <img
          className="appointment__add-button"
          src="images/add.png"
          alt="Add"
          onClick={onAdd}
        />
    </main>
  );
};