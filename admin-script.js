/* ═══════════════════════════════════════════════════════════════
   LeadFlow Admin Panel - JavaScript
   ═══════════════════════════════════════════════════════════════ */

// ─────────────────────────────────────────────────────────────────
// DATA MANAGEMENT
// ─────────────────────────────────────────────────────────────────

let leads = [
  {
    id: 1,
    name: "Ananya Sharma",
    email: "ananya@techcorp.in",
    company: "TechCorp India",
    status: "Qualified",
    value: 50000,
    phone: "9876543210"
  },
  {
    id: 2,
    name: "Rohan Mehta",
    email: "rohan@startuphub.io",
    company: "StartupHub",
    status: "Contacted",
    value: 35000,
    phone: "9123456789"
  },
  {
    id: 3,
    name: "Priya Nair",
    email: "priya@designstudio.co",
    company: "Design Studio",
    status: "New",
    value: 25000,
    phone: "8899001122"
  },
  {
    id: 4,
    name: "Vikram Singh",
    email: "vikram@logisticspro.com",
    company: "LogisticsPro",
    status: "Converted",
    value: 75000,
    phone: "7766554433"
  },
  {
    id: 5,
    name: "Sneha Banerjee",
    email: "sneha@retailmart.in",
    company: "RetailMart",
    status: "Converted",
    value: 60000,
    phone: "9988776655"
  }
];

let teamMembers = [
  { id: 1, name: "John Smith", email: "john@leadflow.com", role: "Sales Manager", phone: "+1 555-1234", leadsCount: 28, conversionRate: "12%" },
  { id: 2, name: "Sarah Johnson", email: "sarah@leadflow.com", role: "Sales Rep", phone: "+1 555-5678", leadsCount: 24, conversionRate: "10%" },
  { id: 3, name: "Mike Davis", email: "mike@leadflow.com", role: "Sales Rep", phone: "+1 555-9012", leadsCount: 22, conversionRate: "9%" }
];

let activities = [
  { id: 1, text: "Ananya Sharma moved to Qualified", time: "2 hours ago", type: "lead" },
  { id: 2, text: "New lead added: Vikram Singh", time: "4 hours ago", type: "lead" },
  { id: 3, text: "John Smith closed deal with LogisticsPro", time: "1 day ago", type: "conversion" },
  { id: 4, text: "Sarah Johnson contacted Design Studio", time: "2 days ago", type: "contact" }
];

let editingLeadId = null;

// ─────────────────────────────────────────────────────────────────
// INITIALIZATION
// ─────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initializeDashboard();
  renderAllContent();
});

function initializeDashboard() {
  updateStats();
  renderPipeline();
  renderActivity();
  renderLeadsTable();
  renderTeamGrid();
}

// ─────────────────────────────────────────────────────────────────
// TAB SWITCHING
// ─────────────────────────────────────────────────────────────────

function switchTab(event, tabName) {
  event.preventDefault();

  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });

  // Remove active class from all nav items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });

  // Show selected tab
  document.getElementById(tabName).classList.add('active');
  event.target.closest('.nav-item').classList.add('active');

  // Update page title
  const titles = {
    dashboard: 'Dashboard',
    leads: 'Leads Management',
    analytics: 'Analytics',
    team: 'Team',
    settings: 'Settings'
  };
  document.getElementById('page-title').textContent = titles[tabName];

  // Close mobile menu if open
  if (window.innerWidth <= 768) {
    closeSidebar();
  }
}

// ─────────────────────────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────────────────────────

function toggleSidebar() {
  const nav = document.querySelector('.sidebar-nav');
  nav.classList.toggle('show');
}

function closeSidebar() {
  const nav = document.querySelector('.sidebar-nav');
  nav.classList.remove('show');
}

// ─────────────────────────────────────────────────────────────────
// USER MENU
// ─────────────────────────────────────────────────────────────────

function toggleUserMenu() {
  const dropdown = document.querySelector('.user-dropdown');
  dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.user-menu')) {
    document.querySelector('.user-dropdown').style.display = 'none';
  }
});

// ─────────────────────────────────────────────────────────────────
// DASHBOARD STATS
// ─────────────────────────────────────────────────────────────────

