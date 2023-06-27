const API_KEY ="863959b8fcf04069bcc8ec538a391586";
const url ="https://newsapi.org/v2/everything?q=";

window.addEventListener("load" , () => fetchNews("India") );

async function fetchNews (query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
     }

    function bindData (articles) {
        const cardsContainer = document.getElementById("cards-container");
        const newsCardTemplate = document.getElementById("template-news-card");

        cardsContainer.innerHTML = "";

        articles.forEach((article) => {
            if (!article.urlToImage) return;
            const cardClone = newsCardTemplate.content.cloneNode(true);
            fillCard(cardClone , article)
            cardsContainer.appendChild(cardClone);
        } );
};

function fillCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-descr');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US" , {timeZone:"Asia/Jakarta"});

    newsSource.innerHTML = `${article.source.name} -- ${date}`;
};