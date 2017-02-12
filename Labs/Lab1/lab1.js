// Function to display text, profile picture, and username for each tweet.
// Information is dynamically displayed so that only 5 tweets and
// usernames are showing at a given time
var display_tweets = function(allTweets) {

	// This variable will hold data for the first five tweets
	var firstFive = ""

	// This variable will hold data for the first five usernames
	var firstFiveUsers = ""

	for (i = 0; i < 5; i++) {
		firstFive += "<div class='tweetBox'>";
		firstFive += "<img src='" + allTweets[i].profile + "'class='img-align-left'>";
		firstFive += "<div><p>";
		firstFive += allTweets[i].text + "</p></div></div>";

		firstFiveUsers += "<div class='userBox'>";
		firstFiveUsers += "<div><p>";
		firstFiveUsers += allTweets[i].username += "</p></div></div>";
	}

	// Appending each finished variable to their respective divs
	$("#tweets").append(firstFive);
	$("#usernames").append(firstFiveUsers);

	var singleTweet;
	var singleUser;

	// Here we remove the oldest tweet/username and add the newest tweet/username
	// We use setInterval so that there's a delay before a new tweet/username is added
	setInterval(function() {
		singleTweet = "";
		singleTweet += "<div class='tweetBox'>";
		singleTweet += "<img src='" + allTweets[i].profile + "'class='img-align-left'>";
		singleTweet += "<div><p>";
		singleTweet += allTweets[i].text + "</p></div></div>"

		singleUser = "";
		singleUser += "<div class='userBox'>";
		singleUser += "<div><p>";
		singleUser += allTweets[i].username + "</p></div></div>";

		$('#tweets div:first-child').remove();
		$('#usernames').find('div').first().remove();
		$('#tweets').append(singleTweet);
		$('#usernames').append(singleUser);

		// Have to increment i to get to the next tweet
		i++;
	}, 3000);
}

// Function to get text, profile picture, and username for each tweet.
// Information for each tweet is put inside of an array, which is used
// in the display_tweets function.
var get_tweet_info = function() {
	allTweets = new Array();
	$.getJSON("TwitterTweets17.json", function(data) {
		$.each(data, function(key, val) {
			// Checking for undefined data
			if (val.user != undefined) {
				if (val.user.name != undefined) {
					if (val.text != undefined) {
						// If data is defined, then we push it into the array
						allTweets.push({
							"text": val.text,
							"profile": val.user["profile_image_url"],
							"username": val.user["name"]
						})
					}
				}
			}
		});
		display_tweets(allTweets);
	});
}

get_tweet_info();