
var backgroundPage = chrome.extension.getBackgroundPage()

// default 30 minutes
localStorage['beveriser_minutes'] = (localStorage['beveriser_minutes'] == null) ? '30' : localStorage['beveriser_minutes'];

// variables
var counter = 0;
var frequency = localStorage['beveriser_minutes'];
var seconds = frequency * 60;
var unitoftime = (frequency == 1) ? 'minute' : 'minutes';
var loopage;

// start timer going
function setTimerGoing() {

	clearTime();

	loopage = setInterval(function() {
	    
	    counter = counter + 1;
		frequency = localStorage['beveriser_minutes'];
		seconds = frequency * 60;
		unitoftime = (frequency == 1) ? 'minute' : 'minutes';

		var options = {
		  type: "basic",
		  title: "Reminder!",
		  message: "It's been " + frequency + " " + unitoftime + " since you last beverised, time to hydrate!",
		  iconUrl: "notification.png"
		}

	    if (counter == seconds) {

	    	// notify!
	    	chrome.notifications.clear("0", function() {
			
				chrome.notifications.create("0", options, function() {
					counter = 0;
				});
	    	});
	    }
	}, 1000);
}


// clear timer when setting minutes value
function clearTime() {

	clearInterval(loopage);
	counter = 0;
}


// fire off timer
setTimerGoing();