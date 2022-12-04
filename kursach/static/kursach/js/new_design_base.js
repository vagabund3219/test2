import {getAllTransaction, displayTransactions, showLastTransactions} from "./newdesign_show_transactions.js";
import {fetchReq, CategoriesApiList} from "./requests.js";
import {categoriesButtonListener, categoryDisplay, showCategories} from "./newdesign_show_categories.js";
import {showNews} from "./new_design_news.js";
import {categoryEditingListeners, categoryEditingMenu} from "./container_for_editing.js";


export function ifDelete(className){
    document.querySelector(className) ? document.querySelector(className).remove() : {}
}

export async function navTransactionButtonListener(){
    if (document.getElementById('userId').value){
        const navTransactionButton = document.getElementById('nav_transactions');
        const headerTitle = document.querySelector('.header_title');

        navTransactionButton.addEventListener('click', ()=>showCategories(headerTitle))
    }
}


window.addEventListener('load', ()=>{
    const doc = document;
    //Кнопки бокового меню
    const navNewsButton = doc.getElementById('nav_news');
    //Заголовок в контенте
    const headerTitle = doc.querySelector('.header_title');



    navTransactionButtonListener()


    navNewsButton.addEventListener('click', async ()=>{
        const mainContentContainer = document.querySelector('.main_content_container');
        mainContentContainer.innerHTML = ''

        headerTitle.textContent = 'Новости'

        showNews()
    })


    if (document.getElementById('userId').value){
        showLastTransactions();
    }


})