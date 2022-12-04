import {getAllTransaction, displayTransactions, showLastTransactions} from "./newdesign_show_transactions.js";
import {fetchReq, CategoriesApiList} from "./requests.js";
import {categoriesButtonListener, categoryDisplay, showCategories} from "./newdesign_show_categories.js";
import {showNews} from "./new_design_news.js";
import {categoryEditingListeners, categoryEditingMenu} from "./container_for_editing.js";


export function ifDelete(className){
    document.querySelector(className) ? document.querySelector(className).remove() : {}
}

export async function navTransactionButtonListener(){
        const CategoriesApiList = 'CategoriesApiList';
        const navTransactionButton = document.getElementById('nav_transactions');
        const headerTitle = document.querySelector('.header_title');
        // navTransactionButton.addEventListener('click', async ()=>{
        //     const mainContentContainer = document.querySelector('.main_content_container');
        //     mainContentContainer.innerHTML = `<div class="transactions-container"></div>`
        //
        //     headerTitle.textContent = 'Категории';
        //     categoryEditingMenu();
        //     categoryEditingListeners();
        //     await categoryDisplay(fetchReq(CategoriesApiList, 'категориями'));
        //     categoriesButtonListener();
        // })
        navTransactionButton.addEventListener('click', ()=>showCategories(headerTitle))

}


window.addEventListener('load', ()=>{
    const doc = document;
    //Кнопки бокового меню
    const navNewsButton = doc.getElementById('nav_news');
    //Заголовок в контенте
    const headerTitle = doc.querySelector('.header_title');

    // const mainContentContainer = document.querySelector('.main_content_container');



    // Listeners

    // navTransactionButton.addEventListener('click', async ()=>{
    //     mainContentContainer.innerHTML = `<div class="transactions-container"></div>`
    //
    //     headerTitle.textContent = 'Категории';
    //
    //     categoryEditingMenu();
    //     categoryEditingListeners();
    //     await categoryDisplay(fetchReq(CategoriesApiList, 'категориями'));
    //     categoriesButtonListener();
    // })




    navTransactionButtonListener()


    navNewsButton.addEventListener('click', async ()=>{
        const mainContentContainer = document.querySelector('.main_content_container');
        mainContentContainer.innerHTML = ''

        headerTitle.textContent = 'Новости'

        showNews()
    })



    showLastTransactions();

})