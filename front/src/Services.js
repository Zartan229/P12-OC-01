import { User, Activity, AverageSession, Performance } from './Model.js';

const API_BASE_URL = 'http://localhost:3000';


export function fetchUser(userId) {
    return fetch(`${API_BASE_URL}/user/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(responseData => {
            return new User(responseData.data);  
        })
        .catch(error => {
            console.error('Error fetching user:', error);
        });
}

export function fetchUserActivity(userId) {
    return fetch(`${API_BASE_URL}/user/${userId}/activity`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(responseData => {
            return new Activity(responseData.data);
        })
        .catch(error => {
            console.error('Error fetching user activity:', error);
        });
}

export function fetchUserAverageSessions(userId) {
    return fetch(`${API_BASE_URL}/user/${userId}/average-sessions`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(responseData => {
            return new AverageSession(responseData.data);
        })
        .catch(error => {
            console.error('Error fetching user average sessions:', error);
        });
}

export function fetchUserPerformance(userId) {
    return fetch(`${API_BASE_URL}/user/${userId}/performance`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(responseData => {
            return new Performance(responseData.data);
        })
        .catch(error => {
            console.error('Error fetching user performance:', error);
        });
}