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
      backgroundColor: 'none'
        
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




function getcountryTopChart() {
  var nusixCall = `https://api.musixmatch.com/ws/1.1/chart.tracks.get?apikey=${config.NusicApiKey}&chart_name=top&page=1&page_size=25&country=it&f_has_lyrics=1`

  fetch(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?apikey=a796737fb3bafc9bde347d07ad7780c1&chart_name=top&page=1&page_size=25&country=it&f_has_lyrics=1`)
  .then(response => response.json())
  .then(function(data) {
    var tracklist = data.message.body.track_list
    console.log(tracklist);
    console.log(tracklist[0].track);
   
    var list = $('<ul>');
    var li = $('<li>', {
      text: `${tracklist[0].track.track_name}`
    });

    list.append(li);
    main.append(list)
  })

}
getcountryTopChart();



