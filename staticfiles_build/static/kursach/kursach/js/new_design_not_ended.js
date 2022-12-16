import {notEndedAlert} from "./alerts.js";

function neUspel(element){
    element.addEventListener('click', (event)=>{
        notEndedAlert("Не успел доделать...")
    })
}


const bell = document.querySelector('.bell');
neUspel(bell)

const main = document.querySelector('#nav_main')
neUspel(main);

export function newsNotEnded(){
    const allNews1 = document.querySelectorAll('.news_adapt_card');
    const allNews2 = document.querySelectorAll('.projcard');
    console.log(allNews1)

    allNews1.forEach(news => {
        console.log(1)
        news.addEventListener('click', ()=>{
            console.log(111)
        })
        neUspel(news);
    })

    allNews2.forEach(news => {
        neUspel(news);
    })
}