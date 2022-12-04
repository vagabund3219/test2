import {getAllTransaction, displayTransactions, showLastTransactions} from "./newdesign_show_transactions.js";
import {fetchReq, CategoriesApiList} from "./requests.js";
import {categoriesButtonListener, categoryDisplay} from "./newdesign_show_categories.js";
import {showNews} from "./new_design_news.js";
import {categoryEditingMenu} from "./container_for_editing.js";


export function ifDelete(className){
    document.querySelector(className) ? document.querySelector(className).remove() : {}
}


window.addEventListener('load', ()=>{
    const doc = document;
    const navTransactionButton = doc.getElementById('nav_transactions');
    const url = 'http://127.0.0.1:8000/api/v1/';
    const checkApiUrl = 'CheckApiList';
    const transApiUrl = 'TransactionsApiList';
    const CategoriesApiList = 'CategoriesApiList';
    const TypeOfTransactionApiList = 'TypeOfTransactionApiList';
    const navNewsButton = doc.getElementById('nav_news');
    const headerTitle = doc.querySelector('.header_title');

    const mainContentContainer = document.querySelector('.main_content_container');

    navTransactionButton.addEventListener('click', async ()=>{
        mainContentContainer.innerHTML = ''
        const transactionsContainer = doc.createElement('div');
        transactionsContainer.classList.add('transactions-container')
        mainContentContainer.append(transactionsContainer)

        headerTitle.textContent = 'Категории'

        categoryEditingMenu()

        await categoryDisplay(fetchReq(CategoriesApiList, 'категориями'));
        categoriesButtonListener();
    })

    navNewsButton.addEventListener('click', async ()=>{
        mainContentContainer.innerHTML = ''

        headerTitle.textContent = 'Новости'

        showNews()
    })






    showLastTransactions();


})