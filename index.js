document.addEventListener('DOMContentLoaded', function() {
  const categorySelect = document.querySelector('#category');
  const subcategorySelect = document.querySelector('#subcategory');
  const dateSelect = document.querySelector('#date');
  const searchInput = document.querySelector('#search-input');
  const searchButton = document.querySelector('#search-button');
  const reportsContainer = document.querySelector('.all-reports');
  const pageNumberDisplay = document.querySelector('.page-number');
  const prevPageButton = document.querySelector('.prev-page');
  const nextPageButton = document.querySelector('.next-page');

  let reportsData = [];
  let filteredReports = [];
  let currentPage = 1;
  const reportsPerPage = 10;

  function loadReportsData() {
    fetch('index.json')
      .then(response => response.json())
      .then(data => {
        reportsData = data.reports;
        filteredReports = [...reportsData];
        populateCategories();
        displayReports();
      })
      .catch(error => console.error('Error loading the report data:', error));
  }

  function populateCategories() {
    const categories = [...new Set(reportsData.map(report => report.category))];
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });
  }

  function populateSubcategories() {
    const selectedCategory = categorySelect.value;
    const subcategories = [...new Set(reportsData.filter(report => report.category === selectedCategory).map(report => report.subcategory))];
    subcategorySelect.innerHTML = '<option value="">-- उपवर्ग चुनें --</option>';
    subcategories.forEach(subcategory => {
      const option = document.createElement('option');
      option.value = subcategory;
      option.textContent = subcategory;
      subcategorySelect.appendChild(option);
    });
  }

  function displayReports() {
    reportsContainer.innerHTML = '';
    const start = (currentPage - 1) * reportsPerPage;
    const end = start + reportsPerPage;
    const reportsToDisplay = filteredReports.slice(start, end);

    reportsToDisplay.forEach(report => {
      const reportElement = document.createElement('div');
      reportElement.classList.add('report');
      reportElement.innerHTML = `
                <h3><a href="${report.viewLink}" target="_blank">${report.title}</a></h3>
                <p><strong>वर्ग:</strong> ${report.category} <strong>उपवर्ग:</strong> ${report.subcategory} <strong>तिथि:</strong> ${new Date(report.date).toLocaleDateString()}</p>
                <p>${report.summary}</p>
                <p><a href="${report.viewLink}" target="_blank">देखें</a></p>
            `;
      reportsContainer.appendChild(reportElement);
    });

    pageNumberDisplay.textContent = currentPage;
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage * reportsPerPage >= filteredReports.length;
  }

  function filterReports() {
    const category = categorySelect.value;
    const subcategory = subcategorySelect.value;
    const date = dateSelect.value;

    filteredReports = reportsData.filter(report => {
      return (!category || report.category === category) &&
        (!subcategory || report.subcategory === subcategory) &&
        (!date || new Date(report.date).toISOString().split('T')[0] === date);
    });

    currentPage = 1;
    displayReports();
  }

  categorySelect.addEventListener('change', () => {
    populateSubcategories();
    filterReports();
  });

  subcategorySelect.addEventListener('change', filterReports);
  dateSelect.addEventListener('change', filterReports);

  searchButton.addEventListener('click', () => {
    const searchQuery = searchInput.value.trim().toLowerCase();
    filteredReports = reportsData.filter(report =>
      report.title.toLowerCase().includes(searchQuery) ||
      report.summary.toLowerCase().includes(searchQuery)
    );

    currentPage = 1;
    displayReports();
  });

  prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      displayReports();
    }
  });

  nextPageButton.addEventListener('click', () => {
    if (currentPage * reportsPerPage < filteredReports.length) {
      currentPage++;
      displayReports();
    }
  });

  loadReportsData();
})

















document.addEventListener("DOMContentLoaded", function() {
  const languageToggle = document.getElementById("language-toggle");
  const languageMenu = document.getElementById("language-menu");

  languageToggle.addEventListener("click", function(event) {
    event.preventDefault();
    languageMenu.style.display = languageMenu.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", function(event) {
    if (!languageToggle.contains(event.target) && !languageMenu.contains(event.target)) {
      languageMenu.style.display = "none";
    }
  });

  const languageLinks = document.querySelectorAll("#language-menu a");
  languageLinks.forEach(link => {
    link.addEventListener("click", function() {
      const selectedLanguage = this.getAttribute("data-lang");
      alert("चयनित भाषा: " + (selectedLanguage === "hi" ? "हिन्दी" : "English"));
    });
  });
});
















