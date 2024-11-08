const API_BASE_URL = 'http://localhost:3000';


function fetchUser(userId) {
    return fetch(`${API_BASE_URL}/user/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('User Data:', data); 
            return data;
        })
        .catch(error => {
            console.error('Error fetching user:', error);
        });
}


function fetchUserActivity(userId) {
    return fetch(`${API_BASE_URL}/user/${userId}/activity`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('User Activity:', data); 
            return data;
        })
        .catch(error => {
            console.error('Error fetching user activity:', error);
        });
}

function fetchUserAverageSessions(userId) {
    return fetch(`${API_BASE_URL}/user/${userId}/average-sessions`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('User Average Sessions:', data);  
            return data;
        })
        .catch(error => {
            console.error('Error fetching user average sessions:', error);
        });
}


function fetchUserPerformance(userId) {
    return fetch(`${API_BASE_URL}/user/${userId}/performance`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('User Performance:', data);  
            return data;
        })
        .catch(error => {
            console.error('Error fetching user performance:', error);
        });
}

const userId = 12;

fetchUser(userId);
fetchUserActivity(userId);
fetchUserAverageSessions(userId); 
fetchUserPerformance(userId);
