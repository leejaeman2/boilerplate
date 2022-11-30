const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.set('port', process.env.PORT || 2031);
const port = app.get('port');

mongoose.connect(`mongodb+srv://leejaeman:1234qwer@boilerplate.i4hmian.mongodb.net/?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log(`MongoDB Connected...`))
  .catch(err => console.error(err));

app.get('/', (req, res) => res.send(`<h1>우리집에 왜 왔니?</h1>`));

app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`);
});
