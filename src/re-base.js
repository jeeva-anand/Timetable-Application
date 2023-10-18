import Rebase from "re-base";
import firebase from "firebase/app";
import database from "firebase/database";

const app = firebase.initializeApp({
  // apiKey: 'AIzaSyCz1sOB93i4OFudhJdfVflL_bVy_fhZiLs',
  // authDomain: 'time-table-generator-separate.firebaseapp.com',
  // databaseURL: 'https://time-table-generator-separate.firebaseio.com',

  apiKey: "AIzaSyDfVk86NK5ube_gXhE_l7BJbVsNfi6wXxA",
  authDomain: "timetable-generator-3035d.firebaseapp.com",
  databaseURL: "https://timetable-generator-3035d-default-rtdb.firebaseio.com",
});

export default Rebase.createClass(database(app));
