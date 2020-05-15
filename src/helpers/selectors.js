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