import {Chart, registerables} from './chart.js/dist/chart.js'
Chart.register(...registerables);

import {fetchReq, transApiUrl, CategoriesApiList, checkApiUrl} from "./requests.js";



export async function donutCategoriesDiagram(){
  const donutCategories = document.createElement('div');
  donutCategories.classList.add('donut-categories-diagram')
  const canvas = document.createElement('canvas');
  canvas.id = 'myChart'
    // donutCategories.innerHTML = `<canvas id="myChart" width="100" height="100"></canvas>`
  // donutCategories.classList.add('donut-categories-diagram');

donutCategories.append(canvas)
  const mainContentContainer = document.querySelector('.main_content_container');
  mainContentContainer.append(donutCategories);



  async function getCategories(){
          const categories = await fetchReq(CategoriesApiList, '')
          // console.log(categories)
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
                    // console.log(item, 'item')
                    arr.forEach(arr=>{
                        // console.log(arr, 'arr item')
                        if (arr.id===item.category){
                            arr.count += 1;
                        }else{
                            console.log('....')
                        }
                    })
                })
                // console.log(arr)
                return arr
        }



  (async function() {
  // const data = [
  //   { year: 2010, count: 10 },
  //   { year: 2011, count: 20 },
  //   { year: 2012, count: 15 },
  //   { year: 2013, count: 25 },
  //   { year: 2014, count: 22 },
  //   { year: 2015, count: 30 },
  //   { year: 2016, count: 28 },
  // ];
    const data = await getItems()
      const dat = data.filter(dat=>dat.count>0)
      console.log(dat)
    console.log(data)

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
})();






}