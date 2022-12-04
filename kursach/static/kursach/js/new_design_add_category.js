import {CategoriesApiList, TypeOfTransactionApiList, url} from "./requests.js";
import {validatingCategoriesForm} from "./forms_validations.js";
import {sendRequest} from "./requests.js";

export function createCategoryForm(){
    const categoryForm = document.createElement('div')
    categoryForm.innerHTML = `        
        <form novalidate method="POST" id="add-category-form">
                <div class="category_form_container">
                            <label class="category_label" for="name_category">
                                <span>Имя категории</span>
                                <input type="text" id="name_category" class="form-control" autocomplete="off" required>
                                <span class="error" aria-live="polite"></span>
                            </label>
                            <label class="category_label" for="type_id_category">
                                <span>Тип</span>
                                <select name="type_id" id="type_id_category" class="form-control" required></select>
                                <span class="error" aria-live="polite"></span>
                            </label>
                    <button class="floating-button">Отправить</button>
                </div>
        </form>`
    document.querySelector('.main_content_container').append(categoryForm)
    getTypes()
}

async function getTypes(){
    const typeSelect = document.querySelector('#type_id_category');
        const types = await fetch(`${url}${TypeOfTransactionApiList}`)
                            .then(response => response.json())
        typeSelect.innerHTML = '<option value="d">Выберите тип</option>';
        typeSelect.innerHTML += types.map(item => `<option value="${item.id}">${item.type_name}</option>`).join('');
    }

export function categoryFormListener(){
    const categoryForm = document.querySelector('#add-category-form');
    categoryForm.addEventListener('submit', ()=>{
       event.preventDefault()
        validatingCategoriesForm() ? sendRequest('POST', `${url}${CategoriesApiList}`, validatingCategoriesForm(), '.category_label') : console.log('.....')
    })
}



