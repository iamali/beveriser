
var backgroundPage = chrome.extension.getBackgroundPage()

// on load
window.addEventListener('load', function(e) {
	
	e.preventDefault();
	document.getElementById('minutesinput').value = localStorage['beveriser_minutes'];
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

	localStorage['beveriser_minutes'] = minutesInput.value;
	minutesInput.classList.remove('error');
	backgroundPage.setTimerGoing();
	
	// save animation
	runSaveAnimation();
}


// save animation
function runSaveAnimation() {

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