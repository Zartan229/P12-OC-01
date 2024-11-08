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

module.exports = {
  User,
  Activity,
  AverageSession,
  Performance
};

