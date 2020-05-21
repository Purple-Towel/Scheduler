
// selector for filtering appointments given a day and state
export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter((filteredDay) => {
   return filteredDay.name === day;
  })
  if (filteredDays.length === 0) {
    return [];
  }
  const filteredAppointments = filteredDays[0].appointments.map(appointment => {
    return state.appointments[appointment];
  })
  return filteredAppointments;
};

// selector for filtering interviewers given a day and state
export function getInterviewersForDay(state, day) {
  const filteredInterviewers = state.days.filter((filteredInterviewer) => {
   return filteredInterviewer.name === day;
  })
  if (filteredInterviewers.length === 0) {
    return [];
  }
  const filteredInterviewersByAppointments = filteredInterviewers[0].interviewers.map((interviewer) => {
    return state.interviewers[interviewer];
  })
  return filteredInterviewersByAppointments;
};

// selector for returning an interview object from the state
export function getInterview(state, interview) {
  let interviewOutput = null;
  let findInterviewer = null;
  
  if (interview) {
    findInterviewer = state.interviewers[`${interview.interviewer}`];
  }

  if (findInterviewer) {
    interviewOutput = {
      student: interview.student,
      interviewer: findInterviewer
    }
  }

  return interviewOutput;
}