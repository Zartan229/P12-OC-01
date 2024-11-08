//Par défaut passe par le back-end, si le back-end pas lancer, envoyer sur les Mocks
const { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } = require('./Mock.js');

class User {
  constructor({ id, userInfos, score, keyData }) {
    this.id = id;
    this.userInfos = userInfos;
    this.score = score;
    this.keyData = keyData;
  }
}

class Activity {
  constructor({ userId, sessions }) {
    this.userId = userId;
    this.sessions = sessions;
  }
}

class AverageSession {
  constructor({ userId, sessions }) {
    this.userId = userId;
    this.sessions = sessions;
  }
}

class Performance {
  constructor({ userId, kind, data }) {
    this.userId = userId;
    this.kind = kind;
    this.data = data;
  }
}

const userInstances = USER_MAIN_DATA.map(user => new User(user));
const activityInstances = USER_ACTIVITY.map(activity => new Activity(activity));
const averageSessionInstances = USER_AVERAGE_SESSIONS.map(averageSession => new AverageSession(averageSession));
const performanceInstances = USER_PERFORMANCE.map(performance => new Performance(performance));

module.exports = {
  userInstances,
  activityInstances,
  averageSessionInstances,
  performanceInstances
};

