let quotes = [];

function newQuote() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    console.log(quote);
}

// get the quotes
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        quotes = await response.json();
        // console.log(quotes[12]);
        newQuote();
    } catch (error) {
        alert(error);
    }

}

getQuotes();