function updateStats() {
  const totalLeads = leads.length;
  const qualifiedLeads = leads.filter(l => l.status === 'Qualified' || l.status === 'Converted').length;
  const convertedLeads = leads.filter(l => l.status === 'Converted').length;
  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;
  const revenue = leads.reduce((sum, l) => sum + l.value, 0);

  document.getElementById('stat-total-leads').textContent = totalLeads;
  document.getElementById('stat-qualified-leads').textContent = qualifiedLeads;
  document.getElementById('stat-conversion').textContent = conversionRate + '%';
  document.getElementById('stat-revenue').textContent = '$' + revenue.toLocaleString();
}

// ─────────────────────────────────────────────────────────────────
// PIPELINE CHART
// ─────────────────────────────────────────────────────────────────

function renderPipeline() {
  const statusCounts = {
    'New': leads.filter(l => l.status === 'New').length,
    'Contacted': leads.filter(l => l.status === 'Contacted').length,
    'Qualified': leads.filter(l => l.status === 'Qualified').length,
    'Converted': leads.filter(l => l.status === 'Converted').length
  };

  const total = leads.length;
  let html = '';

  for (const [status, count] of Object.entries(statusCounts)) {
    const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
    html += `
      <div class="pipeline-item">
        <div class="pipeline-label">${status}</div>
        <div class="pipeline-bar">
          <div class="pipeline-fill" style="width: ${percentage}%">${count}</div>
        </div>
      </div>
    `;
  }

  document.getElementById('pipeline-chart').innerHTML = html;
}

// ─────────────────────────────────────────────────────────────────
// ACTIVITY LIST
// ─────────────────────────────────────────────────────────────────

function renderActivity() {
  let html = '';
  activities.forEach(activity => {
    html += `
      <div class="activity-item">
        <div class="activity-time">${activity.time}</div>
        <div class="activity-text">${activity.text}</div>
      </div>
    `;
  });
  document.getElementById('activity-list').innerHTML = html;
}

// ─────────────────────────────────────────────────────────────────
// LEADS TABLE
// ─────────────────────────────────────────────────────────────────

function renderLeadsTable(filteredLeads = null) {
  const leadsToShow = filteredLeads || leads;
  let html = '';

  leadsToShow.forEach(lead => {
    const statusClass = 'status-' + lead.status.toLowerCase();
    html += `
      <tr>
        <td><strong>${lead.name}</strong></td>
        <td>${lead.email}</td>
        <td>${lead.company}</td>
        <td><span class="status-badge ${statusClass}">${lead.status}</span></td>
        <td>$${lead.value.toLocaleString()}</td>
        <td>
          <div class="action-buttons">
            <button class="btn-small btn-edit" onclick="editLead(${lead.id})">Edit</button>
            <button class="btn-small btn-delete" onclick="deleteLead(${lead.id})">Delete</button>
          </div>
        </td>
      </tr>
    `;
  });

  document.getElementById('leads-table-body').innerHTML = html || '<tr><td colspan="6" style="text-align:center; padding: 20px;">No leads found</td></tr>';
}

function filterLeads(searchTerm) {
  const filtered = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchTerm.toLowerCase())
  );
  renderLeadsTable(filtered);
}

// ─────────────────────────────────────────────────────────────────
// LEAD MODALS
// ─────────────────────────────────────────────────────────────────

function openAddLeadModal() {
  editingLeadId = null;
  document.querySelector('#leadModal .modal-header h3').textContent = 'Add New Lead';
  document.querySelector('#leadModal form').reset();
  openModal(null, 'leadModal');
}

function editLead(leadId) {
  const lead = leads.find(l => l.id === leadId);
  if (!lead) return;

  editingLeadId = leadId;
  document.querySelector('#leadModal .modal-header h3').textContent = 'Edit Lead';

  const form = document.querySelector('#leadModal form');
  form.name.value = lead.name;
  form.email.value = lead.email;
  form.company.value = lead.company;
  form.phone.value = lead.phone;
  form.status.value = lead.status;
  form.value.value = lead.value;

  openModal(null, 'leadModal');
}

function deleteLead(leadId) {
  if (confirm('Are you sure you want to delete this lead?')) {
    leads = leads.filter(l => l.id !== leadId);
    renderLeadsTable();
    updateStats();
    renderPipeline();
    showToast('Lead deleted successfully', 'success');
  }
}

