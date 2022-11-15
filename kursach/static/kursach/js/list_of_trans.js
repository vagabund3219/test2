
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

const elem = document.querySelector('.row');


function byField(field) {
  return (a, b) => a[field] < b[field] ? 1 : -1;
}

function get_category(arr, id, name) {
    for (item of arr) {
        if (item['id'] == id ) {
            return item[name]
        }
    }
}

function get_type_trans(arr, id, name) {
    for (item of arr) {
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
    return data
}

req().then((data) => {
        data.sort(byField('date'));
        for (let item of data){
            // if (Array.isArray(item)){
            //     if (item['category_name']){
            //
            //     }
            // }

            if(!Array.isArray(item)){
                date = new Date(Date.parse(item['date']));

                if (!item['check_count']){
                elem.innerHTML += `<div class="card" style="width: 18rem; margin: 15px 20px 0 0;">
                              <ul class="list-group list-group-flush">
                                  <li class="list-group-item">${item['item_name']}</li>
                                  <li class="list-group-item">${get_category(data[0], item['item_category_id'], 'category_name')}</li>
                                <li class="list-group-item">${item['item_price']}</li>
                                  <li class="list-group-item">${get_type_trans(data[1], item['item_type_id'], 'type_name')}</li>
                                   <li class="list-group-item">${date.customFormat( "#DD#.#MM#.#YYYY#" )}</li>
                              </ul>
                            </div>`
            } else{
                elem.innerHTML += `<div class="card" style="width: 18rem; margin: 15px 20px 0 0;">
                                      <ul class="list-group list-group-flush">
                                          <li class="list-group-item">${item['check_name']}</li>
                                          <li class="list-group-item">${item['check_count']}</li>
                                          <li class="list-group-item">${get_category(data[0], item['check_category_id'], 'category_name')}</li>
                                        <li class="list-group-item">${item['check_price']}</li>
                                           <li class="list-group-item">${date.customFormat( "#DD#.#MM#.#YYYY#" )}</li>
                                      </ul>
                                    </div>`
                }
            }
        }
});