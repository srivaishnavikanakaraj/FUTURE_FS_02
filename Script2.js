function addLead() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const source = document.getElementById("source").value.trim();

  if (!name || !email || !source) {
    alert("All fields are required");
    return;
  }

  const leads = JSON.parse(localStorage.getItem("leads")) || [];
  leads.push({ name, email, source });

  localStorage.setItem("leads", JSON.stringify(leads));
  alert("Lead added successfully!");

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("source").value = "";
}

function loadLeads() {
  const leads = JSON.parse(localStorage.getItem("leads")) || [];
  const table = document.getElementById("leadTable");
  if (!table) return;

  table.innerHTML = "";

  leads.forEach((lead, index) => {
    table.innerHTML += `
      <tr>
        <td>${lead.name}</td>
        <td>${lead.email}</td>
        <td>${lead.source}</td>
        <td>
          <button class="delete-btn" onclick="confirmDelete(${index})">🗑</button>
        </td>
      </tr>
    `;
  });
}

function confirmDelete(index) {
  if (confirm("Are you sure you want to delete this lead?")) {
    const leads = JSON.parse(localStorage.getItem("leads"));
    leads.splice(index, 1);
    localStorage.setItem("leads", JSON.stringify(leads));
    loadLeads();
  }
}

function exportToExcel() {
  const leads = JSON.parse(localStorage.getItem("leads")) || [];
  if (!leads.length) return alert("No data to export");

  let csv = "Name,Email,Source\n";
  leads.forEach((l) => {
    csv += `${l.name},${l.email},${l.source}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "leads.csv";
  link.click();
}

loadLeads();
