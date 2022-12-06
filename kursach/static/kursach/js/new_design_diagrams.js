import {Chart, registerables} from './chart.js/dist/chart.js'
Chart.register(...registerables);

import {fetchReq, transApiUrl, CategoriesApiList, checkApiUrl} from "./requests.js";
import {byField} from './custom_format_for_date.js'
import Datepicker from "./vanillajs-datepicker/js/Datepicker.js";
import ru from './vanillajs-datepicker/js/i18n/locales/ru.js';

Object.assign(Datepicker.locales, ru)


async function fullDiagrams(){

}






export async function donutCategoriesDiagram(){
  const donutCategories = document.createElement('div');
  donutCategories.classList.add('donut-categories-diagram')
  const canvas = document.createElement('canvas');
  canvas.id = 'myChart'

    donutCategories.append(canvas)
      const mainContentContainer = document.querySelector('.main_content_container');
      mainContentContainer.append(donutCategories);
    createPieDiagram()}


async function getCategories(){
      const categories = await fetchReq(CategoriesApiList, '')
      let arr = []
      categories.forEach(category=>{
          arr.push({
              name:category.name,
              count:0,
              id:category.id
          })
      })
      return arr
  }

async function getItems(){
        let dat = []
        await fetchReq(transApiUrl, '').then(data=>data.forEach(item=>dat.push(item)))
        await fetchReq(checkApiUrl, '').then(data=>data.forEach(item=>dat.push(item)))
        let arr = await getCategories()
        dat.forEach(item => {
            arr.forEach(arr=>{
                if (arr.id===item.category){
                    arr.count += 1;
                }else{
                    console.log('....')
                }
            })
        })
        return arr
}



async function createPieDiagram() {
    const data = await getItems()
      const dat = data.filter(dat=>dat.count>0)
  new Chart(
    document.getElementById('myChart'),
    {
      type: 'pie',
      data: {
        labels: dat.map(row => row.name),
        datasets: [
          {
            label: 'Траты по категориям',
            data: dat.map(row => row.count)
          }
        ]
      }
    }
  );
};

export async function barDiagram(){
    const barCategories = document.createElement('div');
    barCategories.innerHTML = `<div class="barChoosingDate">
                                    <div class="bar_title">Статистика</div>
                                    <div id="barChoosingDateId">
                                           <select type="text" id="monthBar" autocomplete="off" class="form-control" required>
                                               <option value="0">Январь</option>
                                               <option value="1">Февраль</option>
                                               <option value="2">Март</option>
                                               <option value="3">Апрель</option>
                                               <option value="4">Май</option>
                                               <option value="5">Июнь</option>
                                               <option value="6">Июль</option>
                                               <option value="7">Август</option>
                                               <option value="8">Сентябрь</option>
                                               <option value="9">Октябрь</option>
                                               <option value="10">Ноябрь</option>
                                               <option value="11">Декабрь</option>
                                            </select>
                                    </div>
                                </div>`
    barCategories.classList.add('bar-categories-diagram')


    const mainContentContainer = document.querySelector('.main_content_container');
    mainContentContainer.append(barCategories);




    const date = new Date;
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    createBarDiagram(currentMonth, currentYear)

    const dateElem = document.getElementById('monthBar');
    dateElem.addEventListener('change', (event)=>{
        createBarDiagram(event.target.value, currentYear)
    })
}
 async function createBarDiagram(Month, currentYear){
    const data = await getItemsForBarDiagram(+Month, +currentYear)

     document.querySelector('.bar-diagram') ?  document.querySelector('.bar-diagram').remove() : {}

     const barDiagram = document.createElement('div');
    barDiagram.classList = 'bar-diagram'

    const canvas = document.createElement('canvas');
    canvas.id = 'barDiagram'



    const barCategories = document.querySelector('.bar-categories-diagram');
    barCategories.append(barDiagram)


    barDiagram.append(canvas)
  new Chart(
    document.getElementById('barDiagram'),
    {



      type: 'bar',
      data: {
        // labels: data.map(row => row[0]),
        labels: data.map(row => {
            if (+row[0]<0){
                console.log(+row[0])
                return new Date(`${+row[0]+13}-01-2021`).customFormat('#MMM#  #YYYY#')
            }else{
                return new Date(`${+row[0]+1}-01-2022`).customFormat('#MMM#  #YYYY#')
            }
        }),
        datasets: [
          {
            label: 'Доходы',
            data: data.map(row => row[1][0])
          },
          {
            label: 'Расходы',
            data: data.map(row => row[1][1])
          }
        ]
      }
    }
  );
}

async function getItemsForBarDiagram(currentMonth, currentYear){
        let dat = [];
        await fetchReq(transApiUrl, '').then(data=>data.forEach(item=>dat.push(item)));
        await fetchReq(checkApiUrl, '').then(data=>data.forEach(item=>dat.push(item)));
        // debugger

        //
        const lastSixMonths = {
        //     [currentMonth]: [0, 0],
        //     [currentMonth-1]: [0, 0],
        //     [currentMonth-2]: [0, 0],
        //     [currentMonth-3]: [0, 0],
        //     [currentMonth-4]: [0, 0],
        //     [currentMonth-5]: [0, 0],
        }

        let i = 0
        while (i < 6){
            if (currentMonth-i<0){
                console.log(1)
                lastSixMonths[12+currentMonth-i] = [0, 0]
            }else{
                lastSixMonths[currentMonth-i] = [0, 0]
            }

            i++
        }
        console.log(lastSixMonths, 'lastSixMonths')
        //
        // const filteredData = dat.filter(item=>{
        //     const itemMonth = new Date(item.date).getMonth()
        //     const itemYear = new Date(item.date).getFullYear()
        //     let i = 0
        //     while (i<6){
        //         if (currentMonth-i<0){
        //             if (itemMonth==currentMonth-i+12 && itemYear==2021){
        //                 return true
        //             }
        //         }else{
        //             if (itemMonth==currentMonth-i && itemYear==currentYear){
        //                 return true
        //             }
        //         }
        //         i++
        //     }
        //     return false
        // })

        const filteredData = dat.filter(item=>{
            const itemMonth = new Date(item.date).getMonth()
            const itemYear = new Date(item.date).getFullYear()
            let i = 0
            while (i<6){
                if (currentMonth-i<0){
                    if (itemMonth==currentMonth-i+12){
                        return true
                    }
                }else{
                    if (itemMonth==currentMonth-i){
                        return true
                    }
                }
                i++
            }
            return false
        })



        filteredData.sort(byField('date'))
        console.log(filteredData, 'filtered')
        filteredData.forEach(item => {
            const itemMonth = new Date(item.date).getMonth()
            if (item.type === 1){
                lastSixMonths[itemMonth][1] += item.price;
            }else{
                lastSixMonths[itemMonth][0] += item.price;
            }
        })
        return Object.entries(lastSixMonths)
}






