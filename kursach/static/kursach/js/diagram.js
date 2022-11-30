import {fetchReq} from "./requests.js";
import {transApiUrl, CategoriesApiList, checkApiUrl} from "./list_of_trans.js";

google.charts.load('current', {'packages':['corechart']});

      google.charts.setOnLoadCallback(drawChart);


        async function func(){
                let dat = []
                const trans = await fetchReq(transApiUrl, '').then(data=>data.forEach(item=>dat.push(item)))
                const check = await fetchReq(checkApiUrl, '').then(data=>data.forEach(item=>dat.push(item)))
                dat.push(trans)
                console.log(dat)
        }
        func()

      function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Mushrooms', 3],
          ['Onions', 1],
          ['Olives', 1],
          ['Zucchini', 5],
          ['Pepperoni', 2]
        ]);

        // Set chart options
        var options = {'title':'How Much Pizza I Ate Last Night',
                       'width':400,
                       'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }