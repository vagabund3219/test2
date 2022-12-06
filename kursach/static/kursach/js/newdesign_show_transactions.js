import {url, transApiUrl, checkApiUrl, fetchReq, TypeOfTransactionApiList} from "./requests.js"
import {byField} from './custom_format_for_date.js';


const lastTransactionsUl = document.querySelector('.footer_right_ul');

export async function getAllTransaction(){
    const check = await fetch(`${url}${checkApiUrl}`);
    const trans = await fetch(`${url}${transApiUrl}`);
    let lst = await check.json();
    let trans1 = await trans.json();
    trans1.forEach(item => lst.push(item));
    return lst
}

export async function displayTransactions(categoryId){
    const listOfTransactions = await showTransactionsForCategory(+categoryId);
    listOfTransactions.sort(byField('date'));

    const mainContainer = document.querySelector('.transactions-container');
    // const mainContainer = document.querySelector('.main_content_container');
    const containerForTransactions = document.createElement('div');
    containerForTransactions.classList.add('row');
    mainContainer.append(containerForTransactions);


    listOfTransactions.forEach(transaction => {
        displayCard(containerForTransactions, transaction)
    })

    const headerTitle = document.querySelector('.header_title');
    headerTitle.textContent = 'Транзакции'

}

async function showTransactionsForCategory(categoryId){
    const check = await fetch(`${url}${checkApiUrl}?category_id=${categoryId}`);
    const trans = await fetch(`${url}${transApiUrl}?category_id=${categoryId}`);
    let lst = await check.json();
    let trans1 = await trans.json();
    trans1.forEach(item => lst.push(item));
    return lst
}


export async function showLastTransactions(){
        const transactions = await getAllTransaction();
        lastTransactionsUl.innerHTML = '';
        if (transactions.length>0){
            transactions.sort(byField('date'));
            let i = 0
            while (i<4){
                const li = `                                
                            <li class="footer_right_li">
                                <div class="footer_cart">
                                    <i class="bi bi-cart2"></i>
                                </div>
                                <div class="footer_right_li_right">
                                    <div class="footer_right_top">
                                        <div class="footer_right_name">${transactions[i]['name'].substring(0, 16)}</div>
                                        <div class="footer_right_sum">${transactions[i]['price']}</div>
                                    </div>
                                    <div class="footer_right_time">${(transactions[i]['date'])}</div>
                                </div>
                            </li>`
                lastTransactionsUl.innerHTML += li;
                i++;
            }
        }else{
            lastTransactionsUl.innerHTML += `<h4 id="lastTransNone">У вас нет транзакций</h4>`;
            }
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
  }

  //Отображение
  function displayCard(container, item){
    let div = document.createElement('div');
    div.classList.add('card', 'col-3');
    div.id = item.id;
    let ul = document.createElement('ul');
    ul.classList.add('list-group', 'list-group-flush');
    createCard(item, ul);
    div.append(ul);
    container.append(div);
  }