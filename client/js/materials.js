const materials = {
  async getMaterials() {
    const API_BASE = window.location.hostname === 'localhost' && window.location.port === '8080' 
      ? 'http://localhost:5555/api' 
      : '/api';
    const response = await fetch(`${API_BASE}/materials`, {
      headers: { 'Authorization': `Bearer ${auth.getToken()}` }
    });
    return response.json();
  },

  async createMaterial(formData) {
    const API_BASE = window.location.hostname === 'localhost' && window.location.port === '8080' 
      ? 'http://localhost:5555/api' 
      : '/api';
    const response = await fetch(`${API_BASE}/materials`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${auth.getToken()}` },
      body: formData
    });
    return response.json();
  },

  async deleteMaterial(id) {
    const API_BASE = window.location.hostname === 'localhost' && window.location.port === '8080' 
      ? 'http://localhost:5555/api' 
      : '/api';
    const response = await fetch(`${API_BASE}/materials/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${auth.getToken()}` }
    });
    return response.json();
  },

  renderMaterials(materialsData) {
    const container = document.getElementById('materials-container');
    if (!container) return;

    container.innerHTML = materialsData.map(material => `
      <div class="material-card">
        <div class="material-type type-${material.type}">${material.type}</div>
        <h3>${material.title}</h3>
        <p>${material.description}</p>
        ${material.workshop && material.workshop.title ? `<p><strong>Workshop:</strong> ${material.workshop.title}</p>` : ''}
        ${material.link ? `<a href="${material.link}" target="_blank">Open Link</a>` : ''}
        ${material.filePath ? `<a href="/${material.filePath}" target="_blank">Download</a>` : ''}
        ${auth.isAdmin() ? `<button onclick="materials.deleteMaterial('${material._id}')" class="btn-danger">Delete</button>` : ''}
      </div>
    `).join('');
  }
};
