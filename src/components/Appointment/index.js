import React from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

import { useVisualMode } from "components/hooks/useVisualMode"

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM =  "CONFIRM";
  const EDIT = "EDIT";
  const ERR_SAVE = "ERR_SAVE"
  const ERR_DELETE = "ERR_DELETE"

  const { time, interview } = props;
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    props.bookInterview(props.id, interview, SHOW, ERR_SAVE, transition);
  }
  function cancel() {
    transition(DELETING, true);
    props.cancelInterview(props.id, EMPTY, ERR_DELETE, transition);
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit={() => {transition(EDIT)}}
          onDelete={() => {transition(CONFIRM)}}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form 
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving..." />
      )}
      {mode === DELETING && (
        <Status message="Deleting..." />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you wish to delete this appointment?"
          onConfirm={cancel}
          onCancel={back}
        />
      )}
      {mode === ERR_SAVE && (
        <Error message="Error saving." onClose={back} />
      )}
      {mode === ERR_DELETE && (
        <Error message="Error deleting." onClose={back} />
      )}
    </article>
  );
};