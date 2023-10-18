// auth.js
export function setAuthToken(token) {
    localStorage.setItem('authToken', token);
  }
  
  export function getAuthToken() {
    return localStorage.getItem('authToken');
  }
  
  export function removeAuthToken() {
    localStorage.removeItem('authToken');
  }
  
  // auth.js

export const clearAuthToken = () => {
  // Clear the authentication token from local storage
  localStorage.removeItem('authToken'); // Replace 'authToken' with your actual token key
};
