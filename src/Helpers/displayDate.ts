import dateFormat from 'dateformat';

const displayDate = (date: Date) => dateFormat(date, 'dd/mm/yyyy');

export default displayDate;

// const d = '09/02/1997';

// const day = d.slice(0, 2);
// const month = d.slice(3,5) - 1;
// const year = d.slice(6);

// let a = new Date(year,month,day);
