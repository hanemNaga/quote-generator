const quoteText = document.getElementById("quote-text");
const author = document.getElementById("author");
const xbutton = document.getElementById("xbutton");
const button = document.getElementById("new-quote");
const loader = document.getElementById("loader");
const container = document.getElementById("quote-container");

function loading() {
  loader.hidden = false;
  container.hidden = true;
}
function complete() {
  loader.hidden = true;
  container.hidden = false;
}

// get the quote api
let apiQuotes = [];
function newQuote() {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  console.log(quote);
  // check the text list to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;

  // if there is no author name we replace it with unknown
  if (!quote.author) {
    author.textContent = "Unknown";
  } else {
    author.textContent = quote.author;
  }
  complete();
}

async function getQuote() {
  loading();
  const res = await axios.get(
    "https://jacintodesign.github.io/quotes-api/data/quotes.json"
  );

  apiQuotes = res.data;

  newQuote();
}
getQuote().catch((err) => console.log(`error: ${err}`));
//  https://dummyjson.com/quotes

// post to x
function postToX() {
  const url = `https://twitter.com/intent/tweet?text=${quoteText.textContent} -${author.textContent}`;

  window.open(url);
}

// event listeners
xbutton.addEventListener("click", postToX);
button.addEventListener("click", newQuote);
