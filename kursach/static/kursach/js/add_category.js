import  {validatingCategoriesForm} from "./forms_validations.js";
import {dangerAlert, successAlert} from "./alerts.js";
import {url, TypeOfTransactionApiList, transApiUrl, CategoriesApiList} from './list_of_trans.js';
import {sendRequest} from "./requests.js";

window.addEventListener('load', (event) => {
    const addNewCategoryBtn = document.querySelector('#add-category-btn');
    const categoryForm = document.querySelector('#add-category-form');
    const asideCategoriesReturn = document.querySelector('#aside-categories-return');
    const typeSelect = document.querySelector('#type_id_category');

    addNewCategoryBtn.addEventListener('click', addNewCategory);

    function addNewCategory(){
        const categories = document.querySelector('.articles');
        categoryForm.classList.remove('hidden');
        categoryForm.classList.add('add-transaction-form');
        categories.classList.add('hidden');
        addNewCategoryBtn.disabled = true;
        getTypes();
    }

    asideCategoriesReturn.addEventListener('click', ()=>{
        const categories = document.querySelector('.articles');
        categoryForm.classList.add('hidden');
        categories.classList.remove('hidden');
        addNewCategoryBtn.disabled = false;

    })

    async function getTypes(){
        const types = await fetch(`${url}${TypeOfTransactionApiList}`)
                            .then(response => response.json())
        typeSelect.innerHTML = '<option value="d">Выберите тип</option>';
        typeSelect.innerHTML += types.map(item => `<option value="${item.id}">${item.type_name}</option>`).join('');
    }

    categoryForm.addEventListener('submit', ()=>{
       event.preventDefault()
        validatingCategoriesForm() ? sendRequest('POST', `${url}${CategoriesApiList}`, validatingCategoriesForm(), propForRequest) : console.log('.....')
    })

    function propForRequest(){
        const form  = document.querySelectorAll('.category_label');
        form.forEach(label => {
            label.querySelector('input') ? label.querySelector('input').value = '' : {};
            label.querySelector('select') ? label.querySelector('select').value = 'd' : {};
        })
    }

})


