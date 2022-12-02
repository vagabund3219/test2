import {fetchReq} from "./requests.js";
import {transApiUrl, CategoriesApiList, checkApiUrl} from "./list_of_trans.js";

google.charts.load('current', {'packages':['corechart']});

      google.charts.setOnLoadCallback(drawChart);


 async function getCategories(){
          const categories = await fetchReq(CategoriesApiList, '')
          console.log(categories)
          let arr = []
          categories.forEach(category=>{
              arr.push({
                  name:category.name,
                  count:0,
                  id:category.id
              })
          })
          // console.log(arr)
          return arr
      }



        async function getItems(){
                let dat = []
                await fetchReq(transApiUrl, '').then(data=>data.forEach(item=>dat.push(item)))
                await fetchReq(checkApiUrl, '').then(data=>data.forEach(item=>dat.push(item)))
                // console.log(dat)
                let arr = await getCategories()
                dat.forEach(item => {
                    console.log(item, 'item')
                    arr.forEach(arr=>{
                        console.log(arr, 'arr item')
                        if (arr.id===item.category){
                            arr.count += 1;
                        }else{
                            console.log('....')
                        }
                    })
                })
                console.log(arr)
                return arr
        }




      async function drawChart() {
        let data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        const categories = await getItems()
          let arra = []
        for (const [index, element] of categories.entries()) {
            arra.push([element.name, element.count])
          console.log(index, element);
        }
        data.addRows(arra);

        let options = {'title':'Категории',
                       'width':450,
                       'height':300};


        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }