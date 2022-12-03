import {url, NewsApiUrl} from "./requests.js"


export async function getAllNews(){
    const news = await fetch(`${url}${NewsApiUrl}`)
    return news.json()
}

export async function showNews(){
    const news = await getAllNews()
    const newsCardContainer = document.createElement('div');
    newsCardContainer.classList.add('projcard-container');

    const newsContainer = document.querySelector('.news_container');

    console.log(news)
    news.forEach(item=>{
        console.log(item)
        newsCardContainer.innerHTML += (createNewsCard(item.title, item.subtitle, item.description, item.tags, item.img))
    })
    newsContainer.append(newsCardContainer)
}


function createNewsCard(title, subtitle, description, tags, img){
    const newCard = `
                    <div class="projcard projcard-blue">
                        <div class="projcard-innerbox">
                          <img class="projcard-img" src="${img}" />
                          <div class="projcard-textbox">
                            <div class="projcard-title">${title}</div>
                            <div class="projcard-subtitle">${subtitle}</div>
                            <div class="projcard-bar"></div>
                            <div class="projcard-description">${description}</div>
                            <div class="projcard-tagbox">
                              <span class="projcard-tag">HTML</span>
                              <span class="projcard-tag">CSS</span>
                            </div>
                          </div>
                        </div>
                    </div>
    `
    return newCard
}

