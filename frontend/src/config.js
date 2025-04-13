// API URL configuration
const API_URL = 'https://task-manager-okij.onrender.com';
// const API_URL = 'http://localhost:5000'

const config = {
  API_URL,
  endpoints: {
    login: `${API_URL}/api/users/login`,
    register: `${API_URL}/api/users/register`,
    tasks: `${API_URL}/api/tasks`,
    userProfile: `${API_URL}/api/users/profile`
  }
};

export default config;
