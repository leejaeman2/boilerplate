const express = require('express');
const app = express();
const port = process.env.PORT || 4011;
const bodyParser = require('body-parser');
const {User} = require('./models/User');
const config = require('./config/key');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const mongoose = require('mongoose');
console.log('mongoURI : ', config.mongoURI);
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true//,  
  //useCreateIndex: true,
  //useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error(err));

app.get('/', (req, res) => res.send(`<h1>Hello~~! World 사과</h1>`));

app.post('/register', (req, res) => {
  // 회원 가입할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if(err) {
      return res.json({success: false, err});
    } else {
      return res.status(200).json({
        success: true
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Exapmle app listening on port ${port}~!`);
});
