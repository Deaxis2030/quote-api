const updateButton = document.getElementById("update-quote");
const updatedQuoteContainer = document.getElementById("updated-quote");

updateButton.addEventListener("click", () => {
  const quote = document.getElementById("quote").value;
  const person = document.getElementById("person").value;
  const id = document.getElementById("id").value;

  if (!id) {
    alert("Please provide a Quote ID to update.");
  } else {
    fetch(`/api/quotes?quote=${quote}&person=${person}&id=${id}`, {
      method: "PUT",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        return response.json();
      })
      .then(({ quote }) => {
        if (!quote) {
          alert("Unexpected response from server");
          return;
        }
        const newQuote = document.createElement("div");
        newQuote.innerHTML = `
            <h3>Congrats, your quote was updated!</h3>
            <div class="quote-text">${quote.quote}</div>
            <div class="attribution">- ${quote.person}</div>
            <div class="attribution">- Quote ID: ${quote.id}</div>
            <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
            `;
        updatedQuoteContainer.appendChild(newQuote);
      })
      .catch((error) => {
        alert(`Failed to update quote: ${error.message}`);
      });
  }
});
