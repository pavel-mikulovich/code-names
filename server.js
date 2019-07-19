var express = require('express');
var app = express();

console.log('started');
app.use(express.static('public'));

// app.get('/', function (req, res) {
//     res.send('Hello World!');
// });

app.listen(process.env.PORT || 3000, function () {
    // console.log('Example app listening on port 3000!');
});