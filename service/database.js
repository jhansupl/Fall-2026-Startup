const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${encodeURIComponent(config.userName)}:${encodeURIComponent(config.password)}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('mazeracer');
const userCollection = db.collection('user');
const scoreCollection = db.collection('score');

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log('Connected to database');
  } catch (ex) {
    console.log(`Unable to connect to database with ${url.replace(/:[^:@]*@/, ':***@')} because ${ex.message}`);
    process.exit(1);
  }
})();

const toSeconds = (t) => {
  const [m, s] = t.split(':').map(Number);
  return m * 60 + s;
};

function getUser(username) {
  return userCollection.findOne({ username });
}

function getUserByToken(token) {
  return token ? userCollection.findOne({ token }) : null;
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ username: user.username }, { $set: user });
}

async function clearToken(token) {
  await userCollection.updateOne({ token }, { $unset: { token: '' } });
}

async function addScore({ name, time, date }) {
  await scoreCollection.insertOne({ name, time, date, seconds: toSeconds(time) });
}

async function getHighScores() {
  const docs = await scoreCollection.find().sort({ seconds: 1 }).limit(10).toArray();
  return docs.map((d) => [d.name, d.time, d.date]);
}

module.exports = { getUser, getUserByToken, addUser, updateUser, clearToken, addScore, getHighScores };
