// Form submission handler
subscribeForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  const email = emailInput.value.trim();

  if (isValidEmail(email)) {
    // Construct the WhatsApp URL with the email
    const whatsappMessage = encodeURIComponent(`नमस्ते! एक नया उपयोगकर्ता इस ईमेल के साथ सदस्य बनना चाहता है: ${email}`);
    const whatsappURL = `https://wa.me/919555754494?text=${whatsappMessage}`;

    // Redirect the user to WhatsApp with the message pre-filled
    window.open(whatsappURL, '_blank');

    // Provide feedback to the user
    feedbackMessage.textContent = "आपका ईमेल भेज दिया गया है। धन्यवाद!";
    feedbackMessage.style.backgroundColor = '#28a745'; // Green
  } else {
    feedbackMessage.textContent = "कृपया एक वैध ईमेल पता दर्ज करें।";
    feedbackMessage.style.backgroundColor = '#dc3545'; // Red
  }
});