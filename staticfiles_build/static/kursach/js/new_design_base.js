import {showLastTransactions} from "./newdesign_show_transactions.js";
import {showCategories} from "./newdesign_show_categories.js";
import {showNews} from "./new_design_news.js";
import {donutCategoriesDiagram, barDiagram, getItems} from "./new_design_diagrams.js";
import {newsNotEnded} from "./new_design_not_ended.js";


export function ifDelete(className){
    document.querySelector(className) ? document.querySelector(className).remove() : {}
}

export async function navTransactionButtonListener(){
    try{
            if (document.getElementById('userId').value){
            const navTransactionButton = document.getElementById('nav_transactions');
            const headerTitle = document.querySelector('.header_title');

            navTransactionButton.addEventListener('click', ()=>showCategories(headerTitle))
        }
    }catch{

    }
}


window.addEventListener('load', ()=>{
    const doc = document;
    //Кнопки бокового меню
    const navNewsButton = doc.getElementById('nav_news');
    const navDiagramsButton = doc.getElementById('nav_diagrams');
    //Заголовок в контенте
    const headerTitle = doc.querySelector('.header_title');

    navDiagramsButton.addEventListener('click', async (event)=>{
        const isNotNull = await getItems();
        const mainContentContainer = document.querySelector('.main_content_container');
        mainContentContainer.innerHTML = ''
        if (isNotNull.length==0){
            mainContentContainer.innerHTML+='<h3 class="no-transactions">У вас отсутствуют транзакции</h3>'
        }else{
            headerTitle.textContent = 'Графики'
            barDiagram()

            donutCategoriesDiagram();
        }

    })



    navTransactionButtonListener()


    navNewsButton.addEventListener('click', async ()=>{
        const mainContentContainer = document.querySelector('.main_content_container');
        mainContentContainer.innerHTML = ''

        headerTitle.textContent = 'Новости'

        await showNews()
        newsNotEnded()
    })



    try{
        if (document.getElementById('userId').value){
            showLastTransactions();
        }
    }catch (e){

    }


})