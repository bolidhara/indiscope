document.addEventListener('DOMContentLoaded', function() {
  const reportFilterForm = document.querySelector('.report-filters');
  const categorySelect = document.querySelector('#category');
  const subcategorySelect = document.querySelector('#subcategory');
  const dateSelect = document.querySelector('#date');
  const searchInput = document.querySelector('.search-bar input');
  const searchButton = document.querySelector('.search-bar button');
  const reportsContainer = document.querySelector('.all-reports');
  const pageNumberDisplay = document.querySelector('.page-number');
  const prevPageButton = document.querySelector('.prev-page');
  const nextPageButton = document.querySelector('.next-page');

  let reportsData = [];
  let filteredReports = [];
  let currentPage = 1;
  const reportsPerPage = 20;

  // रिपोर्ट्स डेटा को लोड करना
  function loadReportsData() {
    fetch('report.json')
      .then(response => response.json())
      .then(data => {
        reportsData = data.reports;
        filteredReports = [...reportsData];
        populateCategories(data.categories);
        displayReports();
      })
      .catch(error => console.error('Error loading the report data:', error));
  }

  // श्रेणियाँ और उपश्रेणियाँ पॉप्युलेट करना
  function populateCategories(categories) {
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });

    const subcategories = {
      "आर्थिक": ["वित्तीय सुधार", "बजट", "मुद्रास्फीति", "विकास दर", "रोजगार", "आर्थिक", "वित्तीय स्थिति"],
      "पर्यावरण": ["जलवायु परिवर्तन", "प्रदूषण", "वन्यजीव संरक्षण"],
      "समाजशास्त्र": ["जातिवाद", "लिंग असमानता", "शिक्षा प्रणाली"],
      "राजनीति": ["चुनाव", "सरकारी नीतियां", "राजनीतिक दल"],
      "स्वास्थ्य": ["स्वास्थ्य नीति", "महामारी", "स्वास्थ्य सेवाएँ"]
    };

    categorySelect.addEventListener('change', function() {
      const selectedCategory = categorySelect.value;
      const subcategoryOptions = subcategories[selectedCategory] || [];
      subcategorySelect.innerHTML = '<option value="">-- उपवर्ग चुनें --</option>';
      subcategoryOptions.forEach(subcategory => {
        const option = document.createElement('option');
        option.value = subcategory;
        option.textContent = subcategory;
        subcategorySelect.appendChild(option);
      });
      filterReports();
    });
  }

  // रिपोर्ट्स को पेज पर प्रदर्शित करना
  function displayReports() {
    reportsContainer.innerHTML = '';
    const start = (currentPage - 1) * reportsPerPage;
    const end = start + reportsPerPage;
    const reportsToDisplay = filteredReports.slice(start, end);

    reportsToDisplay.forEach(report => {
      const reportElement = document.createElement('div');
      reportElement.classList.add('report');
      reportElement.innerHTML = `
        <h3><a href="#">${report.title}</a></h3>
        <p><strong>वर्ग:</strong> ${report.category} <strong>उपवर्ग:</strong> ${report.subcategory} <strong>तिथि:</strong> ${new Date(report.date).toLocaleDateString()}</p>
        <p>${report.summary}</p>
        <p><a href="${report.viewLink}">देखें</a></p>
      `;
      reportsContainer.appendChild(reportElement);
    });

    pageNumberDisplay.textContent = currentPage;

    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage * reportsPerPage >= filteredReports.length;
  }

  // रिपोर्ट्स को श्रेणी, उपश्रेणी और तिथि के आधार पर फिल्टर करना
  function filterReports() {
    const category = categorySelect.value;
    const subcategory = subcategorySelect.value;
    const date = dateSelect.value;

    filteredReports = reportsData.filter(report => {
      const matchesCategory = category ? report.category === category : true;
      const matchesSubcategory = subcategory ? report.subcategory === subcategory : true;
      const matchesDate = date ? new Date(report.date).toLocaleDateString() === new Date(date).toLocaleDateString() : true;
      return matchesCategory && matchesSubcategory && matchesDate;
    });

    displayReports();
  }

  // खोज कार्यक्षमता
  searchButton.addEventListener('click', function() {
    const searchQuery = searchInput.value.trim().toLowerCase();
    if (searchQuery) {
      filteredReports = reportsData.filter(report => report.title.toLowerCase().includes(searchQuery) || report.summary.toLowerCase().includes(searchQuery));
      displayReports();
    } else {
      filteredReports = [...reportsData];
      displayReports();
    }
  });

  // पृष्ठनेशन कार्यक्षमता
  prevPageButton.addEventListener('click', function() {
    if (currentPage > 1) {
      currentPage--;
      displayReports();
    }
  });

  nextPageButton.addEventListener('click', function() {
    if (currentPage * reportsPerPage < filteredReports.length) {
      currentPage++;
      displayReports();
    }
  });

  loadReportsData();

  reportFilterForm.addEventListener('change', filterReports);
});