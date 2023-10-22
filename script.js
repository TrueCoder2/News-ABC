const API_KEY ="863959b8fcf04069bcc8ec538a391586";
const url ="https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("india"));

function reload() {
    window.location.reload();
}

async function fetchNews (query) {
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    bindData(data.articles);
     }


    function bindData (articles) {
        const cardsContainer = document.getElementById("cards-container");
        const newsCardTemplate = document.getElementById("template-news-card");

        cardsContainer.innerHTML = "";

        articles.map(article => {
            if (!article.urlToImage) return;
            const cardClone = newsCardTemplate.content.cloneNode(true);
            fillDataInCard(cardClone, article);
            cardsContainer.appendChild(cardClone);
        });
    }


function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-descr');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US" , {timeZone:"Asia/Jakarta"});

    newsSource.innerHTML = `${article.source.name} -- ${date}`;

    cardClone.firstElementChild.addEventListener("click" , () => {
        window.open(article.url, "_blank")
    });

};

let cursorSelected = null;
function onNavTabClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    cursorSelected ?.classList.remove('active');
    cursorSelected = navItem;
    cursorSelected.classList.add('active');
};


const searchQuery = document.getElementById('search-query');
const searchButton =document.getElementById('search-button');

searchButton.addEventListener("click" , () => {
    const query = searchQuery.value;
    if(!query) return;
    fetchNews(query);
    cursorSelected?.classList.remove("active");
    cursorSelected = null;
});