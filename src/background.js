
var backgroundPage = chrome.extension.getBackgroundPage()
var frequency, seconds, unitoftime, loopage;

backgroundPage.console.log('loaded...')




// set storage values
chrome.storage.sync.get(null, function(result) {
	
	var minutes = (result.beveriser_minutes == null) ? '30' : result.beveriser_minutes;
	chrome.storage.sync.set({ 'beveriser_minutes': minutes });

	var disable = (result.beveriser_disable == null) ? false : result.beveriser_disable;
	chrome.storage.sync.set({ 'beveriser_disable': disable });

	backgroundPage.createAlarm();
});



// create alarm
function createAlarm() {

	chrome.storage.sync.get(null, function(result) {

		chrome.alarms.create('loopage', {
			periodInMinutes: parseInt(result.beveriser_minutes)
		});
	})
}



// cancel alarm
function cancelAlarm() {
	chrome.alarms.clear('loopage');
}



// listen for alarm
chrome.alarms.onAlarm.addListener(function(alarm) {

	chrome.storage.sync.get(null, function(result) {

    	if (result.beveriser_disable == true) return;
		
		frequency = result.beveriser_minutes;
		seconds = frequency * 60;
		unitoftime = (frequency == 1) ? 'minute' : 'minutes';

		var options = {
		  type: 'basic',
		  title: 'Reminder!',
		  message: 'It\'s been ' + frequency + ' ' + unitoftime + ' since you last beverised, time to hydrate!',
		  iconUrl: 'notification.png',
		  priority: 2
		}

    	// clear if previous notification still there
    	chrome.notifications.clear('0', function() {
			
			// show notification
			chrome.notifications.create('0', options, function() {
				backgroundPage.console.log('New loop after ' + result.beveriser_minutes + ' minutes. ' + new Date())
			});
    	});
	})
})