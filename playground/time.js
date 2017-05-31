const moment = require('moment');

/*
const date = new Date();
console.log(date.getMonth());
*/

const someTimestamp = moment().valueOf();
console.log(someTimestamp);
const createdAt = 1234;
const date = moment(someTimestamp);
console.log(date.format('MMM Do, Y HH:mm:ss'));

console.log(date.format('h:mm a'));
