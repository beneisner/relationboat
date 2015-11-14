var api_url = 'https://api.projectoxford.ai/emotion/v1.0/recognize'
var james_key = "d56bfdd4b1fc4fb4989908e4fa7d8a87"
var test_fb_url = 'https://scontent-iad3-1.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/11902360_10204809163811037_8085263968138789270_n.jpg?oh=d341f098ffbf8e817aee8e606cf52713&oe=56ADE898'
var wiki = "https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg"

function getEmotionFromURL(url) {
	hdr = {
			"Content-Type":"application/json",
		  	"Ocp-Apim-Subscription-Key":"d56bfdd4b1fc4fb4989908e4fa7d8a87"
		}

	img = {
		"url": url
	}

	var content = null;

	callback = function(error, response) {
		console.log("ERROR:" + error)
	 	console.log(response['content'])
	 	content = response['content'];
	 	
	}

	HTTP.post(api_url, {headers:hdr, data:img}, asyncCallback=callback);
}