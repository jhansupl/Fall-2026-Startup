const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

const users = [];
const authCookieName = 'token';

function setAuthCookie(res, user) {
  user.token = uuid.v4();
  res.cookie(authCookieName, user.token, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const findUser = (field, value) => users.find((u) => value && u[field] === value);

apiRouter.post('/auth/create', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ msg: 'Email and password are required' });
  }
  if (findUser('email', email)) {
    return res.status(409).send({ msg: 'Existing user' });
  }
  const user = { email, password: await bcrypt.hash(password, 10) };
  users.push(user);
  setAuthCookie(res, user);
  res.send({ email });
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = findUser('email', req.body.email);
  if (user && (await bcrypt.compare(req.body.password || '', user.password))) {
    setAuthCookie(res, user);
    return res.send({ email: user.email });
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', (req, res) => {
  const user = findUser('token', req.cookies[authCookieName]);
  if (user) delete user.token;
  res.clearCookie(authCookieName);
  res.status(204).end();
});

const toSeconds = (t) => {
  const [m, s] = t.split(':').map(Number);
  return m * 60 + s;
};

const scores = [];

const verifyAuth = (req, res, next) => {
  const user = findUser('token', req.cookies[authCookieName]);
  if (user) return next();
  res.status(401).send({ msg: 'Unauthorized' });
};

apiRouter.get('/scores', (_req, res) => {
  res.send(scores);
});

apiRouter.post('/score', verifyAuth, (req, res) => {
  const { name, time, date } = req.body;
  if (!name || !time || !date) {
    return res.status(400).send({ msg: 'name, time and date are required' });
  }
  scores.push([name, time, date]);
  scores.sort((a, b) => toSeconds(a[1]) - toSeconds(b[1]));
  res.send(scores.slice(0, 10));
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
