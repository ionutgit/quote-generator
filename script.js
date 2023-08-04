let quotes = [];

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const quoteTwitter = document.getElementById('twitter');
const quoteNewBtn = document.getElementById('new-quote');

// get the quote
function newQuote() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    // check if quote is long
    if (quoteText.textContent.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;

    // check if author exist
    if (quote.author) {
        quoteAuthor.textContent = quote.author;
    } else {
        quoteAuthor.textContent = 'Undefined';
    }
}

// get the quotes
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        quotes = await response.json();
        newQuote();
    } catch (error) {
        alert(error);
    }

}

function tweetQuote() {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(tweetUrl, '_blank');
}

//add event listeners
quoteTwitter.addEventListener('click', tweetQuote);
quoteNewBtn.addEventListener('click', newQuote);

// On Load
getQuotes();