function submitLead(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const newLead = {
    id: editingLeadId || Math.max(...leads.map(l => l.id), 0) + 1,
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    phone: formData.get('phone'),
    status: formData.get('status'),
    value: parseInt(formData.get('value')) || 0
  };

  if (editingLeadId) {
    const index = leads.findIndex(l => l.id === editingLeadId);
    leads[index] = newLead;
    showToast('Lead updated successfully', 'success');
  } else {
    leads.push(newLead);
    showToast('Lead added successfully', 'success');
  }

  closeModal(null, 'leadModal');
  renderLeadsTable();
  updateStats();
  renderPipeline();
  renderActivity();
}

// ─────────────────────────────────────────────────────────────────
// TEAM MANAGEMENT
// ─────────────────────────────────────────────────────────────────

function renderTeamGrid() {
  let html = '';

  teamMembers.forEach(member => {
    const initials = member.name.split(' ').map(n => n[0]).join('');
    html += `
      <div class="team-card">
        <div class="team-avatar">${initials}</div>
        <div class="team-name">${member.name}</div>
        <div class="team-role">${member.role}</div>
        <div class="team-email" style="color: #6b7280; font-size: 0.9rem; margin-bottom: 12px;">${member.email}</div>
        <div class="team-stats-mini">
          <div class="stat-mini">
            <div class="stat-mini-value">${member.leadsCount}</div>
            <div class="stat-mini-label">Leads</div>
          </div>
          <div class="stat-mini">
            <div class="stat-mini-value">${member.conversionRate}</div>
            <div class="stat-mini-label">Conv. Rate</div>
          </div>
        </div>
        <button class="btn btn-small" style="width: 100%; justify-content: center;" onclick="editTeamMember(${member.id})">Edit</button>
      </div>
    `;
  });

  document.getElementById('team-grid').innerHTML = html;
}

function openAddTeamModal() {
  document.querySelector('#teamModal .modal-header h3').textContent = 'Add Team Member';
  document.querySelector('#teamModal form').reset();
  openModal(null, 'teamModal');
}

function editTeamMember(memberId) {
  const member = teamMembers.find(m => m.id === memberId);
  if (!member) return;

  document.querySelector('#teamModal .modal-header h3').textContent = 'Edit Team Member';
  const form = document.querySelector('#teamModal form');
  form.name.value = member.name;
  form.email.value = member.email;
  form.role.value = member.role;
  form.phone.value = member.phone;

  openModal(null, 'teamModal');
}

function submitTeamMember(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const newMember = {
    id: Math.max(...teamMembers.map(m => m.id), 0) + 1,
    name: formData.get('name'),
    email: formData.get('email'),
    role: formData.get('role'),
    phone: formData.get('phone'),
    leadsCount: 0,
    conversionRate: '0%'
  };

  teamMembers.push(newMember);
  showToast('Team member added successfully', 'success');
  closeModal(null, 'teamModal');
  renderTeamGrid();
}

// ─────────────────────────────────────────────────────────────────
// SETTINGS
// ─────────────────────────────────────────────────────────────────

function saveSettings() {
  showToast('Settings saved successfully', 'success');
}

function showDeleteConfirm() {
  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    showToast('Account deletion initiated', 'error');
  }
}

// ─────────────────────────────────────────────────────────────────
// NOTIFICATIONS
// ─────────────────────────────────────────────────────────────────

function showNotifications() {
  alert('You have 3 new notifications:\n\n1. John Smith closed a deal worth $75,000\n2. New leads from LinkedIn: 5\n3. Sarah Johnson needs approval for discount');
}

// ─────────────────────────────────────────────────────────────────
// MODALS
// ─────────────────────────────────────────────────────────────────

function openModal(event, modalId) {
  document.getElementById(modalId).style.display = 'flex';
}

function closeModal(event, modalId) {
  if (event && event.target.id !== modalId) return;
  document.getElementById(modalId).style.display = 'none';
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
  }
});

// ─────────────────────────────────────────────────────────────────
// TOAST NOTIFICATIONS
// ─────────────────────────────────────────────────────────────────

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast show ${type}`;

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ─────────────────────────────────────────────────────────────────
// UTILITY FUNCTIONS
// ─────────────────────────────────────────────────────────────────

function renderAllContent() {
  renderLeadsTable();
  renderTeamGrid();
}

// Responsive adjustments
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    document.querySelector('.sidebar-nav').classList.remove('show');
  }
});
