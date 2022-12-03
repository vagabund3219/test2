import {getAllTransaction, displayTransactions, showLastTransactions} from "./newdesign_show_transactions.js";
import {fetchReq, CategoriesApiList} from "./requests.js";
import {categoryDisplay} from "./newdesign_show_categories.js";
import {showNews} from "./new_design_news.js";


window.addEventListener('load', ()=>{
    const doc = document;
    const navTransactionButton = doc.getElementById('nav_transactions');
    const url = 'http://127.0.0.1:8000/api/v1/';
    const checkApiUrl = 'CheckApiList';
    const transApiUrl = 'TransactionsApiList';
    const CategoriesApiList = 'CategoriesApiList';
    const TypeOfTransactionApiList = 'TypeOfTransactionApiList';
    const navNewsButton = doc.getElementById('nav_news');


    navTransactionButton.addEventListener('click', async ()=>{
        const articlesOl = document.querySelector('.articles');
        articlesOl ? articlesOl.remove() : {}
        categoryDisplay(fetchReq(CategoriesApiList, 'категориями'));
    })

    navNewsButton.addEventListener('click', async ()=>{
        const newsContainer = doc.querySelector('.news_container');
        // newsContainer.classList.toggle('hidden');
        showNews()
    })




    showLastTransactions();


})