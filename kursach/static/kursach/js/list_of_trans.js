
const elem = document.querySelector('.row');
console.log(elem);

function byField(field) {
  return (a, b) => a[field] < b[field] ? 1 : -1;
}

function get_category(arr, id, name) {
    for (item of arr) {
        if (item['id'] == id ) {
            // console.log('sucsees')
            return item[name]
        }
    }
}

function get_type_trans(arr, id, name) {
    for (item of arr) {
        console.log(item)
        if (item['id'] == id ) {
            return item[name]
        }
    }
}


async function req () {
    const trans = await fetch('http://127.0.0.1:8000/api/v1/transactions_list');
    const check = await fetch('http://127.0.0.1:8000/api/v1/CheckApiList');
    const typesOfTransactions = await fetch('http://127.0.0.1:8000/api/v1/TypeOfTransactionApiList');
    const categories = await fetch('http://127.0.0.1:8000/api/v1/CategoriesApiList');
    let data = await trans.json();
    for (item of await check.json()){
        data.push(item);
    }
    data.push(await typesOfTransactions.json())
    data.push(await categories.json())
    console.log(data)
    return data
}

req().then((data) => {
        data.sort(byField('date'));
        for (let item of data){
            if(!Array.isArray(item)){
                if (!item['check_count']){
                elem.innerHTML += `<div class="card" style="width: 18rem; margin: 15px 20px 0 0;">
                              <ul class="list-group list-group-flush">
                                  <li class="list-group-item">${item['item_name']}</li>
                                  <li class="list-group-item">${get_category(data[0], item['item_category_id'], 'category_name')}</li>
                                <li class="list-group-item">${item['item_price']}</li>
                                  <li class="list-group-item">${get_type_trans(data[1], item['item_type_id'], 'type_name')}</li>
                                   <li class="list-group-item">${item['date']}</li>
                              </ul>
                            </div>`
            } else{
                elem.innerHTML += `<div class="card" style="width: 18rem; margin: 15px 20px 0 0;">
                                      <ul class="list-group list-group-flush">
                                          <li class="list-group-item">${item['check_name']}</li>
                                          <li class="list-group-item">${item['check_count']}</li>
                                          <li class="list-group-item">${get_category(data[0], item['check_category_id'], 'category_name')}</li>
                                        <li class="list-group-item">${item['check_price']}</li>
                                           <li class="list-group-item">${item['date']}</li>
                                      </ul>
                                    </div>`
                }
            }
        }
});














