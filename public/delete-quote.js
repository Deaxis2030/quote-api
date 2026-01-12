const getQuoteButton = document.getElementById("fetch-by-id");
const deleteQuoteButton = document.getElementById("delete-quote");
const getQuoteContainer = document.getElementById("quote-container");
const deleteQuoteContainer = document.getElementById("deleted-quote-container");

getQuoteButton.addEventListener("click", () => {
  const id = document.getElementById("id").value;

  if (!id) {
    alert("Please provide a Quote ID to fetch.");
  } else {
    fetch(`/api/quotes?id=${id}`)
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
        newQuote.className = "single-quote";
        newQuote.innerHTML = `
        <div class="quote-text">${quote.quote}</div>
        <div class="attribution">- ${quote.person}</div>
        <div class="attribution">- Quote ID: ${quote.id}</div>`;
        getQuoteContainer.appendChild(newQuote);
      })
      .catch((error) => {
        alert(`Failed to fetch quote: ${error.message}`);
      });
  }
});

deleteQuoteButton.addEventListener("click", () => {
  const id = document.getElementById("id").value;

  if (!id) {
    alert("Please provide a Quote ID to delete.");
  } else {
    fetch(`/api/quotes?id=${id}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        return response.json();
      })
      .then(({quote}) => {
        deleteQuoteContainer.innerHTML = `
        <p>Quote at ID#: ${quote.id} deleted successfully!</p>
        <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>`;
      })
      .catch((error) => {
        alert(`Failed to delete quote: ${error.message}`);
      });
  }
});
