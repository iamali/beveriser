
var backgroundPage = chrome.extension.getBackgroundPage()


// on load
window.addEventListener('load', function(e) {
	
	e.preventDefault();

	// get minutes value
	chrome.storage.sync.get('beveriser_minutes', function(result) {
		document.getElementById('minutesinput').value = result.beveriser_minutes;
	});

    document.getElementById('minutesform').addEventListener('submit', updateMinutes);
});


// update minutes value in local storage & reset timer
function updateMinutes(e) {

	e.preventDefault();
	var minutesInput = document.getElementById('minutesinput');
	var inputValue = minutesInput.value;

	// if not a number
	if ( isNaN(inputValue) ) {
		minutesInput.classList.add('error');
		return;
	}

	// set minutes value in chrome storage
	chrome.storage.sync.set({ 'beveriser_minutes': minutesInput.value })
	minutesInput.classList.remove('error');
	backgroundPage.setTimerGoing();
	
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