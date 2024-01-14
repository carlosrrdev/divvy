import "./style.css";
import "./js/mobile.js";
import {format} from "date-fns";

const dateWeekElement = document.getElementById('date-week')
const dateFullElement = document.getElementById('date-full');

(() => {
  const date = new Date();
  dateWeekElement.textContent = format(date, 'iiii');
  dateFullElement.textContent = format(date, 'MMMM dd, yyyy');
})()