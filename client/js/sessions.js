const sessions = {
  async createSession(sessionData) {
    const API_BASE = window.location.hostname === 'localhost' && window.location.port === '8080' 
      ? 'http://localhost:5555/api' 
      : '/api';
    const response = await fetch(`${API_BASE}/sessions`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.getToken()}`
      },
      body: JSON.stringify(sessionData)
    });
    return response.json();
  },

  async getSessions() {
    const API_BASE = window.location.hostname === 'localhost' && window.location.port === '8080' 
      ? 'http://localhost:5555/api' 
      : '/api';
    const response = await fetch(`${API_BASE}/sessions`, {
      headers: { 'Authorization': `Bearer ${auth.getToken()}` }
    });
    return response.json();
  }
};