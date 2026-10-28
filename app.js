
// JobTrack Version 1
// Object-oriented programming + LocalStorage CRUD.

// This class manages the application's data.
class JobTracker {
  constructor() {
    this.storageKey = "jobtrack_applications";
    this.jobs = this.loadJobs();
    this.chart = null;
  }

  // READ: load saved applications when the app opens.
  loadJobs() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Unable to load applications:", error);
      return [];
    }
  }

  // Save the complete array to LocalStorage.
  saveJobs() {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.jobs)
    );
  }

  // CREATE: add a new application.
  createJob(data) {
    const job = {
      id: (crypto.randomUUID
        ? crypto.randomUUID()
        : String(Date.now())),
      companyName: data.companyName.trim(),
      jobRole: data.jobRole.trim(),
      dateApplied: data.dateApplied,
      status: data.status,
      jobLink: data.jobLink.trim(),
      notes: data.notes.trim()
    };

    this.jobs.unshift(job);
    this.saveJobs();
    return job;
  }

  // READ: return applications matching the search and filter.
  getJobs(searchText = "", status = "All") {
    const search = searchText.toLowerCase().trim();

    return this.jobs.filter(job => {
      const text = `${job.companyName} ${job.jobRole}`
        .toLowerCase();

      const matchesSearch = text.includes(search);
      const matchesStatus =
        status === "All" || job.status === status;

      return matchesSearch && matchesStatus;
    });
  }

  // UPDATE: find an application by ID and update its details.
  updateJob(id, data) {
    const index = this.jobs.findIndex(job => job.id === id);

    if (index === -1) {
      return false;
    }

    this.jobs[index] = {
      ...this.jobs[index],
      companyName: data.companyName.trim(),
      jobRole: data.jobRole.trim(),
      dateApplied: data.dateApplied,
      status: data.status,
      jobLink: data.jobLink.trim(),
      notes: data.notes.trim()
    };

    this.saveJobs();
    return true;
  }

  // DELETE: remove an application by ID.
  deleteJob(id) {
    const oldLength = this.jobs.length;

    this.jobs = this.jobs.filter(job => job.id !== id);
    this.saveJobs();

    return this.jobs.length < oldLength;
  }

  // Calculate the statistics displayed on the dashboard.
  getCounts() {
    const count = status =>
      this.jobs.filter(job => job.status === status).length;

    return {
      total: this.jobs.length,
      applied: count("Applied"),
      interview: count("Interview"),
      offer: count("Offer"),
      rejected: count("Rejected"),
      active: count("Applied") + count("Interview")
    };
  }
}

// Create one instance of the class for the application.
const tracker = new JobTracker();

const form = document.getElementById("jobForm");
const modalElement = document.getElementById("jobModal");
const jobModal = bootstrap.Modal.getOrCreateInstance(modalElement);
const toast = bootstrap.Toast.getOrCreateInstance(
  document.getElementById("appToast"),
  { delay: 2500 }
);

// Display a short notification.
function showMessage(message) {
  document.getElementById("toastMessage").textContent = message;
  toast.show();
}

// Escape user-entered text before inserting it into table HTML.
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

// Only allow normal web links.
function safeJobLink(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol)
      ? url.href
      : "";
  } catch {
    return "";
  }
}

// Update the four cards and the additional summary values.
function renderDashboard() {
  const counts = tracker.getCounts();

  document.getElementById("totalApplied").textContent =
    counts.total;
  document.getElementById("interviewCount").textContent =
    counts.interview;
  document.getElementById("rejectedCount").textContent =
    counts.rejected;
  document.getElementById("offerCount").textContent =
    counts.offer;
  document.getElementById("activeCount").textContent =
    counts.active;

  document.getElementById("interviewRate").textContent =
    counts.total
      ? `${Math.round(counts.interview / counts.total * 100)}%`
      : "0%";

  document.getElementById("offerRate").textContent =
    counts.total
      ? `${Math.round(counts.offer / counts.total * 100)}%`
      : "0%";

  renderChart(counts);
}

