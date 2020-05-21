import { useState, useEffect } from "react";
import axios from "axios";

// custom hook for managing the state in src/Application.js
export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({...prev, day }));

  // initial axios data fetching
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days").then(result => result.data)),
      Promise.resolve(axios.get("/api/appointments").then(result => result.data)),
      Promise.resolve(axios.get("/api/interviewers").then(result => result.data))
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0], appointments: all[1], interviewers: all[2]}))
    })
  }, []);

  // adds interview to the DB
  function bookInterview(id, interview, mode, errorMode, cb) {
    // code that grabs the spots for the day and updates it
    const selectedDay = state.day;
    let indexOfDay = null;
    let spotsFromDay = null;

    for (let i = 0; i < state.days.length; i ++) {
      if (state.days[i].name === selectedDay) {
        indexOfDay = i;
        spotsFromDay = state.days[i].spots; 
      }
    }

    const newDayItem = {
      ...state.days[indexOfDay],
      spots: state.appointments[id].interview ? spotsFromDay : spotsFromDay - 1 // logic to determine whether to subtract from spots remaining or not
    };

    const newDaysList = {
      ...state.days,
      [indexOfDay]: newDayItem
    }

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then((response) => setState({...state, appointments, days: Object.values(newDaysList)})) // newDaysList must be converted to array
    .then(() => cb(mode, true))
    .catch(err => {
      cb(errorMode, true);
    });
  }

  // removes interview from DB
  function cancelInterview(id, mode, errorMode, cb) {
    // code that grabs the spots for the day and updates it
    const selectedDay = state.day;
    let indexOfDay = null;
    let spotsFromDay = null;

    for (let i = 0; i < state.days.length; i ++) {
      if (state.days[i].name === selectedDay) {
        indexOfDay = i;
        spotsFromDay = state.days[i].spots;
      }
    }

    const newDayItem = {
      ...state.days[indexOfDay],
      spots: spotsFromDay + 1
    };

    const newDaysList = {
      ...state.days,
      [indexOfDay]: newDayItem
    }

    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then((response) => setState({...state, appointments, days: Object.values(newDaysList)})) // newDaysList must be converted to array
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