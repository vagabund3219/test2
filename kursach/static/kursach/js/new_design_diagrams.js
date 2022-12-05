import {Chart, registerables} from './chart.js/dist/chart.js'
Chart.register(...registerables);

export async function donutCategoriesDiagram(){
  const donutCategories = document.createElement('div');
  donutCategories.classList.add('donut-categories-diagram');
  donutCategories.innerHTML = `<canvas id="myChart" width="400" height="400"></canvas>`
  const mainContentContainer = document.querySelector('.main_content_container');
  mainContentContainer.append(donutCategories);


  (async function() {
  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  new Chart(
    document.getElementById('myChart'),
    {
      type: 'bar',
      data: {
        labels: data.map(row => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data.map(row => row.count)
          }
        ]
      }
    }
  );
})();






}