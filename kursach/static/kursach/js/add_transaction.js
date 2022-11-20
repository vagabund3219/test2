import Datepicker from './vanillajs-datepicker/js/Datepicker.js'
import ru from './vanillajs-datepicker/js/i18n/locales/ru.js';
import {dateString} from "./custom_format_for_date.js";


window.addEventListener('load', (event) => {
    const doc = document;
    const addNewTransBtn = doc.querySelector('#add-transaction-btn');
    const row = doc.querySelector('.row');
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


    addNewTransBtn.addEventListener('click', ()=>{
        const categoryButtons = doc.querySelectorAll('.category')
        categoryButtons.forEach(btn => btn.classList.toggle('hidden'))
        addNewTransBtn.classList.toggle('hidden');
        transactionAddForm.classList.toggle('hidden');
        getTypes()
    })

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


    formSubmitBtn.addEventListener('click', (e)=>{
        e.preventDefault()
        console.log(dateString(doc.querySelector('#date').value))
        const form = {
            'name':doc.querySelector('#name-trans').value,
            'username': doc.querySelector('#username').value,
            'category': +doc.querySelector('#category_id').value,
            'type':+doc.querySelector('#type_id').value,
            'price':parseFloat(doc.querySelector('#sum').value.replace(",", ".")),
            'date': dateString(doc.querySelector('#date').value),
            'user': +doc.querySelector('#userId').value
        }
        try{
            sendRequest('POST', `${url}${transApiUrl}`, form);
        }catch (e){
            row.innerHTML += `<h1>${e}</h1>`
        }
    })


    // const d = doc.querySelector('#category_id')
    // d.addEventListener('change', ()=>{
    //
    //
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
        }).then(response => {return response.json()})
    }
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

})

