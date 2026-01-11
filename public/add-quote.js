const submitButton = document.getElementById('submit-quote');
const newQuoteContainer = document.getElementById('new-quote');

submitButton.addEventListener('click', () => {
  const quote = document.getElementById('quote').value;
  const person = document.getElementById('person').value;

  if (!quote || !person) {
    alert('Please provide both a quote and a person.');
    return;
  }

  fetch(`/api/quotes?quote=${quote}&person=${person}`, {
    method: 'POST',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    return response.json();
  })
  .then(({quote}) => {
    if (!quote) {
      alert('Unexpected response from server');
      return;
    }
    const newQuoteDiv = document.createElement('div');
    newQuoteDiv.innerHTML = `
      <h3>Congrats, your quote was added!</h3>
      <div class="quote-text">${quote.quote}</div>
      <div class="attribution">- ${quote.person}</div>
      <div class="attribution">- Quote ID: ${quote.id}</div>
      <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `;
    newQuoteContainer.appendChild(newQuoteDiv);
  })
  .catch(error => {
    alert(`Failed to add quote: ${error.message}`);
  });
});