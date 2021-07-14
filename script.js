google.charts.load('current', {
  'packages':['geochart'],
  // Note: you will need to get a mapsApiKey for your project.
  // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
  'mapsApiKey': `${config.mapsApiKey}`
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
    ['Russia'],
    ['Peru'],
    ['Japan'],
    ['Ghana'],
    ['South Korea'],
    ['China'],
    ['Greenland'],
    ['Spaine'],
    ['Egypt'],
    ['Australia'],
    ['New Zealand'],
    ['Ivory Coast'],
    ['South Africa'],
    ['Madagascar'],
    ['India']
  ]);
  var options = {
    backgroundColor: 'none',
    datalessRegionColor: 'black',
        
  };


  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

  google.visualization.events.addListener(chart, 'select', chartSelectedHandler)

  function chartSelectedHandler(event) {
    selection = chart.getSelection();
    country = data.getValue(selection[0].row, 0);
    getCountryCode(country);
  }

  chart.draw(data, options);
}

function getcountryTopChart(countryCode) {
  fetch(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?apikey=${config.NusicApiKey}&chart_name=top&page=1&page_size=25&country=${countryCode}&f_has_lyrics=1`)

  .then(response => response.json())
  .then(function(data) {
    var tracklist = data.message.body.track_list
    console.log(tracklist);
    console.log(tracklist[0].track);
    appendMusicInfo(country, tracklist);
  })
}


function getArtistInfo(event) {
  
  event.preventDefault();
  event.stopPropagation();
  var artist = $('#artistName').val();
  console.log(artist);
  fetch(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?apikey=${config.NusicApiKey}&q_artist=${artist}&page_size=10&page=1&s_track_rating=desc`)
  .then(response => response.json())
  .then(function(data) {
    var tracklist = data.message.body.track_list
    appendMusicInfo(tracklist);
  })
}

function getCountryCode(country) {
  var codes = {
    'Germany': 'DE',
    'United States': 'US',
    'Brazil': 'BR',
    'Canada': 'CA',
    'France': 'FR',
    'Russia': 'RU',
    'Peru': 'PE',
    'Japan': 'JP',
    'Ghana': 'GH',
    'South Korea': 'KR' ,
    'China': 'CN',
    'Greenland': 'GL',
    'Spain': 'ES' ,
    'Egypt': 'EG',
    'Australia': 'AU',
    'New Zealand': 'NZ',
    'Ivory Coast': 'CI',
    'South Africa': 'ZA',
    'Madagascar': 'MG',
    'India': 'IN'

  }
  getcountryTopChart(codes[country], country);
}



//take information from API call and return track name, album, and country name at top of modal
function appendMusicInfo(tracklist, country) {
    

  var list = $('<ul>');
  let div = $("#results")
  div.children().remove();
 var countryName = $('<h1>', {
   text: `Top 25 Tracks: ${country}`,
   class: "results-header"
 });


 div.append(countryName);



  // a for loop to get the entire list of 25 top tracks
  for (let i = 0; i < tracklist.length; i++) {
    var li = $('<li>', {
      text: `Track Name: ${tracklist[i].track.track_name} | Artist Name: ${tracklist[i].track.artist_name} | Album Name: ${tracklist[i].track.album_name}`,
      class: "uk-align-center"
    });

    list.append(li);
    console.log(li);
  } 
  div.append(list); 
}

$('#searchButton').on("click", getArtistInfo);

