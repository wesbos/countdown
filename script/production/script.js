$(function() {
	var seconds = 15;

	// Click start the timer begins
	$('.start').on('click', function(){
		var countdown = setInterval(function() {
			// Update the span text with the number of seconds
			$('.seconds').text(seconds);
			seconds--;
			if (seconds < 0) {
				clearInterval(countdown);
			} else {
				// if the user selects the stop button stop the countdown
				$('.stop').on('click', function() {
					clearInterval(countdown);
				});
			}
		},1000);
	});
});