
//Constructeur pour générer les différente donnée fournis aux Charte.
//Classe User par soucis de maintenabilité et utilisation
class User {
  constructor({ id, userInfos, score, todayScore, keyData }) {
    this.id = id;
    this.userInfos = userInfos;
    this.score = score ? score : todayScore;
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
//Exporte les classes pour les utiliser dans Services.js
module.exports = {
  User,
  Activity,
  AverageSession,
  Performance
};

