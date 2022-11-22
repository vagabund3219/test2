import DateRangePicker from "./vanillajs-datepicker/js/DateRangePicker.js";
import DatePicker from "./vanillajs-datepicker/js/Datepicker.js";
import ru from './vanillajs-datepicker/js/i18n/locales/ru.js';
import './custom_format_for_date.js';
import {filterDate, byField} from './custom_format_for_date.js';
Object.assign(DatePicker.locales, ru)

window.onload = (event) => {
    //Для запросов
  const url = 'http://127.0.0.1:8000/api/v1/';
  const checkApiUrl = 'CheckApiList';
  const transApiUrl = 'TransactionsApiList';
  const CategoriesApiList = 'CategoriesApiList';
  const TypeOfTransactionApiList = 'TypeOfTransactionApiList';
   // Для элементов со страницы
  const rowCol = document.querySelector('.row-col');
  const row = document.querySelector('.row');
  const aside = document.querySelector('#aside-trans');
  const returnButton = document.querySelector('.fa-reply');
  const submitFilterBtn = document.querySelector('#submitFilter');
  const rangePicker = document.querySelector('#foo');
  const categoryName = document.querySelector('#category-name');
  const container = document.querySelector('.container');
  const addTransactionBtn = document.querySelector('#add-transaction-btn');


  const rangepicker = new DateRangePicker(rangePicker, {
      format: 'dd.mm.yyyy',
      language: 'ru'
    });


  async function getNameCategory(id) {
    return fetchReq(CategoriesApiList, 'категориями')
        .then(items =>{
            for (let item of items) {
                if (item.id == id) {
                  return item.name
                }
            }
        })
  }

  async function getTypeTrans(id) {
    return fetchReq(TypeOfTransactionApiList, 'типами транзакций')
        .then(items =>{
            for (let item of items) {
                if (item.id == id) {
                  return item['type_name']
                }
            }
        })
  }

  function createCard(item, ul){
    Object.entries(item).forEach(async ([key, value])=>{
        if (key == 'date'){
          let date = new Date(Date.parse(value));
          ul.innerHTML += `<li class="list-group-item">${date.customFormat( "#DD#.#MM#.#YYYY#" )}</li>`;
        }else if (key == 'category'){
          await getNameCategory(value).then(data=>ul.innerHTML += `<li class="list-group-item">${data}</li>`);
        } else if(key == 'type'){
          await getTypeTrans(value).then(data=>ul.innerHTML += `<li class="list-group-item">${data}</li>`)
        }
        else{
          ul.innerHTML += `<li class="list-group-item">${value}</li>`;
        }
    });
  }

  function displayCard(container, item){
    let div = document.createElement('div');
    div.classList.add('card', 'col-3');
    let ul = document.createElement('ul');
    ul.classList.add('list-group', 'list-group-flush');
    createCard(item, ul);
    div.append(ul);
    container.append(div);
  }

  async function getItems(category){
    const check = await fetch(`${url}${checkApiUrl}?category_id=${category}`);
    const trans = await fetch(`${url}${transApiUrl}?category_id=${category}`);
    let lst = await check.json();
    let trans1 = await trans.json();
    trans1.forEach(item => lst.push(item));
    return lst
  }

  async function categoryDisplay(func) {
    let response = await func;
    await response.forEach(category=>{
      rowCol.innerHTML += `<button class="category" id=${category['id']}>${category['name']}</button>`
    })
    const buttons = document.querySelectorAll('.category');
    buttons.forEach(button => button.addEventListener('click', ()=>{
        addTransactionBtn.classList.toggle('hidden');
        aside.classList.toggle('hidden');
        container.innerHTML += `<input type="hidden" id='currentCategoryId' value=${button.id} />`
        categoryName.textContent = `${button.textContent}`;
        rowCol.innerHTML = '';
        getItems(+button.id)
          .then(data =>{
                returnBtn(func);
                if (data.length){
                  data.sort(byField('date'));
                  data.forEach(item => displayCard(row, item))
                  // data.forEach(item => displayCard(rowCol, item))
                }else{
                  let h2 = document.createElement('h2')
                  h2.innerHTML = '<h2>У вас нет записей в этой категории</h2>'
                  rowCol.append(h2);
            }
          })
    }))
  }



  function returnBtn (func){
      returnButton.addEventListener('click', ()=>{
          document.getElementById('currentCategoryId').remove();
          addTransactionBtn.classList.toggle('hidden');
          const ul = document.querySelector('.list-group-flush');
          ul ? ul.innerHTML = '' : {}
          aside.classList.toggle('hidden');
          rowCol.innerHTML = '';
          row.innerHTML = '';
          categoryDisplay(func);
      }, {'once':true})
  }

  async function fetchReq(path, errorText) {
    let req = await fetch(`${url}${path}`);
    if (req.ok == true && req.status < 300){
      return req.json();
    } else{
      console.log(`Что-то не так с ${errorText}`);
    }
  }

  categoryDisplay(fetchReq(CategoriesApiList, 'категориями'));


  submitFilterBtn.addEventListener('click', ()=>{
    const currentCategoryId = document.getElementById('currentCategoryId');
    console.log(currentCategoryId, 'currentCategoryId')
    getItems(currentCategoryId.value)
        .then(data=>{
            console.log(data, 'data')
            const filteredData = data.filter(filterDate);
            console.log(filteredData, 'filtered data')
            return filteredData
        }).then(filteredData=>{
            filteredData.length > 0 ? rowCol.innerHTML = '' : rowCol.innerHTML = '<h1>Записи, подходящие под запрос, отсутствуют.</h1>'
            filteredData.sort(byField('date'));
            filteredData.forEach(item => displayCard(rowCol, item))
        }).catch((e)=>{
            rowCol.innerHTML = `Ошибка запроса`;
        })
  })

    const rofl = document.querySelector('#rofl');
  rofl.addEventListener('click', ()=>{
      const buttons = document.querySelectorAll('.category');
      buttons.forEach(button=>button.addEventListener('mouseenter', ()=>{
            button.classList.toggle('rofl');
            let sound = document.getElementById("Sound");
            sound.play();
        }))
  })
}

