const workshops = {
  async createWorkshop(workshopData) {
    const API_BASE = window.location.hostname === 'localhost' && window.location.port === '8080' 
      ? 'http://localhost:5555/api' 
      : 'https://udyamsetu-backend.railway.app/api'; // Replace with your actual backend URL
    const response = await fetch(`${API_BASE}/workshops`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.getToken()}`
      },
      body: JSON.stringify(workshopData)
    });
    return response.json();
  },

  async getWorkshops() {
    const API_BASE = window.location.hostname === 'localhost' && window.location.port === '8080' 
      ? 'http://localhost:5555/api' 
      : 'https://your-backend-url.herokuapp.com/api'; // Replace with your actual backend URL
    const response = await fetch(`${API_BASE}/workshops`, {
      headers: { 'Authorization': `Bearer ${auth.getToken()}` }
    });
    return response.json();
  },

  async addMaterialToWorkshop(workshopId, materialId) {
    const API_BASE = window.location.hostname === 'localhost' && window.location.port === '8080' 
      ? 'http://localhost:5555/api' 
      : 'https://your-backend-url.herokuapp.com/api'; // Replace with your actual backend URL
    const response = await fetch(`${API_BASE}/workshops/${workshopId}/materials`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.getToken()}`
      },
      body: JSON.stringify({ materialId })
    });
    return response.json();
  },

  async joinWorkshop(workshopId) {
    const API_BASE = window.location.hostname === 'localhost' && window.location.port === '8080' 
      ? 'http://localhost:5555/api' 
      : 'https://your-backend-url.herokuapp.com/api'; // Replace with your actual backend URL
    const response = await fetch(`${API_BASE}/workshops/${workshopId}/join`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${auth.getToken()}` }
    });
    return response.json();
  },

  async getJoinedWorkshops() {
    const API_BASE = window.location.hostname === 'localhost' && window.location.port === '8080' 
      ? 'http://localhost:5555/api' 
      : 'https://your-backend-url.herokuapp.com/api'; // Replace with your actual backend URL
    const response = await fetch(`${API_BASE}/workshops/joined`, {
      headers: { 'Authorization': `Bearer ${auth.getToken()}` }
    });
    return response.json();
  },

  renderWorkshops(workshopsData, joinedWorkshops = []) {
    const container = document.getElementById('workshops-container');
    if (!container) return;

    const joinedIds = joinedWorkshops.map(w => w._id);
    const isAdmin = auth.isAdmin();

    container.innerHTML = workshopsData.map(workshop => {
      const isJoined = joinedIds.includes(workshop._id);
      return `
        <div class="workshop-card">
          <div class="workshop-info">
            <span class="workshop-category">Entrepreneurship</span>
            <h3>${workshop.title}</h3>
            <p>${workshop.description}</p>
            <div class="workshop-meta">
              <span><i class="far fa-calendar-alt"></i> ${new Date(workshop.date).toLocaleDateString()}</span>
              <span><i class="far fa-clock"></i> ${new Date(workshop.date).toLocaleTimeString()}</span>
            </div>
            <p><strong>Materials:</strong> ${workshop.materials.length}</p>
            ${workshop.meetingLink && isJoined ? `<p><a href="${workshop.meetingLink}" target="_blank" class="btn btn-outline" style="padding: 8px 16px; font-size: 14px;">Join Meeting</a></p>` : ''}
            

            
            <div style="margin-top: 15px;">
              ${isAdmin ? 
                `<a href="workshop-materials.html?id=${workshop._id}"><button class="btn btn-primary">Manage Materials</button></a>` :
                isJoined ? 
                  `<div style="display: flex; gap: 10px; align-items: center;">
                    <button disabled style="background: #48bb78; color: white; padding: 10px 20px; border-radius: 8px; border: none;">✓ Joined</button>
                    <a href="workshop-view.html?id=${workshop._id}"><button class="btn btn-outline">View Materials</button></a>
                  </div>` :
                  `<button onclick="joinWorkshop('${workshop._id}')" class="btn btn-primary">Join Workshop</button>`
              }
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
};

async function joinWorkshop(workshopId) {
  try {
    const result = await workshops.joinWorkshop(workshopId);
    if (result.message === 'Joined workshop successfully') {
      alert('Joined workshop successfully!');
      location.reload();
    } else {
      alert(result.message);
    }
  } catch (error) {
    alert('Failed to join workshop');
  }
}
