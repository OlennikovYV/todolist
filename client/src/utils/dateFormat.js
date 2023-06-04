function prependZero(number) {
  return number < 10 ? "0" + number : number;
}

function getDateTimeNow(dateTime, splitDate = "-", splitTime = ":") {
  let date, time;

  let year = String(dateTime.getFullYear());

  let month = String(dateTime.getMonth() + 1);
  let day = String(dateTime.getDate());
  let hours = String(dateTime.getHours());
  let minutes = String(dateTime.getMinutes());
  let seconds = String(dateTime.getSeconds());
  let milliseconds = String(dateTime.getMilliseconds());

  month = prependZero(month);
  day = prependZero(day);
  hours = prependZero(hours);
  minutes = prependZero(minutes);
  seconds = prependZero(seconds);
  milliseconds = prependZero(milliseconds);

  date = `${year}${splitDate}${month}${splitDate}${day}`;
  time = `${hours}${splitTime}${minutes}${splitTime}${seconds}`;

  return {
    date,
    time,
    year,
    month,
    day,
    hours,
    minutes,
    seconds,
    milliseconds,
  };
}

function dateFormat(dateString) {
  const { date, time } = getDateTimeNow(new Date(dateString));

  // console.log(dateString);
  return `${date} ${time}`;
}

export default dateFormat;
