var api_url = 'https://api.projectoxford.ai/emotion/v1.0/recognize'
var james_key = "d56bfdd4b1fc4fb4989908e4fa7d8a87"
var test_fb_url = 'https://scontent-iad3-1.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/11902360_10204809163811037_8085263968138789270_n.jpg?oh=d341f098ffbf8e817aee8e606cf52713&oe=56ADE898'
var wiki = "https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg"

getEmotionFromURL = function(url) {
	hdr = {
			"Content-Type":"application/json",
		  	"Ocp-Apim-Subscription-Key":"d56bfdd4b1fc4fb4989908e4fa7d8a87"
		}

	img = {
		"url": url
	}

	var content = null;

	callback = function(error, response) {
		console.log("ERROR:" + error);
	 	console.log("CONTENT:" + response['content']);
	 	content = JSON.parse(response['content']);
	 	var closest_face = findClosestFace(content, 50, 50)
	 	console.log(closest_face)
	}

	HTTP.post(api_url, {headers:hdr, data:img}, asyncCallback=callback);
}

function findClosestFace(content, x, y) {
	var closest_face = null;
	var min_dist = 100000000;
	console.log(content[0])
	for (let face of content) {
		console.log("FACE:" + face)
		var center_x = face['faceRectangle']['left'] + ((face["faceRectangle"]["width"])/2.0);
		var center_y = face['faceRectangle']['top'] + ((face['faceRectangle']['height'])/2.0);

		var dist = getDistance(x, y, center_x, center_y);

		if (dist < min_dist) {
			min_dist = dist;
			closest_face = face;
		}
	}
	return closest_face
}

function getDistance(x1, y1, x2, y2) {
	return (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1)
}
