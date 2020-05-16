import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment"

import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({...prev, day }));

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days").then(result => result.data)),
      Promise.resolve(axios.get("/api/appointments").then(result => result.data)),
      Promise.resolve(axios.get("/api/interviewers").then(result => result.data))
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0], appointments: all[1], interviewers: all[2]}))
    })
  }, [])

  const appointments = getAppointmentsForDay(state, state.day);

  const interviewers = getInterviewersForDay(state, state.day);

  function bookInterview(id, interview, mode, errorMode, cb) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then((response) => setState({...state, appointments}))
    .then(() => cb(mode, true))
    .catch(err => {
      cb(errorMode, true);
    });
  }

  function cancelInterview(id, mode, errorMode, cb) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then((response) => setState({...state, appointments}))
    .then(() => cb(mode, true))
    .catch((err) => {
      cb(errorMode, true);
    });
  }

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment 
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  });

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment id="last" time="5pm" />
      </section>
    </main>
  );
}

