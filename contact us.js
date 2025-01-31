document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Get form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Form validation (optional)
  if (name === '' || email === '' || message === '') {
    showFeedback('कृपया सभी फ़ील्ड भरें', 'error');
    return;
  }

  // Sending data (simulated here for demo purposes)
  showFeedback('आपका संदेश सफलतापूर्वक भेज दिया गया है। हम जल्द ही उत्तर देंगे!', 'success');

  // Clear the form
  document.getElementById('contact-form').reset();
});

function showFeedback(message, type) {
  const feedbackElement = document.getElementById('feedback');
  feedbackElement.textContent = message;
  feedbackElement.className = `feedback ${type}`;
}