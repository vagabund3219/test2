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
  const addNewTransBtn = document.querySelector('#add-transaction-btn');
  const addNewTransBtnSide = document.querySelector('#add-new-transaction');
  const asideCategories = document.querySelector('#aside-categories');
  const asideCategoriesReturn = document.querySelector('#aside-categories-return');
  const form = document.querySelector('#add-transaction');

  const rangepicker = new DateRangePicker(rangePicker, {
      format: 'dd.mm.yyyy',
      language: 'ru'
    });

  function hideFields(listOfFields){
      listOfFields.forEach(field=>field.classList.toggle('hidden'));
  }


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
  async function createCard(item, ul){
      let type;
      let date = new Date(Date.parse(item.date));
      await getTypeTrans(item.type).then(data=>type=data)
      ul.innerHTML =
`            <li class="list-group-item card-row">
                <span class="label">Имя транзакции</span>
                <span class="value">${item.name.slice(0, 13)}</span>
            </li>
            <li class="list-group-item card-row">
                <span class="label">Кто добавил</span>
                <span class="value">${item.username}</span>
            </li>
            <li class="list-group-item card-row">
                <span class="label">Тип</span>
                <span class="value">${type}</span>
            </li>
<!--            // <li class="list-group-item"><span class="label">Количество</span></li> -->
            <li class="list-group-item card-row">
                <span class="label">Сумма</span>
                <span class="value">${item.price}</span>
            </li>
            <li class="list-group-item card-row">
                <span class="label">Дата</span>
                <span class="value">${date.customFormat('#D# #MMM# #YYYY#')}</span>
            </li>`

      // getTypeTrans(item.type).then(data=>{document.getElementById('typeCard').innerHTML += data})
    // Object.entries(item).forEach(async ([key, value])=>{
    //
    //     // if (key == 'date'){
    //     //   let date = new Date(Date.parse(value));
    //     //   ul.innerHTML += `<li class="list-group-item">${date.customFormat( "#DD#.#MM#.#YYYY#" )}</li>`;
    //     // }else if (key == 'category'){
    //     //   await getNameCategory(value).then(data=>ul.innerHTML += `<li class="list-group-item">${data}</li>`);
    //     // } else if(key == 'type'){
    //     //   await getTypeTrans(value).then(data=>ul.innerHTML += `<li class="list-group-item">${data}</li>`)
    //     // }
    //     // else{
    //     //   ul.innerHTML += `<li class="list-group-item">${value}</li>`;
    //     // }
    // });
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
      const ol  = document.createElement('ol');
      ol.classList.add('articles')
    let response = await func;
    await response.forEach(category=>{
      // row.innerHTML += `<button class="category" id=${category['id']}>${category['name']}</button>`
               ol.innerHTML += `<li class='articles__article' style="--animation-order: 1;">
                            <a href="#" class="articles__link" id=${category['id']} >
                                <div class="articles__content articles__content--lhs">
                                    <h2 class="articles__title">${category.name}</h2>
                                </div>
                                <div class="articles__content articles__content--rhs" aria-hidden="true">
                                    <h2 class="articles__title">${category.name}</h2>
                                </div>
                            </a>
                        </li>
`
        row.append(ol);
    })
    // const buttons = document.querySelectorAll('.category');
    const buttons = document.querySelectorAll('.articles__link');
    buttons.forEach(button => button.addEventListener('click', ()=>{
        hideFields([asideCategories, aside]);
        button.classList.add('.category')
        container.innerHTML += `<input type="hidden" id='currentCategoryId' value=${button.id} />`
        categoryName.textContent = `${document.querySelector('.articles__title').textContent}`;
        // rowCol.innerHTML = '';
        row.innerHTML = '';
        getItems(+button.id)
          .then(data =>{
                returnBtn(func);
                if (data.length){
                  data.sort(byField('date'));
                  data.forEach(item => displayCard(row, item))
                }else{
                  let h2 = document.createElement('h2')
                  h2.innerHTML = '<h2>У вас нет записей в этой категории</h2>'
                  row.append(h2);
            }
          })
    }))
  }

  asideCategoriesReturn.addEventListener('click', ()=>{
      const forItemsContainer = document.querySelector('.for-items');
      // form.classList.contains('hidden') ? {} : form.classList.toggle('hidden')
      // forItemsContainer.classList.contains('hidden') ? {} : form.classList.toggle('hidden')
      const buttons = document.querySelectorAll('.category');
      buttons.forEach(button => button.classList.remove('hidden'))
      form.classList.remove('add-transaction-form');
      form.classList.add('hidden');
      forItemsContainer.classList.remove('hidden');
      addNewTransBtnSide.disabled = false;
      addNewTransBtn.disabled = false;
      submitFilterBtn.disabled = false;



      const categorie = document.querySelectorAll('.articles__article');
      categorie.forEach(button => button.classList.remove('hidden'))
  })

  function returnBtn (func){
      returnButton.addEventListener('click', ()=>{
          const forItemsContainer = document.querySelector('.for-items');
          const ul = document.querySelector('.list-group-flush');


          forItemsContainer.classList.remove('hidden');
          form.classList.remove('add-transaction-form');
          form.classList.add('hidden');
          addNewTransBtnSide.disabled = false;
          addNewTransBtn.disabled = false;
          submitFilterBtn.disabled = false;
          document.getElementById('currentCategoryId').remove();
          hideFields([asideCategories, aside])



          ul ? ul.innerHTML = '' : {}
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
    getItems(currentCategoryId.value)
        .then(data=>{
            const filteredData = data.filter(filterDate);
            return filteredData
        }).then(filteredData=>{
            filteredData.length > 0 ? row.innerHTML = '' : row.innerHTML = '<h1>Записи, подходящие под запрос, отсутствуют.</h1>'
            filteredData.sort(byField('date'));
            filteredData.forEach(item => displayCard(row, item))
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

