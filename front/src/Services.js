//Par défaut passe par le back-end, si le back-end pas lancer, envoyer sur les Mocks
const { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } = require('./Mock.js');

class UserService {
    constructor() {
        this.USER_MAIN_DATA = USER_MAIN_DATA;
        this.USER_ACTIVITY = USER_ACTIVITY;
        this.USER_AVERAGE_SESSIONS = USER_AVERAGE_SESSIONS;
        this.USER_PERFORMANCE = USER_PERFORMANCE;
    }

    getUserData(userId) {
        return this.USER_MAIN_DATA.find(user => user.id === userId);
    }

    getUserActivity(userId) {
        return this.USER_ACTIVITY.find(activity => activity.userId === userId);
    }

    getUserAverageSessions(userId) {
        return this.USER_AVERAGE_SESSIONS.find(session => session.userId === userId);
    }

    getUserPerformance(userId) {
        return this.USER_PERFORMANCE.find(performance => performance.userId === userId);
    }
}

const userService = new UserService();

module.exports = userService;
