const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key.js');

const {auth} = require('./middleware/auth');
const { User } = require('./models/User.js');

app.set('port', process.env.PORT || 2031);
const port = app.get('port');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // application/json
app.use(cookieParser());

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log(`MongoDB Connected...`))
  .catch(err => console.error(err));

app.get('/', (req, res) => res.send(`<h1>BODY 정보를 가져왔으면 좋겟다</h1>`));

app.get('/api/hello', (req, res) => {
  res.send('그 많던 사과는 누가 다 먹었는가?~~~');
});

app.post('/api/users/register', (req, res) => {
  // 회원가입할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터베이스에 넣어준다v
  console.log(`req.body: `);
  console.dir(req.body);
  const user = new User(req.body);
  console.log(`user password: ${user.password}`);
  user.save((err, userInfo) => {
    if(err) {
      return res.json({ success: false, read: true, err });
    }

    return res.status(200).json({
      success: true
    });
  });
});

app.post('/api/users/login', (req, res) => {
  // 1. 요청된 이메일을 데이터베이스에서 있는지 찾음
  User.findOne({email: req.body.email}, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: '제공된 이메일에 해당하는 유저가 없습니다.'
      });
    }

    // 2. 요청된 이메일이 데이터베이스에 있다면
    //    비밀번호가 맞는 비밀번호인지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) {
        return res.json({
          loginSuccess: false, 
          message: '비밀번호가 틀렸습니다' 
        });
      }

      // 3. 비밀번호까지 맞다면 토큰을 생성하기
      user.generateToken((err, user) => {
        if(err) {
          return res.status(400).send(err);
        }

        // 토큰을 쿠키에 저장
        res.cookie("x_auth", user.token)
        .status(200)
        .json({loginSuccess: true, userId: user._id});
      });
    });
  });
});

app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  });
});

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({_id: req.user._id}, 
    { token: "" }, (err, user) => {
      if(err) {
        return res.json({success: false, err});
      }

      return res.status(200).send({
        success: true
      });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`);
});
