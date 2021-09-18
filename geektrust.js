const fs = require('fs');
const {main} = require('./main');
const filename = process.argv[2];

const output = main(filename);

console.log(output);

output.forEach(room => {
    console.log(room);
})