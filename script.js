// get the quote api
let apiQuotes = [];
function newQuote() {
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  console.log(quote);
}

async function getQuote() {
  const res = await axios.get("https://dummyjson.com/quotes");

  apiQuotes = res.data.quotes;

  return newQuote();
}
getQuote().catch((err) => console.log(`error: ${err}`));
