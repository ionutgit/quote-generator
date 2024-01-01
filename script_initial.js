let quotes = [];

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const quoteTwitter = document.getElementById('twitter');
const quoteNewBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loader
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// get the quote
function newQuote() {
    loading();
    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    // check if quote is long
    if (quoteText.textContent.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    // check if author exist
    if (quote.author) {
        quoteAuthor.textContent = quote.author;
    } else {
        quoteAuthor.textContent = 'Undefined';
    }

    quoteText.textContent = quote.text;
    complete();
}

// get the quotes
async function getQuotes() {
    loading();
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