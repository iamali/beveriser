
var backgroundPage = chrome.extension.getBackgroundPage();


// on load
window.addEventListener('load', function(e) {

	// populate the minutes input value
	chrome.storage.sync.get('beveriser_minutes', function(result) {
		document.getElementById('minutesinput').value = result.beveriser_minutes;
	});

	// add event listener for submitting form
    document.getElementById('minutesform').addEventListener('submit', updateMinutes);
});



// update minutes value in local storage & reset alarm
function updateMinutes(e) {

	e.preventDefault();

	// cancel current alarm
	backgroundPage.cancelAlarm();

	var minutesInput = document.getElementById('minutesinput');
	var minutesValue = minutesInput.value;

	var disable = document.getElementById('disable');
	var disableValue = disable.checked;

	// if disabled is checked then return & don't create new alarm
	if (disableValue == true) {
		animateButton();
		return;
	}

	// if not a number or less than 1
	if ( isNaN(minutesValue) || minutesValue < 1 ) {
		minutesInput.classList.add('error');
		return;
	}

	// set minutes value in chrome storage
	chrome.storage.sync.set({ 'beveriser_minutes': minutesValue })
	minutesInput.classList.remove('error');

	// start alarm
	backgroundPage.createAlarm(minutesValue);
	
	// save animation
	animateButton();
}



// save animation
function animateButton() {

	var minutesButton = document.getElementById('minutesbutton');
	if (minutesButton.classList.contains('saving')) return;
	minutesButton.classList.add('saving');

	// when tick bounces in change 'save' to 'saved'
	setTimeout(function() {
		minutesButton.classList.add('saving');
		minutesButton.innerHTML = 'Saved';

		// reset button back to default state
		setTimeout(function() {
			minutesButton.classList.remove('saving');
			minutesButton.innerHTML = 'Save';

		}, 1500);

	}, 200)
}