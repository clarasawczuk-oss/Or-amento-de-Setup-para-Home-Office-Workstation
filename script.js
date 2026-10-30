// Dados do orçamento (versão expandida do modelo original)
const budgetData = [
  { categoria: 'Computador Workstation', preco: 4500.00, quantidade: 1 },
  { categoria: 'Monitor 27" 4K', preco: 1800.00, quantidade: 2 },
  { categoria: 'Cadeira Ergonômica', preco: 1200.00, quantidade: 1 },
  { categoria: 'Mesa Elétrica com Regulagem', preco: 1500.00, quantidade: 1 },
  { categoria: 'Teclado Mecânico', preco: 350.00, quantidade: 1 },
  { categoria: 'Mouse Ergonômico', preco: 250.00, quantidade: 1 },
  { categoria: 'Webcam Full HD', preco: 300.00, quantidade: 1 },
  { categoria: 'Luminária de Monitor', preco: 180.00, quantidade: 1 },
  { categoria: 'Organizador de Cabos', preco: 45.00, quantidade: 2 }
];

function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function renderTableAndChart() {
  const tbody = document.querySelector('#budget-table tbody');
  const grandTotalEl = document.getElementById('grand-total');

  let totalGeral = 0;
  const labels = [];
  const totalsPerCategory = [];

  tbody.innerHTML = '';

  budgetData.forEach(item => {
    const valorFinal = item.preco * item.quantidade;
    totalGeral += valorFinal;

    labels.push(item.categoria);
    totalsPerCategory.push(valorFinal);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.categoria}</td>
      <td>${formatCurrency(item.preco)}</td>
      <td>${item.quantidade}</td>
      <td>${formatCurrency(valorFinal)}</td>
    `;
    tbody.appendChild(tr);
  });

  grandTotalEl.textContent = formatCurrency(totalGeral);

  // Renderização do gráfico usando Chart.js
  const ctx = document.getElementById('expensesChart').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        label: 'Valor Total (R$)',
        data: totalsPerCategory,
        backgroundColor: [
          '#6c63ff',
          '#4caf50',
          '#ff9800',
          '#e91e63',
          '#00bcd4',
          '#9c27b0',
          '#3f51b5',
          '#ffc107',
          '#795548'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const value = context.raw || 0;
              return `${context.label}: ${formatCurrency(value)}`;
            }
          }
        }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', renderTableAndChart);
