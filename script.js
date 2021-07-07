
google.charts.load('current', {
    'packages':['geochart'],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    'mapsApiKey': 'AIzaSyAicUJMDGxg1fEo1GRcNo3fGZhtf25rQGw'
  });
  google.charts.setOnLoadCallback(drawRegionsMap);

  function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable([
      ['Country'],
      ['Germany'],
      ['United States'],
      ['Brazil'],
      ['Canada'],
      ['France'],
      ['Russia']
    ])
    var options = {
      backgroundColor: 'blue'
        
    };

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    google.visualization.events.addListener(chart, 'select', chartSelectedHandler)

    function chartSelectedHandler(event) {
        console.log(chart.getSelection());
        selection = chart.getSelection();

        countryrow = selection[0].row;
        console.log(countryrow);
        console.log(data.getValue(countryrow, 0));

    }

    chart.draw(data, options);
  }
