$(function() {

	// Contols - start
	function initialInput() {
		$('.start').show();
		$('.stop').hide();
		$('.digits').show();
		$('.reset').show();
	}

	function startTimer() {
		$('.start').hide();
		$('.stop').show();
		$('.digits').hide();
		$('.reset').hide();
	}

	function pauseState() {
		$('.start').show();
		$('.stop').hide();
		$('.digits').hide();
		$('.reset').show();
	}

	function restartState() {
		$('.start').hide();
		$('.stop').hide();
		$('.digits').show();
		$('.reset').show();
	}

	function afterCompletion() {
		$('.input').text('');
		$('.digits').show();
		$('.stop').hide();
	}
	// Controls - end


	// Each Digit represents a minute
	$('.digit').on('click', function() {
		var inputValue = ($(this).attr("value"))*60;
		$('.input').append(inputValue);
		initialInput();
	});


	// Click start the timer begins
	$('.start').on('click', function(){
		startTimer();
		
		// Extra Insurance to Ensure A Number is Passed
		var time = parseInt($('.input').text());

	
		// Countdown Timer
		var countdown = setInterval(function() {
			$('.input').empty();


			// Formating of the time
			var hours = Math.floor( time / 3600 ) % 24;
			var minutes = Math.floor(time / 60) % 60;
			var seconds = time % 60;
			var timeFormat = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);


			// Update the span text with the number of seconds
			time--;
			console.log(timeFormat);  // Prints the Time in Hours Minutes & Seconds via the Console.
			$('.input').text( time );  // Prints the Time in Seconds on the DOM.
			if (time < 0) {
				clearInterval(countdown);
				setTimeout(function() {
					afterCompletion();
				},5000);
			} else {
				// if the user selects the stop button stop the countdown
				$('.stop').on('click', function() {
					clearInterval(countdown);
					return pauseState();
				});
			}
		},1000);
	});

	// Reset Button
	$('.reset').on('click', function() {
		$('.input').empty();
		restartState();
	});
});