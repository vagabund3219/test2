import Datepicker from './vanillajs-datepicker/js/Datepicker.js'
import ru from './vanillajs-datepicker/js/i18n/locales/ru.js';
import {validatindTransForm} from './forms_validations.js';
import {url, CategoriesApiList, TypeOfTransactionApiList, transApiUrl} from './list_of_trans.js'
import {dateString} from "./custom_format_for_date.js";
import {sendRequest} from "./requests.js";


window.addEventListener('load', (event) => {
    const doc = document;
    const addNewTransBtnSide = doc.querySelector('#add-new-transaction');
    const transactionAddForm = doc.querySelector('#add-transaction');
    const elem = doc.getElementById('date');
    const categorySelect = doc.getElementById('category_id');
    const typeSelect = doc.getElementById('type_id');

    const datepicker = new Datepicker(elem, {
      format: 'dd.mm.yyyy',
      language: 'ru'
    });

    function newTransaction(){
        const categoryButtons = doc.querySelectorAll('.articles__article');
        const cards = doc.querySelectorAll('.card');
        const forItemsContainer = doc.querySelector('.for-items');
        const filterButton = doc.querySelector('#submitFilter');

        filterButton.disabled = true;
        forItemsContainer.classList.add('hidden');
        categoryButtons.forEach(btn => btn.classList.add('hidden'));
        cards.forEach(card => card.remove());
        addNewTransBtnSide.disabled = true;
        transactionAddForm.classList.remove('hidden');
        transactionAddForm.classList.add('add-transaction-form');
        getTypes();
    }

    addNewTransBtnSide.addEventListener('click', newTransaction)

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

    transactionAddForm.addEventListener('submit', async (event)=>{
        event.preventDefault()
        validatindTransForm() ? sendRequest('POST', `${url}${transApiUrl}`, validatindTransForm(), '.transLabel') : console.log('.....')
    })

})