// Draw the status breakdown using Chart.js.
function renderChart(counts) {
  const canvas = document.getElementById("statusChart");

  // Destroy the old chart before creating a replacement.
  if (tracker.chart) {
    tracker.chart.destroy();
  }

  tracker.chart = new Chart(canvas, {
    type: "doughnut",
    data: {
      labels: ["Applied", "Interview", "Offer", "Rejected"],
      datasets: [{
        data: [
          counts.applied,
          counts.interview,
          counts.offer,
          counts.rejected
        ],
        backgroundColor: [
          "#5a72ef",
          "#9b7be7",
          "#39b889",
          "#ef858b"
        ],
        borderWidth: 0,
        hoverOffset: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "70%",
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });
}

// Display the current filtered applications.
function renderJobs() {
  const search = document.getElementById("searchInput").value;
  const status = document.getElementById("statusFilter").value;
  const jobs = tracker.getJobs(search, status);
  const tableBody = document.getElementById("jobsTableBody");

  tableBody.innerHTML = "";

  document.getElementById("recordCount").textContent =
    `${jobs.length} record${jobs.length === 1 ? "" : "s"}`;

  document.getElementById("emptyState").hidden =
    jobs.length > 0;

  jobs.forEach(job => {
    const row = document.createElement("tr");
    const link = safeJobLink(job.jobLink);

    row.innerHTML = `
      <td>
        <div class="company-name">
          ${escapeHTML(job.companyName)}
        </div>
        <div class="job-role">${escapeHTML(job.jobRole)}</div>
      </td>
      <td>${escapeHTML(job.dateApplied)}</td>
      <td>
        <span class="status-badge status-${job.status.toLowerCase()}">
          ${escapeHTML(job.status)}
        </span>
      </td>
      <td>
        ${link
          ? `<a class="job-url" href="${escapeHTML(link)}"
               target="_blank" rel="noopener noreferrer">View posting ↗</a>`
          : "—"}
      </td>
      <td class="text-end">
        <button class="action-btn"
          data-action="edit" data-id="${escapeHTML(job.id)}">
          Edit
        </button>
        <button class="action-btn delete-btn"
          data-action="delete" data-id="${escapeHTML(job.id)}">
          Delete
        </button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// Refresh all UI elements after a data change.
function refreshUI() {
  renderDashboard();
  renderJobs();
}

// Clear the form before opening the Add Application modal.
function resetForm() {
  form.reset();

  document.getElementById("jobId").value = "";
  document.getElementById("jobModalTitle").textContent =
    "Add application";
  document.getElementById("dateApplied").value =
    new Date().toLocaleDateString("en-CA");
}

document.getElementById("addJobButton")
  .addEventListener("click", resetForm);

modalElement.addEventListener("hidden.bs.modal", resetForm);

// Handle both CREATE and UPDATE using the same form.
form.addEventListener("submit", event => {
  event.preventDefault();

  if (!form.reportValidity()) {
    return;
  }

  const data = {
    companyName: document.getElementById("companyName").value,
    jobRole: document.getElementById("jobRole").value,
    dateApplied: document.getElementById("dateApplied").value,
    status: document.getElementById("jobStatus").value,
    jobLink: document.getElementById("jobLink").value,
    notes: document.getElementById("jobNotes").value
  };

  const id = document.getElementById("jobId").value;

  try {
    if (id) {
      tracker.updateJob(id, data);
      showMessage("Application updated successfully.");
    } else {
      tracker.createJob(data);
      showMessage("Application saved successfully.");
    }

    refreshUI();
    jobModal.hide();
  } catch (error) {
    console.error(error);
    showMessage("Unable to save. Check browser storage.");
  }
});

// Handle Edit and Delete button clicks in the table.
document.getElementById("jobsTableBody")
  .addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");

    if (!button) {
      return;
    }

    const id = button.dataset.id;
    const job = tracker.jobs.find(item => item.id === id);

    if (!job) {
      return;
    }

    if (button.dataset.action === "edit") {
      document.getElementById("jobId").value = job.id;
      document.getElementById("companyName").value =
        job.companyName;
      document.getElementById("jobRole").value = job.jobRole;
      document.getElementById("dateApplied").value =
        job.dateApplied;
      document.getElementById("jobStatus").value = job.status;
      document.getElementById("jobLink").value = job.jobLink;
      document.getElementById("jobNotes").value = job.notes;

      document.getElementById("jobModalTitle").textContent =
        "Edit application";

      jobModal.show();
    }

    if (button.dataset.action === "delete") {
      const confirmed = confirm(
        `Delete the application for ${job.companyName}?`
      );

      if (confirmed) {
        tracker.deleteJob(id);
        refreshUI();
        showMessage("Application deleted.");
      }
    }
  });

// Search and status filter update the table immediately.
document.getElementById("searchInput")
  .addEventListener("input", renderJobs);

document.getElementById("statusFilter")
  .addEventListener("change", renderJobs);

// Initial dashboard display.
refreshUI();
