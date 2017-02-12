var Geo = {};

// Checking if we can get user's location
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(success, error);
}
else {
	alert('Geolocation is not supported');
}

// If we are not able to get user's location
function error() {
	alert("That's weird! We couldn't find you!");
}

// If we ARE able, then we will get their coordinates
function success(position) {
	Geo.lat = position.coords.latitude;
	Geo.lng = position.coords.longitude;
	var key = '72a7ec3830b58e60';
	var Weather = "http://api.wunderground.com/api/" + key + "/forecast/geolookup/conditions/q/" + Geo.lat + "," + Geo.lng + ".json";
	$.ajax({
		url : Weather,
		dataType : "jsonp",
		success : function(data) {
			// We get all the information
			var location =data['location']['city'];
			var temp = data['current_observation']['temp_f'];
			var img = data['current_observation']['icon_url'];
			var desc = data['current_observation']['weather'];
			var wind = data['current_observation']['wind_string'];

			// Data for the 4 day forecast
			var forecast = data['forecast']['txt_forecast']['forecastday'];
			
			for (var i = 0; i < forecast.length; i++) {
				var day = forecast[i].title;
				var dimg = forecast[i].icon_url;
				var text = forecast[i].fcttext;
				$('#period' + i).html(day);
				$('#iperiod' + i).attr('src', dimg);
				$('#tperiod' + i).html(text);
			}
			$('#location').html(location);
			$('#temp').html(temp);
			$('#desc').html(desc);
			$('#wind').html(wind);
			$('#img').attr('src', img);
		}
	});
}