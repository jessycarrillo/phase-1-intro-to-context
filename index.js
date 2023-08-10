function createEmployeeRecord(attributes){
    const employeeInfo = {
        firstName: attributes[0],
        familyName: attributes[1],
        title: attributes[2],
        payPerHour: attributes[3],
        timeInEvents: [], //to do
        timeOutEvents:[] // to do
    }
    return employeeInfo;
}

function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map(createEmployeeRecord);

}

function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, time] = dateStamp.split(' ');
    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(time),
        date: date
    };
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, time] = dateStamp.split(' ');
    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(time),
        date: date
    };
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateStamp) {
   let timeInEvent = employeeRecord.timeInEvents.find(value => value.date === dateStamp);
   let timeOutEvent = employeeRecord.timeOutEvents.find(value => value.date === dateStamp);
   return (timeOutEvent.hour - timeInEvent.hour)/100
} 

function wagesEarnedOnDate(employeeRecord, dateStamp){
    return employeeRecord.payPerHour * hoursWorkedOnDate(employeeRecord, dateStamp)
}

function allWagesFor(employeeRecord){
    const availableDates = employeeRecord.timeInEvents.map((timeInEvent) => (timeInEvent.date));
    let totalWage = availableDates.reduce((res, date) => res + wagesEarnedOnDate(employeeRecord, date), 0)
    return totalWage
}

function calculatePayroll(employeeRecords) {
   let totalPayroll = 0
    employeeRecords.forEach((employeeRecord) => {
        totalPayroll += allWagesFor(employeeRecord)
       });
    return totalPayroll
}