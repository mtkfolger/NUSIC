google.charts.load('current', {
  'packages': ['geochart'],
  // Note: you will need to get a mapsApiKey for your project.
  // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
  'mapsApiKey': `${config.mapsApiKey}`
});

google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
  var data = google.visualization.arrayToDataTable([
    ['Country'],
    ["Afghanistan"],
    ["Albania"],
    ["Algeria"],
    ["American Samoa"],
    ["Andorra"],
    ["Angola"],
    ["Anguilla"],
    ["Antarctica"],
    ["Antigua & Barbuda"],
    ["Argentina"],
    ["Armenia"],
    ["Aruba"],
    ["Australia"],
    ["Austria"],
    ["Azerbaijan"],
    ["Bahamas"],
    ["Bahrain"],
    ["Bangladesh"],
    ["Barbados"],
    ["Belarus"],
    ["Belgium"],
    ["Belize"],
    ["Benin"],
    ["Bermuda"],
    ["Bhutan"],
    ["Bolivia"],
    ["Bosnia & Herzegovina"],
    ["Botswana"],
    ["Bouvet Island"],
    ["Brazil"],
    ["British Indian Ocean Territory"],
    ["Brunei Darussalam"],
    ["Bulgaria"],
    ["Burkina Faso"],
    ["Burundi"],
    ["Cambodia"],
    ["Cameroon"],
    ["Canada"],
    ["Cape Verde"],
    ["Cayman Islands"],
    ["Central African Republic"],
    ["Chad"],
    ["Chile"],
    ["China"],
    ["Christmas Island"],
    ["Cocos (Keeling) Islands"],
    ["Colombia"],
    ["Comoros"],
    ["Congo"],
    ["Congo, The Democratic Republic of the"],
    ["Cook Islands"],
    ["Costa Rica"],
    ["Ivory Coast"],
    ["Croatia"],
    ["Cuba"],
    ["Cyprus"],
    ["Czech Republic"],
    ["Denmark"],
    ["Djibouti"],
    ["Dominica"],
    ["Dominican Republic"],
    ["Ecuador"],
    ["Egypt"],
    ["El Salvador"],
    ["Equatorial Guinea"],
    ["Eritrea"],
    ["Estonia"],
    ["Ethiopia"],
    ["Falkland Islands (Malvinas)"],
    ["Faroe Islands"],
    ["Fiji"],
    ["Finland"],
    ["France"],
    ["French Southern Territories"],
    ["Gabon"],
    ["Gambia"],
    ["Georgia"],
    ["Germany"],
    ["Ghana"],
    ["Gibraltar"],
    ["Greece"],
    ["Greenland"],
    ["Grenada"],
    ["Guadeloupe"],
    ["Guam"],
    ["Guatemala"],
    ["Guinea"],
    ["Guinea-Bissau"],
    ["Guyana"],
    ["Haiti"],
    ["Heard Island and Mcdonald Islands"],
    ["Honduras"],
    ["Hong Kong"],
    ["Hungary"],
    ["Iceland"],
    ["India"],
    ["Indonesia"],
    ["Iran"],
    ["Iraq"],
    ["Ireland"],
    ["Israel"],
    ["Italy"],
    ["Jamaica"],
    ["Japan"],
    ["Jordan"],
    ["Kazakhstan"],
    ["Kenya"],
    ["Kiribati"],
    ["South Korea"],
    ["North Korea"],
    ["Kuwait"],
    ["Kyrgyzstan"],
    ["Lao People???s Democratic Republic"],
    ["Latvia"],
    ["Lebanon"],
    ["Lesotho"],
    ["Liberia"],
    ["Libyan Arab Jamahiriya"],
    ["Liechtenstein"],
    ["Lithuania"],
    ["Luxembourg"],
    ["Macao"],
    ["Macedonia, The Former Yugosalv Republic of"],
    ["Madagascar"],
    ["Malawi"],
    ["Malaysia"],
    ["Maldives"],
    ["Mali"],
    ["Malta"],
    ["Marshall Islands"],
    ["Martinique"],
    ["Mauritania"],
    ["Mauritius"],
    ["Mayotte"],
    ["Mexico"],
    ["Micronesia, Federated States of"],
    ["Moldova, Republic of"],
    ["Monaco"],
    ["Mongolia"],
    ["Montserrat"],
    ["Morocco"],
    ["Mozambique"],
    ["Myanmar"],
    ["Namibia"],
    ["Nauru"],
    ["Nepal"],
    ["Netherlands"],
    ["New Caledonia"],
    ["New Zealand"],
    ["Nicaragua"],
    ["Niger"],
    ["Nigeria"],
    ["Niue"],
    ["Norfolk Island"],
    ["Northern Mariana Islands"],
    ["Norway"],
    ["Oman"],
    ["Pakistan"],
    ["Palau"],
    ["Palestinian Territory, Occupied"],
    ["Panama"],
    ["Papua New Guinea"],
    ["Paraguay"],
    ["Peru"],
    ["Philippines"],
    ["Pitcairn"],
    ["Poland"],
    ["Portugal"],
    ["Puerto Rico"],
    ["Qatar"],
    ["R??union"],
    ["Romania"],
    ["Russia"],
    ["Rwanda"],
    ["Saint Helena"],
    ["Saint Kitts & Nevis"],
    ["Saint Lucia"],
    ["Saint Pierre & Miquelon"],
    ["Saint Vincent and the Grenadines"],
    ["Samoa"],
    ["San Marino"],
    ["Sao Tome & Principe"],
    ["Saudi Arabia"],
    ["Senegal"],
    ["Serbia &  Montenegro"],
    ["Seychelles"],
    ["Sierra Leone"],
    ["Singapore"],
    ["Slovakia"],
    ["Slovenia"],
    ["Solomon Islands"],
    ["Somalia"],
    ["South Africa"],
    ["South Georgia and the South Sandwich Islands"],
    ["Spain"],
    ["Sri Lanka"],
    ["Sudan"],
    ["Suriname"],
    ["Svalbard & Jan Mayen"],
    ["Swaziland"],
    ["Sweden"],
    ["Switzerland"],
    ["Syrian Arab Republic"],
    ["Taiwan, Province of China"],
    ["Tajikistan"],
    ["Tanzania, United Republic of"],
    ["Thailand"],
    ["Timor-Leste"],
    ["Togo"],
    ["Tokelau"],
    ["Tonga"],
    ["Trinidad & Tobago"],
    ["Tunisia"],
    ["Turkey"],
    ["Turkmenistan"],
    ["Turks & Caicos Islands"],
    ["Tuvalu"],
    ["Uganda"],
    ["Ukraine"],
    ["United Arab Emirates"],
    ["United Kingdom"],
    ["United States"],
    ["Uruguay"],
    ["Uzbekistan"],
    ["Vanuatu"],
    ["Venezuela"],
    ["Vietnam"],
    ["Wallis and Futuna"],
    ["Western Sahara"],
    ["Yemen"],
    ["Zambia"],
    ["Zimbabwe"]
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
    .then(function (data) {
      var tracklist = data.message.body.track_list;
      appendMusicInfo(country, tracklist);
    })
  ;
}


function getArtistInfo(event) {

  event.preventDefault();
  event.stopPropagation();
  var artist = $('#artistName').val();
  console.log(artist);
  fetch(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?apikey=${config.NusicApiKey}&q_artist=${artist}&page_size=10&page=1&s_track_rating=desc`)
    .then(response => response.json())
    .then(function (data) {
      
      var tracklist = data.message.body.track_list;
      console.log(tracklist);
      appendMusicInfo(artist, tracklist);
    })
  ;
}

function getCountryCode(country) {
  var codes = {
    "Afghanistan": "af",
    "Albania": "al",
    "Algeria": "dz",
    "American Samoa": "as",
    "Andorra": "ad",
    "Angola": "ao",
    "Anguilla": "ai",
    "Antarctica": "aq",
    "Antigua & Barbuda": "ag",
    "Argentina": "ar",
    "Armenia": "am",
    "Aruba": "aw",
    "Australia": "au",
    "Austria": "at",
    "Azerbaijan": "az",
    "Bahamas": "bs",
    "Bahrain": "bh",
    "Bangladesh": "bd",
    "Barbados": "bb",
    "Belarus": "by",
    "Belgium": "be",
    "Belize": "bz",
    "Benin": "bj",
    "Bermuda": "bm",
    "Bhutan": "bt",
    "Bolivia": "bo",
    "Bosnia & Herzegovina": "ba",
    "Botswana": "bw",
    "Bouvet Island": "bv",
    "Brazil": "br",
    "British Indian Ocean Territory": "io",
    "Brunei Darussalam": "bn",
    "Bulgaria": "bg",
    "Burkina Faso": "bf",
    "Burundi": "bi",
    "Cambodia": "kh",
    "Cameroon": "cm",
    "Canada": "ca",
    "Cape Verde": "cv",
    "Cayman Islands": "ky",
    "Central African Republic": "cf",
    "Chad": "td",
    "Chile": "cl",
    "China": "cn",
    "Christmas Island": "cx",
    "Cocos (Keeling) Islands": "cc",
    "Colombia": "co",
    "Comoros": "km",
    "Congo": "cg",
    "Congo, The Democratic Republic of the": "cd",
    "Cook Islands": "ck",
    "Costa Rica": "cr",
    "Cote D???ivoire": "ci",
    "Croatia": "hr",
    "Cuba": "cu",
    "Cyprus": "cy",
    "Czech Republic": "cz",
    "Denmark": "dk",
    "Djibouti": "dj",
    "Dominica": "dm",
    "Dominican Republic": "do",
    "Ecuador": "ec",
    "Egypt": "eg",
    "El Salvador": "sv",
    "Equatorial Guinea": "gq",
    "Eritrea": "er",
    "Estonia": "ee",
    "Ethiopia": "et",
    "Falkland Islands (Malvinas)": "fk",
    "Faroe Islands": "fo",
    "Fiji": "fj",
    "Finland": "fi",
    "France": "fr",
    "French Guiana": "gf",
    "French Polynesia": "pf",
    "French Southern Territories": "tf",
    "Gabon": "ga",
    "Gambia": "gm",
    "Georgia": "ge",
    "Germany": "de",
    "Ghana": "gh",
    "Gibraltar": "gi",
    "Greece": "gr",
    "Greenland": "gl",
    "Grenada": "gd",
    "Guadeloupe": "gp",
    "Guam": "gu",
    "Guatemala": "gt",
    "Guinea": "gn",
    "Guinea-Bissau": "gw",
    "Guyana": "gy",
    "Haiti": "ht",
    "Heard Island and Mcdonald Islands": "hm",
    "Honduras": "hn",
    "Hong Kong": "hk",
    "Hungary": "hu",
    "Iceland": "is",
    "India": "in",
    "Indonesia": "id",
    "Iran": "ir",
    "Iraq": "iq",
    "Ireland": "ie",
    "Israel": "il",
    "Italy": "it",
    "Jamaica": "jm",
    "Japan": "jp",
    "Jordan": "jo",
    "Kazakhstan": "kz",
    "Kenya": "ke",
    "Kiribati": "ki",
    "South Korea": "kp",
    "North Korea": "kr",
    "Kuwait": "kw",
    "Kyrgyzstan": "kg",
    "Lao People???s Democratic Republic": "la",
    "Latvia": "lv",
    "Lebanon": "lb",
    "Lesotho": "ls",
    "Liberia": "lr",
    "Libyan Arab Jamahiriya": "ly",
    "Liechtenstein": "li",
    "Lithuania": "lt",
    "Luxembourg": "lu",
    "Macao": "mo",
    "Macedonia, The Former Yugosalv Republic of": "mk",
    "Madagascar": "mg",
    "Malawi": "mw",
    "Malaysia": "my",
    "Maldives": "mv",
    "Mali": "ml",
    "Malta": "mt",
    "Marshall Islands": "mh",
    "Martinique": "mq",
    "Mauritania": "mr",
    "Mauritius": "mu",
    "Mayotte": "yt",
    "Mexico": "mx",
    "Micronesia, Federated States of": "fm",
    "Moldova, Republic of": "md",
    "Monaco": "mc",
    "Mongolia": "mn",
    "Montserrat": "ms",
    "Morocco": "ma",
    "Mozambique": "mz",
    "Myanmar": "mm",
    "Namibia": "na",
    "Nauru": "nr",
    "Nepal": "np",
    "Netherlands": "nl",
    "New Caledonia": "nc",
    "New Zealand": "nz",
    "Nicaragua": "ni",
    "Niger": "ne",
    "Nigeria": "ng",
    "Niue": "nu",
    "Norfolk Island": "nf",
    "Northern Mariana Islands": "mp",
    "Norway": "no",
    "Oman": "om",
    "Pakistan": "pk",
    "Palau": "pw",
    "Palestinian Territory, Occupied": "ps",
    "Panama": "pa",
    "Papua New Guinea": "pg",
    "Paraguay": "py",
    "Peru": "pe",
    "Philippines": "ph",
    "Pitcairn": "pn",
    "Poland": "pl",
    "Portugal": "pt",
    "Puerto Rico": "pr",
    "Qatar": "qa",
    "R??union": "re",
    "Romania": "ro",
    "Russian Federation": "ru",
    "Rwanda": "rw",
    "Saint Helena": "sh",
    "Saint Kitts & Nevis": "kn",
    "Saint Lucia": "lc",
    "Saint Pierre & Miquelon": "pm",
    "Saint Vincent and the Grenadines": "vc",
    "Samoa": "ws",
    "San Marino": "sm",
    "Sao Tome & Principe": "st",
    "Saudi Arabia": "sa",
    "Senegal": "sn",
    "Serbia &  Montenegro": "cs",
    "Seychelles": "sc",
    "Sierra Leone": "sl",
    "Singapore": "sg",
    "Slovakia": "sk",
    "Slovenia": "si",
    "Solomon Islands": "sb",
    "Somalia": "so",
    "South Africa": "za",
    "South Georgia and the South Sandwich Islands": "gs",
    "Spain": "es",
    "Sri Lanka": "lk",
    "Sudan": "sd",
    "Suriname": "sr",
    "Svalbard & Jan Mayen": "sj",
    "Swaziland": "sz",
    "Sweden": "se",
    "Switzerland": "ch",
    "Syrian Arab Republic": "sy",
    "Taiwan, Province of China": "tw",
    "Tajikistan": "tj",
    "Tanzania, United Republic of": "tz",
    "Thailand": "th",
    "Timor-Leste": "tl",
    "Togo": "tg",
    "Tokelau": "tk",
    "Tonga": "to",
    "Trinidad & Tobago": "tt",
    "Tunisia": "tn",
    "Turkey": "tr",
    "Turkmenistan": "tm",
    "Turks & Caicos Islands": "tc",
    "Tuvalu": "tv",
    "Uganda": "ug",
    "Ukraine": "ua",
    "United Arab Emirates": "ae",
    "United Kingdom": "uk",
    "United States": "us",
    "United States Minor Outlying Islands": "um",
    "Uruguay": "uy",
    "Uzbekistan": "uz",
    "Vanuatu": "vu",
    "Venezuela": "ve",
    "Vietnam": "vn",
    "Virgin Islands, British": "vg",
    "Virgin Islands, U.S.": "vi",
    "Wallis and Futuna": "wf",
    "Western Sahara": "eh",
    "Yemen": "ye",
    "Zambia": "zm",
    "Zimbabwe": "zw"
  }
  getcountryTopChart(codes[country], country);
}



//take information from API call and return track name, album, and country name at top of modal
function appendMusicInfo(ListName, tracklist) {
  var switcher = $("#switcher")
  let div = $("#results")
  div.children().remove();

  var list = $('<ul>', {
    class: "uk-list uk-list-striped results-list",
  });
  var countryName = $('<h1>', {
    text: `${ListName}: Top ${tracklist.length} Tracks`,
  });
  div.append(countryName);
  // a for loop to get the entire list of 25 top tracks
  for (let i = 0; i < tracklist.length; i++) {
    var li = $('<li>', {
      text: `${i + 1}. Track Name: ${tracklist[i].track.track_name} | Artist Name: ${tracklist[i].track.artist_name} | Album Name: ${tracklist[i].track.album_name}`
    });

    list.append(li);
  }
  div.append(list);
  UIkit.switcher(switcher).show(2);
}

$('#searchButton').on("click", getArtistInfo);

