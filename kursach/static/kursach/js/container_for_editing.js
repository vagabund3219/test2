import {categoryFormListener, createCategoryForm} from "./new_design_add_category.js";
import {
    CategoriesApiDelete,
    CategoriesApiList,
    fetchReq,
    sendRequest,
    url,
    TransactionsApiDelete,
    transApiUrl
} from "./requests.js";
import {categoriesButtonListener, categoryDisplay, showCategories} from "./newdesign_show_categories.js";
import {navTransactionButtonListener} from "./new_design_base.js";
import {transactionsAddForm} from './new_design_add_transaction.js'
import {addCheckForm} from './new_design_add_check.js'
import {updateBillOnDelete} from "./new_design_updating_bill.js";

function ifDelete(className){
    document.querySelector(className) ? document.querySelector(className).remove() : {}
}

function EditingMenu(menuClass, addClass, deleteClass){
    const transactionsContainer = document.querySelector('.transactions-container');

    const categoryMenu = document.createElement('div')
    categoryMenu.classList.add(menuClass);
    categoryMenu.innerHTML = `     
         <div class=category_menu_left> 
            <div class="${addClass} category_menu_button">
                <i class="bi bi-plus-circle"></i>
            </div>
       
            <div class="${deleteClass} category_menu_button ">
                <i class="bi bi-trash"></i>
            </div>
         </div> 
`
    transactionsContainer.append(categoryMenu)
}

export function categoryEditingMenu (){
    EditingMenu('category_menu', 'add_category_button', 'delete_category_button')
    const categoryMenu = document.querySelector('.category_menu')
    categoryMenu.innerHTML += `<div class="category_return_button category_menu_button ">
                                       <i class="bi bi-arrow-return-left"></i>
                                   </div>`
}

export function categoryEditingListeners(){
    const categoryAddButton = document.querySelector('.add_category_button');
    const categoryDeleteButton = document.querySelector('.delete_category_button');
    const categoryReturnButton = document.querySelector('.category_return_button');

    categoryReturnButton.addEventListener('click', (event)=>{
        ifDelete('.articles');
        ifDelete('#add-category-form');
        showCategories(document.querySelector('.header_title'));
    })


    categoryAddButton.addEventListener('click', (event)=>{
        ifDelete('.articles');
        ifDelete('#add-category-form');
        createCategoryForm();
        categoryFormListener();
    })

    categoryDeleteButton.addEventListener('click', (event)=>{
        const allCategories = document.querySelectorAll('.articles__article')
        allCategories.forEach(category => {
            category.querySelector('i') ? category.querySelector('i').remove() : {}
            category.innerHTML += `<i class="bi bi-trash delete-category-button"></i>`
            category.querySelector('.delete-category-button').addEventListener('click', async (event)=>{

                await sendRequest('delete', `${url}${CategoriesApiDelete}/${category.id}/`)


                setTimeout(()=>showCategories(document.querySelector('.header_title')), 100)
            })
        })
    })
}

export function transactionsEditingMenu (){
    EditingMenu('transaction_menu', 'add_transaction_button', 'delete_transaction_button')
    document.querySelector('.category_menu_left').innerHTML+= `           
           <div class="add_check_button category_menu_button">
                <i class="bi bi-qr-code-scan"></i>
            </div>`
    const transactionMenu = document.querySelector('.transaction_menu');
    const categoryName = document.querySelector('#categoryName').textContent;
    transactionMenu.innerHTML += `<div class="trans_category_name">${categoryName}</div>`
    transactionMenu.innerHTML += `<div class="trans_return_button category_menu_button ">
                                       <i class="bi bi-arrow-return-left"></i>
                                   </div>`
    document.querySelector('.trans_return_button').addEventListener('click', (event)=>{
        showCategories(document.querySelector('.header_title'));
    })
}

export function transactionsEditingListeners(){
    const transactionAddButton = document.querySelector('.add_transaction_button');
    const transactionDeleteButton = document.querySelector('.delete_transaction_button');
    const checkAddbutton = document.querySelector('.add_check_button');



    transactionAddButton.addEventListener('click', (event)=>{
        ifDelete('.row');
        ifDelete('#add-transaction');
        ifDelete('#add-new-check-form');
        transactionsAddForm();
    })


    transactionDeleteButton.addEventListener('click', (event)=>{
        const cards = document.querySelectorAll('.card');
        cards.forEach(card=>{
            card.querySelector('i') ? card.querySelector('i').remove() : {}
            card.innerHTML += `<i class="bi bi-trash delete-trans-button"></i>`
            card.querySelector('.delete-trans-button').addEventListener('click', async (event)=>{

                await sendRequest('delete', `${url}${TransactionsApiDelete}/${card.id}/`)

                const price = document.getElementById(`${card.id}`).querySelector('.item_price').textContent
                const type = document.getElementById(`${card.id}`).querySelector('.item_type').textContent

                await updateBillOnDelete(type, price);

                document.getElementById(`${card.id}`).remove()


            })
        })
    })


    checkAddbutton.addEventListener('click', (event)=>{
        ifDelete('.row');
        ifDelete('#add-new-check-form');
        ifDelete('#add-transaction');
        addCheckForm();
    })
}