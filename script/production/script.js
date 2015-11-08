$(function() {

    var $input = $('.input');
    var $start = $('.start');
    var $stop = $('.stop');
    var $digits = $('.digits');
    var $reset = $('.reset');
    var $output = $('.output');
    var time;
    var numInput;
    var countdown;
    var timerStarted = false; // The state of the timer hasn't started

    // Contols - start
    function initialInput() {
        $start.css('display', 'inline-block');
        $stop.hide();
        $digits.show();
        $reset.css('display', 'inline-block');
    }

    function startTimer() {
        $start.hide();
        $digits.hide();
        $reset.hide();
        countdown = setInterval(function() {
            // Formating of the time
            var hours = Math.floor(time / 3600) % 24;
            var minutes = Math.floor(time / 60) % 60;
            var seconds = time % 60;
            var timeFormat = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
            $input.empty();
            $stop.css('display', 'inline-block');
            $output.show();

            // Update the span text with the number of seconds
            time--;

            $input.text(time); // Prints the Time in Seconds on the DOM.

            $output.text(timeFormat); // Prints the Time in Hours Minutes & Seconds via the Console.
            if (time < 0) {
                clearInterval(countdown);
                setTimeout(function() {
                    afterCompletion();
                }, 5000);
            }
        }, 1000);
    }

    function pauseState() {
        $start.css('display', 'inline-block');
        $stop.hide();
        $digits.hide();
        $reset.css('display', 'inline-block');
    }

    function restartState() {
        $start.hide();
        $stop.hide();
        $digits.show();
        $reset.hide();
    }

    function afterCompletion() {
        $input.empty();
        $digits.show();
        $stop.hide();
        $output.hide();
    }
    // Controls - end


    // Each Digit represents a minute
    $('.digit').on('click', function() {
        var inputValue = $(this).data('seconds');
        $input.show();
        $input.append(inputValue);
        initialInput();
    });


    // Click start the timer begins
    $start.on('click', function() {

        $input.hide(); // Hide the input once the countdown starts

        // If the timer hasn't started multiply time by 60
        if (timerStarted === false) {
            numInput = $input.text();
            time = parseInt(numInput);
            time = time * 60;
            timerStarted = true;
        }

        startTimer();

    });

    // if the user selects the stop button stop the countdown
    $stop.on('click', function() {
        clearInterval(countdown);
        return pauseState();
    });

    // Reset Button
    $reset.on('click', function() {
        $input.empty();
        $output.empty();
        restartState();
        $input.show();
        $output.hide();
        timerStarted = false;
    });
});
