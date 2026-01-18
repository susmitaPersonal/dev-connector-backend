const express = require('express');

const app = express();

app.use("/test",(req, res) => {
    res.send('Hey devs ready to connect? ;) \n TESTING 123');
})

app.use("/dashboard",(req, res) => {
    res.send('Welcome to the Dashboard!');
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT || 5000}`);
});