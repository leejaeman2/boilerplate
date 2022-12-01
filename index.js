const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/key.js');

const { User } = require('./models/User.js');

app.set('port', process.env.PORT || 2031);
const port = app.get('port');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // application/json

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log(`MongoDB Connected...`))
  .catch(err => console.error(err));

app.get('/', (req, res) => res.send(`<h1>BODY 정보를 가져왔으면 좋겟다</h1>`));

app.post('/register', (req, res) => {
  // 회원가입할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터베이스에 넣어준다v
  console.log(`req.body: `);
  console.dir(req.body);
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if(err) {
      return res.json({ success: false, read: true, err });
    }

    return res.status(200).json({
      success: true
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`);
});
