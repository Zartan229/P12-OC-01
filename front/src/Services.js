import { User, Activity, AverageSession, Performance } from './Model.js'; // Récupères les classes
import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from './Mock.js'; // Récupères les mock

const API_BASE_URL = 'http://localhost:3000'; //Surplus mais facilite l'implémentation future.
let useMockData = false; //Gain de temps après première passe.

// fonction exporter asynchrone fetchUser
export async function fetchUser(userId) {
    //Si vrai s'assure que les donnée ne perde pas de temps a tenter d'atteindre l'api
    //Passe sur les mock
    if (useMockData) {
        console.log("Donnée mocker utilisateur");
        const userData = USER_MAIN_DATA.find(user => user.id === userId);
        //Utilise la classe User pour créer un jeux de donnée type
        return new User(userData);
    }
    try {
        //Requête sur l'api API_BASE_URL = Pour pouvoir changer l'url rapidement
        //UserId pour le dynamisme
        const response = await fetch(`${API_BASE_URL}/user/${userId}`);
        //Si la réponse n'est pas dans le cadre des 200(réussite) on envoie une erreur
        if (!response.ok) throw new Error('Erreur lors de la récupération des donnée API');
        //Sinon on convertie la reponse en JSON pour récupérer les donéne
        const responseData = await response.json();
        //Ensuite on retourne ces donnée, en utilisant le model toujours
        return new User(responseData.data);
    } catch (error) {
        console.error(error);
        //En cas d'erreur on true les mockData pour ne pas perdre du temps sur les appels
        useMockData = true; 
        //Utilise les donéne mock
        const userData = USER_MAIN_DATA.find(user => user.id === userId);
        //Envois la classe User avec les donnée
        return new User(userData);
    }
}


export async function fetchUserActivity(userId) {
    if (useMockData) {
        console.log("Donnée mocker activitée utilisateur");
        const activityData = USER_ACTIVITY.find(activity => activity.userId === userId);
        return new Activity(activityData);
    }
    try {
        const response = await fetch(`${API_BASE_URL}/user/${userId}/activity`);
        if (!response.ok) throw new Error('Erreur lors de la récupération des donnée API');
        const responseData = await response.json();
        return new Activity(responseData.data);
    } catch (error) {
        console.error(error);
        useMockData = true;
        const activityData = USER_ACTIVITY.find(activity => activity.userId === userId);
        return new Activity(activityData);
    }
}


export async function fetchUserAverageSessions(userId) {
    if (useMockData) {
        console.log("Donnée mocker session moyenne utilisateur");
        const avgSessionsData = USER_AVERAGE_SESSIONS.find(session => session.userId === userId);
        return new AverageSession(avgSessionsData);
    }
    try {
        const response = await fetch(`${API_BASE_URL}/user/${userId}/average-sessions`);
        if (!response.ok) throw new Error('Erreur lors de la récupération des donnée API');
        const responseData = await response.json();
        return new AverageSession(responseData.data);
    } catch (error) {
        console.error(error);
        useMockData = true;
        const avgSessionsData = USER_AVERAGE_SESSIONS.find(session => session.userId === userId);
        return new AverageSession(avgSessionsData);
    }
}

export async function fetchUserPerformance(userId) {
    if (useMockData) {
        console.log("Donnée mocker performance utilisateur");
        const performanceData = USER_PERFORMANCE.find(performance => performance.userId === userId);
        return new Performance(performanceData);
    }
    try {
        const response = await fetch(`${API_BASE_URL}/user/${userId}/performance`);
        if (!response.ok) throw new Error('Erreur lors de la récupération des donnée API');
        const responseData = await response.json();
        return new Performance(responseData.data);
    } catch (error) {
        console.error(error);
        useMockData = true;
        const performanceData = USER_PERFORMANCE.find(performance => performance.userId === userId);
        return new Performance(performanceData);
    }
}
