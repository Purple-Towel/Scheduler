import React, { useState } from "react";

// subcomponent imports
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const { interviewers, onSave, onCancel } = props;
  const [name, setName] = useState(props.name || ""); // sets name if passed as prop
  const [error, setError] = useState("");
  const [interviewer, setInterviewer] = useState(props.interviewer || null); // sets interviewer if passed as prop

  // validates that a name and interviewer has been entered
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Interviewer must be selected");
      return;
    }
  
    setError("");
    onSave(name, interviewer);
  }
  
  // clears the fields if cancel is clicked
  const reset = function() {
    setName("");
    setInterviewer(null);
  }
  const cancel = function() {
    reset();
    onCancel();
  }

  // returns a form element
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={name}
          onChange={event => {
            setName(event.target.value);
          }}
          data-testid="student-name-input"
        />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
          interviewers={interviewers} 
          value={interviewer} 
          onChange={setInterviewer} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
};