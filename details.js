document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/hyperlinks') // Update this URL based on your server configuration
      .then(response => response.json())
      .then(data => {
        const tableBody = document.querySelector('#details-table tbody');
        data.forEach(entry => {
          const row = document.createElement('tr');
          const siteCell = document.createElement('td');
          siteCell.textContent = entry.url;
          const linkCell = document.createElement('td');
          linkCell.textContent = entry.hyperlink;
          const countCell = document.createElement('td');
          countCell.textContent = entry.count;
  
          row.appendChild(siteCell);
          row.appendChild(linkCell);
          row.appendChild(countCell);
          tableBody.appendChild(row);
        });
      });
  });
  