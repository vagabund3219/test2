import {validatingCategoriesForm} from "./forms_validations.js";

window.addEventListener('load', (event) => {
    const addNewCategoryBtn = document.querySelector('#add-category-btn');
    const categoryForm = document.querySelector('#add-category-form');
    const row = document.querySelector('.row');
    const asideCategoriesReturn = document.querySelector('#aside-categories-return');
    const url = 'http://127.0.0.1:8000/api/v1/';
    const TypeOfTransactionApiList = 'TypeOfTransactionApiList';
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

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    function sendRequest(method, url, body = null){
        const csrftoken = getCookie('csrftoken');
        console.log(JSON.stringify(body))
        const headers = {
            "X-CSRFToken": csrftoken,
            'Content-Type': 'application/json'
        }
        fetch(url, {
            'method':method,
            'headers': headers,
            'body':JSON.stringify(body)
        }).then(response => {


            const titleCheck = document.querySelector('.errororsuccess');
            titleCheck ? titleCheck.innerHTML = '' : {}

            if (response.ok && response.status<300){
                const form  = document.querySelectorAll('.category_label');
                form.forEach(label => {
                    label.querySelector('input') ? label.querySelector('input').value = '' : {};
                    label.querySelector('select') ? label.querySelector('select').value = 'd' : {};
                })
                const h2 = document.createElement('h2');
                h2.classList.add('errororsuccess')
                h2.innerHTML = `<h2 class="alert alert-success">Успешно!</h2>`;
                const formDiv = document.querySelector('.category_form_container');
                formDiv.insertBefore(h2, formDiv.firstChild);
                return response.json()

            }else{
                console.log('error send')
                const h2 = document.createElement('h2');
                h2.classList.add('errororsuccess')
                h2.innerHTML = `<h2 class="alert alert-danger">Ошибка!</h2>`;
                const formDiv = document.querySelector('.category_form_container');
                formDiv.insertBefore(h2, formDiv.firstChild);


            }
        })
    }
    validatingCategoriesForm(sendRequest);

})


