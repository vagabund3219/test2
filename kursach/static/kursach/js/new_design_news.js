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

