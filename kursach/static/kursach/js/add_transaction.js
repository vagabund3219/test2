import Datepicker from './vanillajs-datepicker/js/Datepicker.js'
import ru from './vanillajs-datepicker/js/i18n/locales/ru.js';
import {dateString} from "./custom_format_for_date.js";
// import {checkRequired} from "./forms_validations.js";

window.addEventListener('load', (event) => {
    const doc = document;
    const addNewTransBtn = doc.querySelector('#add-transaction-btn');
    const addNewTransBtnSide = doc.querySelector('#add-new-transaction');
    const rowCol = doc.querySelector('.row-col');
    const transactionAddForm = doc.querySelector('#add-transaction');
    const elem = doc.getElementById('date');
    const url = 'http://127.0.0.1:8000/api/v1/';
    const CategoriesApiList = 'CategoriesApiList';
    const TypeOfTransactionApiList = 'TypeOfTransactionApiList';
    const transApiUrl = 'TransactionsApiList';
    const categorySelect = doc.getElementById('category_id');
    const typeSelect = doc.getElementById('type_id');
    const formSubmitBtn = doc.getElementById('form-submit');

    const datepicker = new Datepicker(elem, {
      format: 'dd.mm.yyyy',
      language: 'ru'
    });

    function newTransaction(){
        const categoryButtons = doc.querySelectorAll('.category');
        categoryButtons.forEach(btn => btn.classList.toggle('hidden'));
        addNewTransBtn.classList.toggle('hidden');
        transactionAddForm.classList.toggle('hidden');
        rowCol.classList.toggle('hidden');
        getTypes();
    }

    addNewTransBtnSide.addEventListener('click', newTransaction)

    addNewTransBtn.addEventListener('click', newTransaction)

    async function getTypes(){
        const types = await fetch(`${url}${TypeOfTransactionApiList}`)
                            .then(response => response.json())
        const categories = await fetch(`${url}${CategoriesApiList}`)
            .then(response => response.json())

        typeSelect.innerHTML = '<option value="d">Выберите тип</option>';
        typeSelect.innerHTML += types.map(item => `<option value="${item.id}">${item.type_name}</option>`).join('');
        typeSelect.addEventListener('change', ()=>{
            const filtered = categories.filter(item=>item.type===+typeSelect.value);
            categorySelect.innerHTML = filtered.map(category => `<option value="${category.id}">${category.name}</option>`).join('');
        })
    }


    // formSubmitBtn.addEventListener('click', (e)=>{
    //     e.preventDefault()
    //     const form = {
    //         'name':doc.querySelector('#name-trans').value,
    //         'username': doc.querySelector('#username').value,
    //         'category': +doc.querySelector('#category_id').value,
    //         'type':+doc.querySelector('#type_id').value,
    //         'price':parseFloat(doc.querySelector('#sum').value.replace(",", ".")),
    //         'date': dateString(doc.querySelector('#date').value),
    //         'user': +doc.querySelector('#userId').value
    //     }
    //     try{
    //         sendRequest('POST', `${url}${transApiUrl}`, form);
    //     }catch (e){
    //         rowCol.innerHTML += `<h1>${e}</h1>`
    //     }
    // })





    // transactionAddForm.addEventListener('submit', (e)=>{
    //     e.preventDefault()
    //     const form = {
    //         'name':doc.querySelector('#name-trans').value,
    //         'username': doc.querySelector('#username').value,
    //         'category': +doc.querySelector('#category_id').value,
    //         'type':+doc.querySelector('#type_id').value,
    //         'price':parseFloat(doc.querySelector('#sum').value.replace(",", ".")),
    //         'date': dateString(doc.querySelector('#date').value),
    //         'user': +doc.querySelector('#userId').value
    //     }
    //     try{
    //         sendRequest('POST', `${url}${transApiUrl}`, form);
    //     }catch (e){
    //         rowCol.innerHTML += `<h1>${e}</h1>`
    //     }
    // })


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
        const headers = {
            "X-CSRFToken": csrftoken,
            'Content-Type': 'application/json'
        }
        fetch(url, {
            'method':method,
            'headers': headers,
            'body':JSON.stringify(body)
        }).then(response => {
            const titleCheck = doc.querySelector('h2');
            titleCheck ? titleCheck.innerHTML = '' : {}
            console.log(response.status);
            if (response.ok && response.status<300){
                const h2 = doc.createElement('h2');
                h2.innerHTML = `<h2 class="alert alert-success">Успешно!</h2>`;
                const formDiv = doc.querySelector('.form-div');
                formDiv.insertBefore(h2, formDiv.firstChild);
                return response.json()
            }else{
                console.log('error send')
            }
        })
    }

    //
    // sendRequest('POST', `${url}${transApiUrl}`, )
    //     {
    //     "date": "2022-11-17",
    //     "name": "Шаурма",
    //     "price": 230.0,
    //     "category": 2,
    //     "type": 1,
    //     "username": "Ваня",
    //     "user": 1
    // }

    const form  = doc.getElementsByTagName('form')[0];

    const name = doc.querySelector('#name-trans');
    const nameError = doc.querySelector('#name-trans + span.error');

    const username = doc.querySelector('#username');
    const usernameError = doc.querySelector('#username + span.error');

    const type = doc.querySelector('#type_id');
    const typeError = doc.querySelector('#type_id + span.error');

    const category = doc.querySelector('#category_id');
    const categoryError = doc.querySelector('#category_id + span.error');

    const sum = doc.querySelector('#sum');
    const sumError = doc.querySelector('#sum + span.error');

    const date = doc.querySelector('#date');
    const dateError = doc.querySelector('#date + span.error');

    const formInputs = [[name, nameError], [username, usernameError], [type, typeError], [category, categoryError], [sum, sumError], [date, dateError]];
    formInputs.forEach(item=>item[0].addEventListener('input', function (event) {
      if (item[0].validity.valid) {
        item[1].textContent = '';
        item[1].className = 'error';
      } else {
        showError();
      }
    }))

    form.addEventListener('submit', function (event) {
      formInputs.forEach(item=>{
        if (!item[0].validity.valid){
          showError(item[0], item[1]);
          event.preventDefault();
        }else{
            event.preventDefault()
            const form = {
                'name':doc.querySelector('#name-trans').value,
                'username': doc.querySelector('#username').value,
                'category': +doc.querySelector('#category_id').value,
                'type':+doc.querySelector('#type_id').value,
                'price':parseFloat(doc.querySelector('#sum').value.replace(",", ".")),
                'date': dateString(doc.querySelector('#date').value),
                'user': +doc.querySelector('#userId').value
            }
            sendRequest('POST', `${url}${transApiUrl}`, form);

        }
      })
    });

    function showError(field, fieldError) {
        if (field.validity.valueMissing){
          fieldError.textContent = 'Пожалуйста, заполните поле';
        }else if(field.validity.typeMismatch) {
          fieldError.textContent = 'Убедитесь в правильности ввода';
      }
      fieldError.className = 'error active';
    }

})

