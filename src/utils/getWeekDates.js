export const getWeekDates = (date) => {
    const week = [];
    const firstDayOfWeek = new Date(date);
    const day = firstDayOfWeek.getDay();
    const diff = firstDayOfWeek.getDate() - day + (day === 0 ? -6 : 1); 
    firstDayOfWeek.setDate(diff);
    
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(firstDayOfWeek);
      newDate.setDate(firstDayOfWeek.getDate() + i);
      week.push(newDate);
    }
    
    return week;
  };