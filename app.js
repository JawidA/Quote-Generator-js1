let apiQuote = [];
const quote = document.querySelector('.quote');
const quoteHTML = document.querySelector('#quote');
const authorHTML = document.querySelector('#author');
const newQuoteBtn = document.querySelector('.new_quote');
const twitterBtn = document.querySelector(".twitter_button");
const loader = document.querySelector('.loader');

// loading animation
function loading () {
    loader.hidden = false;
    quote.hidden = true;
};

// loading complete
function loadingComplete () {
    loader.hidden = true;
    quote.hidden = false;
};

// Function for getting new quote randomly
function newQuote () {
    const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];
    // console.log(quote);
    quoteHTML.textContent = quote.text;
    authorHTML.textContent = "-" + quote.author;
    loadingComplete();
}

// Getting data form api and using try-catch to be get the error.
async function getQuote () {
    loading()
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const apiResponse = await fetch(apiURL);
        apiQuote = await apiResponse.json();
        newQuote();
    } catch (err){
        alert(err);
    };
};

// being able to tweet the quote
function tweetQuote  () {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteHTML.textContent} - ${authorHTML.textContent}`;
    window.open(tweetUrl, "_blank");
};

// ===============================================================
// =============== Calling in event listener =====================
// ===============================================================
// On load
getQuote();

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
