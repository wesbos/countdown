$(function() {


	$('.digits').on('click', function() {
		var inputValue = $(this).attr("value");
		$('.number').append(inputValue);
	});

	// Click start the timer begins
	$('.start').on('click', function(){

		// User Input Number
		var userInput = $('.number').text();
		
		// Extra Insurance to Ensure A Number is Passed
		var time = parseInt(userInput);
		
		// Check to see if the no user input
		var fail = "Please Input a Number"
		if (!time) {
			return $('.seconds').text(fail);
		}

		// Countdown Timer
		var countdown = setInterval(function() {
			$('.number').text('');

			// Update the span text with the number of seconds
			$('.seconds').text(time);
			time--;
			if (time < 0) {
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