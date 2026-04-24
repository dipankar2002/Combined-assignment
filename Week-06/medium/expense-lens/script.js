const expenseForm = document.getElementById("expense-form");
const descriptionInput = document.getElementById("description-input");
const amountInput = document.getElementById("amount-input");
const categoryInput = document.getElementById("category-input");
const filterSelect = document.getElementById("filter-select");
const transactionBody = document.getElementById("transaction-body");
const emptyRow = document.getElementById("empty-row");
const balanceValue = document.getElementById("balance-value");
const countValue = document.getElementById("count-value");
const filterPill = document.getElementById("filter-pill");
const statusText = document.getElementById("status-text");
const chartCanvas = document.getElementById("expense-chart");
const chartFallback = document.getElementById("chart-fallback");

const STORAGE_KEY = "expense-lens-transactions";

let transactions = [];
let chartInstance = null;

function createTransactionId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

function saveTransactions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function loadTransactions() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return;
  }

  try {
    const parsed = JSON.parse(raw);

    if (Array.isArray(parsed)) {
      transactions = parsed.filter(
        (item) =>
          item &&
          typeof item.id === "string" &&
          typeof item.description === "string" &&
          typeof item.category === "string" &&
          typeof item.amount === "number"
      );
    }
  } catch (_error) {
    transactions = [];
  }
}

function getFilteredTransactions() {
  const selectedCategory = filterSelect.value;

  if (selectedCategory === "All") {
    return transactions;
  }

  return transactions.filter((item) => item.category === selectedCategory);
}

function updateSummary() {
  const total = transactions.reduce((sum, item) => sum + item.amount, 0);
  balanceValue.textContent = formatCurrency(total);
  countValue.textContent = String(transactions.length);
}

function buildChartData() {
  const categoryTotals = transactions.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});

  return {
    labels: Object.keys(categoryTotals),
    values: Object.values(categoryTotals),
  };
}

function renderChart() {
  if (typeof Chart === "undefined") {
    chartCanvas.classList.add("hidden");
    chartFallback.classList.remove("hidden");
    return;
  }

  const { labels, values } = buildChartData();

  if (chartInstance) {
    chartInstance.destroy();
  }

  if (labels.length === 0) {
    chartCanvas.classList.add("hidden");
    chartFallback.classList.remove("hidden");
    chartFallback.textContent = "Add transactions to view the category distribution chart.";
    return;
  }

  chartCanvas.classList.remove("hidden");
  chartFallback.classList.add("hidden");

  chartInstance = new Chart(chartCanvas, {
    type: "pie",
    data: {
      labels,
      datasets: [
        {
          data: values,
          borderWidth: 1,
          borderColor: "rgba(235, 246, 255, 0.6)",
          backgroundColor: [
            "#7df3cd",
            "#8bc7ff",
            "#4ec8e0",
            "#f8c782",
            "#f79ec8",
            "#93f4a9",
            "#c9b3ff",
            "#62dfbc",
            "#ffc18f",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#e8f3ff",
          },
        },
      },
    },
  });
}

function renderTransactions() {
  const visibleTransactions = getFilteredTransactions();
  const hasData = visibleTransactions.length > 0;

  transactionBody.innerHTML = "";

  if (!hasData) {
    transactionBody.appendChild(emptyRow);
    emptyRow.classList.remove("hidden");
  } else {
    emptyRow.classList.add("hidden");

    visibleTransactions.forEach((item) => {
      const row = document.createElement("tr");

      const descriptionCell = document.createElement("td");
      descriptionCell.textContent = item.description;

      const categoryCell = document.createElement("td");
      categoryCell.textContent = item.category;

      const amountCell = document.createElement("td");
      amountCell.className = "amount-cell";
      amountCell.textContent = formatCurrency(item.amount);

      const actionCell = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "delete-btn";
      deleteButton.dataset.id = item.id;
      deleteButton.textContent = "Delete";
      actionCell.appendChild(deleteButton);

      row.appendChild(descriptionCell);
      row.appendChild(categoryCell);
      row.appendChild(amountCell);
      row.appendChild(actionCell);

      transactionBody.appendChild(row);
    });
  }

  const filterName = filterSelect.value;
  filterPill.textContent = `Showing: ${filterName}`;

  if (transactions.length === 0) {
    statusText.textContent = "No transactions yet.";
  } else if (hasData) {
    statusText.textContent = `Showing ${visibleTransactions.length} transaction(s).`;
  } else {
    statusText.textContent = `No transactions found for ${filterName}.`;
  }
}

function addTransaction(event) {
  event.preventDefault();

  const description = descriptionInput.value.trim();
  const amount = Number(amountInput.value);
  const category = categoryInput.value;

  if (!description || Number.isNaN(amount) || amount <= 0) {
    statusText.textContent = "Enter a valid description and amount.";
    return;
  }

  const transaction = {
    id: createTransactionId(),
    description,
    amount,
    category,
  };

  transactions.unshift(transaction);
  saveTransactions();
  updateSummary();
  renderTransactions();
  renderChart();

  expenseForm.reset();
  categoryInput.value = "Food";
  descriptionInput.focus();
}

function deleteTransaction(id) {
  transactions = transactions.filter((item) => item.id !== id);
  saveTransactions();
  updateSummary();
  renderTransactions();
  renderChart();
}

expenseForm.addEventListener("submit", addTransaction);
filterSelect.addEventListener("change", renderTransactions);

transactionBody.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLButtonElement)) {
    return;
  }

  if (target.classList.contains("delete-btn")) {
    deleteTransaction(target.dataset.id);
  }
});

loadTransactions();
updateSummary();
renderTransactions();
renderChart();
