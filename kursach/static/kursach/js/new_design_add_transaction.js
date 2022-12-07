import {CategoriesApiList, sendRequest, TypeOfTransactionApiList, url, transApiUrl} from "./requests.js";
import Datepicker from './vanillajs-datepicker/js/Datepicker.js'
import {validatindTransForm} from "./forms_validations.js";
import {getBill, updateBill} from "./new_design_updating_bill.js";



function createTransactionsForm(){
    const transactionsForm = document.createElement('div');
    transactionsForm.innerHTML = `<form novalidate method="POST" id="add-transaction">
<!--                    {% csrf_token %}-->
                        <div class="form-container">
                            <label class="transLabel" for="name-trans" >
                                <span>Имя транзакции</span>
                                <input type="text" id="name-trans" class="form-control" autocomplete="off" required>
                                <span class="error" aria-live="polite"></span>
                            </label>
                            <label class="transLabel" for="username">
                                <span>Кто добавил</span>
                                <input type="text" id="username" class="form-control" required>
                                <span class="error" aria-live="polite"></span>
                            </label>
                            <label class="transLabel" for="type_id">
                                <span>Тип</span>
                                <select name="type_id" id="type_id" class="form-control" required></select>
                                <span class="error" aria-live="polite"></span>
                            </label>
                            <label class="transLabel" for="category_id">
                                <span>Категория</span>
                                <select name="category_id" id="category_id" class="form-control" required></select>
                                <span class="error" aria-live="polite"></span>
                            </label>
                            <label class="transLabel" for="sum">
                                <span>Сумма</span>
                                <input type="number" class="form-control" id="sum" autocomplete="off" required>
                                <span class="error" aria-live="polite"></span>
                            </label>
                            <label class="transLabel" for="date">
                                <span>Дата</span>
                                <input type="text" id="date" autocomplete="off" class="form-control" required>
                                <span class="error dateerr" aria-live="polite"></span>
                            </label>
                             <button class="floating-button">Отправить</button>
                        </div>
                </form>`


    document.querySelector('.main_content_container').append(transactionsForm)
    getTypes();
}

    async function getTypes(){
        const categorySelect = document.getElementById('category_id');
        const typeSelect = document.getElementById('type_id');
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
    const datepicker = new Datepicker(document.getElementById('date'), {
      format: 'dd.mm.yyyy',
      language: 'ru'
    });
    }

    async function transactionFormListener(){
        const transactionAddForm = document.querySelector('#add-transaction');
        transactionAddForm.addEventListener('submit', async (event)=>{
            event.preventDefault()
        //     validatindTransForm() ? sendRequest('POST', `${url}${transApiUrl}`, validatindTransForm(), '.transLabel') : console.log('.....')

            if (validatindTransForm()){

                const validatedForm = await validatindTransForm()
                sendRequest('POST', `${url}${transApiUrl}`, validatedForm, '.transLabel')
                await updateBill(validatedForm);
                await getBill();
            }
        })
    }

    export async function transactionsAddForm(){
        await createTransactionsForm();
        await transactionFormListener();

    }