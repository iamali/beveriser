
var backgroundPage = chrome.extension.getBackgroundPage()



// get/set storage values
chrome.storage.sync.get('beveriser_minutes', function(result) {
	
	var minutes = (result.beveriser_minutes == null) ? '20' : result.beveriser_minutes;
	chrome.storage.sync.set({ 'beveriser_minutes': minutes });
	backgroundPage.createAlarm(minutes);
})



// listen for alarm
chrome.alarms.onAlarm.addListener(function(alarm) {

	chrome.storage.sync.get('beveriser_minutes', function(result) {
		
		var frequency = result.beveriser_minutes;
		var unitoftime = (frequency == 1) ? 'minute' : 'minutes';

		var options = {
		  type: 'basic',
		  title: 'Reminder!',
		  message: 'It\'s been ' + frequency + ' ' + unitoftime + ' since you last beverised, time to hydrate!',
		  iconUrl: 'notification.png',
		  priority: 2
		}

		createNotification(options);
	})
})



// create alarm
function createAlarm(minutes) {

	chrome.alarms.create('loopage', {
		periodInMinutes: parseInt(minutes)
	});
}



// cancel alarm
function cancelAlarm() {

	chrome.alarms.clear('loopage');
	chrome.notifications.clear('0');
}



// create notification
function createNotification(options) {

	chrome.notifications.clear('0', function() {
		chrome.notifications.create('0', options, function() {
			backgroundPage.console.log('New loop started at ' + new Date())
		})
	})	
}