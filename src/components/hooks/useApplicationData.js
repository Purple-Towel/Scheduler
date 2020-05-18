import { useState, useEffect } from "react";
import axios from "axios";

export function useApplicationData() {
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
  }, []);

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

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}