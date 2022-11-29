const express = require('express');
const app = express();
const port = process.env.PORT || 4011;
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://leejaeman:1234qwer@boilerplate.i4hmian.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true//,  
  //useCreateIndex: true,
  //useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error(err));

app.get('/', (req, res) => res.send(`<h1>Hello~~! World</h1>`));

app.listen(port, () => {
  console.log(`Exapmle app listening on port ${port}~!`);
});
