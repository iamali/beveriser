
// get/set storage values
chrome.storage.sync.get('beveriser_minutes', function(result) {
	
	var minutes = (result.beveriser_minutes == null) ? '20' : result.beveriser_minutes;
	chrome.storage.sync.set({ 'beveriser_minutes': minutes });
	createAlarm(minutes);
});



// listen for alarm
chrome.alarms.onAlarm.addListener(function(alarm) {

	chrome.storage.sync.get('beveriser_minutes', function(result) {
		
		var frequency = result.beveriser_minutes;
		var unitoftime = (frequency == 1) ? 'minute' : 'minutes';

		var manifest = chrome.runtime.getManifest();

		var options = {
			type: 'basic',
			title: 'Reminder!',
			message: 'It\'s been ' + frequency + ' ' + unitoftime + ' since you last beverised, time to hydrate!',
			iconUrl: 'notification.png',
			priority: 2
		}

		console.log(options);

		createNotification(options);
	});
});



// create alarm
function createAlarm(minutes) {

	chrome.alarms.create('loopage', {
		periodInMinutes: parseInt(minutes)
	});
}



// cancel alarm
function cancelAlarm() {

	chrome.alarms.clearAll;
	chrome.notifications.clear('notifyage');
}



// create notification
function createNotification(options) {

	chrome.notifications.clear('notifyage', function() {
		chrome.notifications.create('notifyage', options, function() {
			console.log('New loop started at ' + new Date())
		});
	});
}