import {getAllTransaction, displayTransactions, showLastTransactions} from "./newdesign_show_transactions.js";


window.addEventListener('load', ()=>{
    const doc = document;
    const navTransactionButton = doc.getElementById('nav_transactions');
    const url = 'http://127.0.0.1:8000/api/v1/';
    const checkApiUrl = 'CheckApiList';
    const transApiUrl = 'TransactionsApiList';
    const CategoriesApiList = 'CategoriesApiList';
    const TypeOfTransactionApiList = 'TypeOfTransactionApiList';

    showLastTransactions();

    navTransactionButton.addEventListener('click', async ()=>{
        const transactions = await getAllTransaction();
        displayTransactions(transactions);
    })


})