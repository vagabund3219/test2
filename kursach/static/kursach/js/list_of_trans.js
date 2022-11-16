
Date.prototype.customFormat = function(formatString){
  var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
  YY = ((YYYY=this.getFullYear())+"").slice(-2);
  MM = (M=this.getMonth()+1)<10?('0'+M):M;
  MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
  DD = (D=this.getDate())<10?('0'+D):D;
  DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()]).substring(0,3);
  th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
  formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);
  h=(hhh=this.getHours());
  if (h==0) h=24;
  if (h>12) h-=12;
  hh = h<10?('0'+h):h;
  hhhh = hhh<10?('0'+hhh):hhh;
  AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
  mm=(m=this.getMinutes())<10?('0'+m):m;
  ss=(s=this.getSeconds())<10?('0'+s):s;
  return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
};



window.onload = (event) => {
  const row = document.querySelector('.row');
  const url = 'http://127.0.0.1:8000/api/v1/';
  const checkApiUrl = 'CheckApiList';
  const transApiUrl = 'TransactionsApiList';

  async function getItems(category){
    let check = await fetch(`${url}${checkApiUrl}?check_category_id=${category}`);
    let trans = await fetch(`${url}${transApiUrl}?item_category_id=${category}`);
    let lst = [];
    lst = await check.json();
    trans1 = await trans.json();
    trans1.forEach(item => lst.push(item));
    return lst
  }

  async function categoryDisplay(func) {
    response = await func;
    await response.forEach(category=>{
      row.innerHTML += `<button class="category" id=${category['id']} style='width: 130px; height: 130px; border-radius:100%; margin-left: 30px;'>${category['category_name']}</button>`
    })
    const buttons = document.querySelectorAll('.category');
    buttons.forEach(button => button.addEventListener('click', ()=>{
      row.innerHTML = ''
      getItems(+button.id)
          .then(data =>{
            data.forEach(item => {

            })
          })
    }))
  }


  async function getCategories() {
    let categories = await fetch(`${url}CategoriesApiList`);
    if (categories.ok == true && categories.status < 300){
      return await categories.json();
    } else{
      console.log('Что-то не так с категориями');
    }
  }

  categoryDisplay(getCategories());

}

// const elem = document.querySelector('.row');
// function byField(field) {
//   return (a, b) => a[field] < b[field] ? 1 : -1;
// }
//
// function get_category(arr, id, name) {
//     for (item of arr) {
//         if (item['id'] == id) {
//             return item[name]
//         }
//     }
// }
//
// function get_type_trans(arr, id, name) {
//     for (item of arr) {
//         if (item['id'] == id ) {
//             return item[name]
//         }
//     }
// }
//
//
// async function req () {
//     const trans = await fetch('http://127.0.0.1:8000/api/v1/transactions_list');
//     const check = await fetch('http://127.0.0.1:8000/api/v1/CheckApiList');
//     const typesOfTransactions = await fetch('http://127.0.0.1:8000/api/v1/TypeOfTransactionApiList');
//     const categories = await fetch('http://127.0.0.1:8000/api/v1/CategoriesApiList');
//     let data = await trans.json();
//     for (item of await check.json()){
//         data.push(item);
//     }
//
//     data.push(await typesOfTransactions.json())
//     data.push(await categories.json())
//     return data
// }
//
//
//
// req().then((data) => {
//         data.sort(byField('date'));
//         for (let item of data){
//             if (Array.isArray(item) && item[0]['category_name']){
//                 for (let i of item) {
//                     console.log(i)
//                     elem.innerHTML += `<button class="rounded-circle" id="${i['id']}" style="height: 120px; width: 120px; margin-left: 40px; background-color: #00d1b2;">${i['category_name']}</button>`
//                 }
//             }
//
//             // if(!Array.isArray(item)){
//             //     date = new Date(Date.parse(item['date']));
//                 if (!item['check_count']){
//                 elem.innerHTML += `<div class="card" style="width: 18rem; margin: 15px 20px 0 0;">
//                               <ul class="list-group list-group-flush">
//                                   <li class="list-group-item">${item['item_name']}</li>
//                                   <li class="list-group-item">${get_category(data[0], item['item_category'], 'category_name')}</li>
//                                 <li class="list-group-item">${item['item_price']}</li>
//                                   <li class="list-group-item">${get_type_trans(data[1], item['item_type'], 'type_name')}</li>
//                                    <li class="list-group-item">${date.customFormat( "#DD#.#MM#.#YYYY#" )}</li>
//                               </ul>
//                             </div>`
//             // } else{
//             //     elem.innerHTML += `<div class="card" style="width: 18rem; margin: 15px 20px 0 0;">
//             //                           <ul class="list-group list-group-flush">
//             //                               <li class="list-group-item">${item['check_name']}</li>
//             //                               <li class="list-group-item">${item['check_count']}</li>
//             //                               <li class="list-group-item">${get_category(data[0], item['check_category'], 'category_name')}</li>
//             //                             <li class="list-group-item">${item['check_price']}</li>
//             //                                <li class="list-group-item">${date.customFormat( "#DD#.#MM#.#YYYY#" )}</li>
//             //                           </ul>
//             //                         </div>`
//             //     }
//             // }
//         }
//         const buttons = elem.querySelectorAll('.rounded-circle');
//         console.log(buttons)
//
//         buttons.forEach((btn)=>{
//             btn.addEventListener('click', ()=>{
//                   console.log('11111')
//                 async function da(){
//                     console.log('22222')
//                                   const tr = await fetch(`http://127.0.0.1:8000/api/v1/transactions_list?item_category_id_id=${+btn.id}`);
//                     const ch = await fetch(`http://127.0.0.1:8000/api/v1/CheckApiList?check_category_id_id=${+btn.id}`);
//                     // console.log(btn.id)
//                     lst = await ch.json();
//                     lst.push(...await tr.json());
//
//                     console.log('11111111111111111111111111111111111111111111111111111')
//                     for (item of lst){
//                         if(!Array.isArray(item)){
//                         date = new Date(Date.parse(item['date']));
//                         console.log(item)
//                         if (!item['check_count']){
//                         elem.innerHTML += `<div class="card" style="width: 18rem; margin: 15px 20px 0 0;">
//                                       <ul class="list-group list-group-flush">
//                                           <li class="list-group-item">${item['item_name']}</li>
//                                           <li class="list-group-item">${get_category(data[0], item['item_category'], 'category_name')}</li>
//                                         <li class="list-group-item">${item['item_price']}</li>
//                                           <li class="list-group-item">${get_type_trans(data[1], item['item_type'], 'type_name')}</li>
//                                            <li class="list-group-item">${item['date']}</li>
//                                       </ul>
//                                     </div>`
//                     } else{
//                         elem.innerHTML += `<div class="card" style="width: 18rem; margin: 15px 20px 0 0;">
//                                               <ul class="list-group list-group-flush">
//                                                   <li class="list-group-item">${item['check_name']}</li>
//                                                   <li class="list-group-item">${item['check_count']}</li>
//                                                   <li class="list-group-item">${get_category(data[0], item['check_category'], 'category_name')}</li>
//                                                 <li class="list-group-item">${item['check_price']}</li>
//                                                    <li class="list-group-item">${date.customFormat( "#DD#.#MM#.#YYYY#" )}</li>
//                                               </ul>
//                                             </div>`
//                         }
//                     }
//                     }
//                 }
//
//             })
//         })
// });
