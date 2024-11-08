import { User, Activity, AverageSession, Performance } from './Model.js';
import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from './Mock.js';

const API_BASE_URL = 'http://localhost:3000';
let useMockData = false; 


export async function fetchUser(userId) {
    if (useMockData) {
        console.log("Using mock data for user");
        const userData = USER_MAIN_DATA.find(user => user.id === userId);
        return new User(userData);
    }
    try {
        const response = await fetch(`${API_BASE_URL}/user/${userId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const responseData = await response.json();
        return new User(responseData.data);
    } catch (error) {
        console.error(error);
        useMockData = true; 
        const userData = USER_MAIN_DATA.find(user => user.id === userId);
        return new User(userData);
    }
}


export async function fetchUserActivity(userId) {
    if (useMockData) {
        console.log("Using mock data for user activity");
        const activityData = USER_ACTIVITY.find(activity => activity.userId === userId);
        return new Activity(activityData);
    }
    try {
        const response = await fetch(`${API_BASE_URL}/user/${userId}/activity`);
        if (!response.ok) throw new Error('Network response was not ok');
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
        console.log("Using mock data for user average sessions");
        const avgSessionsData = USER_AVERAGE_SESSIONS.find(session => session.userId === userId);
        return new AverageSession(avgSessionsData);
    }
    try {
        const response = await fetch(`${API_BASE_URL}/user/${userId}/average-sessions`);
        if (!response.ok) throw new Error('Network response was not ok');
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
        console.log("Using mock data for user performance");
        const performanceData = USER_PERFORMANCE.find(performance => performance.userId === userId);
        return new Performance(performanceData);
    }
    try {
        const response = await fetch(`${API_BASE_URL}/user/${userId}/performance`);
        if (!response.ok) throw new Error('Network response was not ok');
        const responseData = await response.json();
        return new Performance(responseData.data);
    } catch (error) {
        console.error(error);
        useMockData = true;
        const performanceData = USER_PERFORMANCE.find(performance => performance.userId === userId);
        return new Performance(performanceData);
    }
}
