// utils/date.js
 const getDayName = (dateString) => {
  const daysInEnglish = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(dateString);
  return daysInEnglish[date.getDay()];
};

export default getDayName;