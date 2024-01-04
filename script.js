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

// get the quotes
async function getQuote() {
    loading();
    const proxy = 'https://vast-waters-86754-6428dc19c8b5.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxy + apiUrl);
        const data = await response.json();
        console.log(data);

        // check if quote is long
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
    
        // check if author exist
        if (data.quoteAuthor.length) {
            quoteAuthor.innerText = data.quoteAuthor;
        } else {
            quoteAuthor.innerText = 'Undefined';
        }

        quoteText.innerText = data.quoteText;
        complete();
    } catch (error) {
        // getQuotes();
        // alert(error);
    }

}

function tweetQuote() {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(tweetUrl, '_blank');
}

//add event listeners
quoteTwitter.addEventListener('click', tweetQuote);
quoteNewBtn.addEventListener('click', getQuote);

// On Load
getQuote();