
var backgroundPage = chrome.extension.getBackgroundPage()
var minutes, frequency, loopage;


// set minutes value
chrome.storage.sync.get('beveriser_minutes', function(result) {
	minutes = (result.beveriser_minutes == null) ? '30' : result.beveriser_minutes;
	chrome.storage.sync.set({'beveriser_minutes': minutes})
});


// start timer going
function setTimerGoing() {

	// clear previous interval
	clearInterval(loopage);
	var counter = 0;

	// set new interval
	loopage = setInterval(function() {

	    counter = counter + 1;

		chrome.storage.sync.get('beveriser_minutes', function(result) {
			
			frequency = result.beveriser_minutes;
			seconds = frequency * 60;
			unitoftime = (frequency == 1) ? 'minute' : 'minutes';

			var options = {
			  type: "basic",
			  title: "Reminder!",
			  message: "It's been " + frequency + " " + unitoftime + " since you last beverised, time to hydrate!",
			  iconUrl: "notification.png"
			}

		    if (counter == seconds) {

		    	// clear if previous notification still there
		    	chrome.notifications.clear("0", function() {
					
					// show notification
					chrome.notifications.create("0", options, function() {
						counter = 0;
					});
		    	});
		    }
		})

	}, 1000);
}


// fire off timer
setTimerGoing();