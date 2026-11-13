const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const DB = require('./database.js');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

const authCookieName = 'token';

async function setAuthCookie(res, user) {
  user.token = uuid.v4();
  await DB.updateUser(user);
  res.cookie(authCookieName, user.token, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

apiRouter.post('/auth/create', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ msg: 'Username and password are required' });
  }
  if (await DB.getUser(username)) {
    return res.status(409).send({ msg: 'Existing user' });
  }
  const user = { username, password: await bcrypt.hash(password, 10) };
  await DB.addUser(user);
  await setAuthCookie(res, user);
  res.send({ username });
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.username);
  if (user && (await bcrypt.compare(req.body.password || '', user.password))) {
    await setAuthCookie(res, user);
    return res.send({ username: user.username });
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', async (req, res) => {
  const token = req.cookies[authCookieName];
  if (token) await DB.clearToken(token);
  res.clearCookie(authCookieName);
  res.status(204).end();
});

const toSeconds = (t) => {
  const [m, s] = t.split(':').map(Number);
  return m * 60 + s;
};

const scores = [
  ['mazeMaster', '0:42', '2026-09-10'],
  ['racer123', '0:51', '2026-09-11'],
  ['wallCrawler', '1:03', '2026-09-12'],
  ['speedySam', '1:07', '2026-09-12'],
  ['jhan', '1:12', '2026-09-13'],
  ['kai', '1:19', '2026-09-14'],
  ['deadEndDan', '1:25', '2026-09-14'],
  ['loopLucy', '1:31', '2026-09-15'],
];

const verifyAuth = async (req, res, next) => {
  const user = await DB.getUserByToken(req.cookies[authCookieName]);
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
