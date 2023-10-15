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
  