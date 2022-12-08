import {url, NewsApiUrl} from "./requests.js"


export async function getAllNews(){
    const news = await fetch(`${url}${NewsApiUrl}`)
    return news.json()
}

export async function showNews(){
    const news = await getAllNews()
    const newsCardContainer = document.createElement('div');
    newsCardContainer.classList.add('projcard-container');

    const newsContainer = document.querySelector('.main_content_container');

    news.forEach(item=>{
        newsCardContainer.innerHTML += (createNewsCard(item.title, item.subtitle, item.description, item.tags, item.image))
        newsCardContainer.innerHTML += (createAnotherNewsCard(item.title, item.subtitle, item.description, item.tags, item.image))
    })
    newsContainer.append(newsCardContainer)
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function displayTags (tags){
    const tagList = tags.split(' ');
    let readyTagList = []
    console.log(tagList)
    tagList.forEach(tag=>{
        readyTagList.push(`<span class="projcard-tag">${tag}</span>`)
        // const tagg = `<span class="projcard-tag">${tag}</span>`
        // displayTag(tagg)
    })
    return readyTagList
}

function removeComma(tag){

    return tag
}

function createNewsCard(title, subtitle, description, tags, img){
    const style = ['projcard-blue', 'projcard-red', 'projcard-green']
    const currentStyle = style[getRandomInt(3)]
    const newCard = `
                    <div class="projcard ${currentStyle}">
                        <div class="projcard-innerbox">
                          <img class="projcard-img" src="${img}" />
                          <div class="projcard-textbox">
                            <div class="projcard-title">${title}</div>
                            <div class="projcard-subtitle">${subtitle}</div>
                            <div class="projcard-bar"></div>
                            <div class="projcard-description">${description}</div>
                            <div class="projcard-tagbox">
                                ${displayTags(tags)}
                                
<!--                              <span class="projcard-tag">HTML</span>-->
<!--                              <span class="projcard-tag">CSS</span>-->
                            </div>
                          </div>
                        </div>
                    </div>
    `
    return newCard
}

function createAnotherNewsCard(title, subtitle, description, tags, img){
    const style = ['card_blue', 'card_green', 'card_red']
    const currentStyle = style[getRandomInt(3)]
    const newsAdaptCard = `<div class="news_adapt_card">
                                <div class="news_adapt_upper">
                                    <img src="${img}" alt="news_image" class="news_adapt_image"/>
                                </div>
                                <div class="news_adapt_footer ${currentStyle}">
                                    <div class="news_adapt_title">${title}</div>
                                    <div class="news_adapt_subtitle">${subtitle}</div>
                                    <div class="projcard-bar"></div>
                                    <div class="news_adapt_text">${description}</div>
                                    <div class="news_adapt_tags">
                                        ${displayTags(tags)}
                                    </div>
                                </div>
                              </div>`
    return newsAdaptCard
}

