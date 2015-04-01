$(document).ready(function(){
	
	var userAnswer;
	var randomAnswer;
	var userChoice;
	var compChoice;
	
	var race = {
		secondsRemaining: 10,
		vehicles: ["vehicle-1", "vehicle-2", "vehicle-3", "vehicle-4"],
		moveUserCarForward: function() {$('#' + userChoice).animate({ "left": "+=50px" }, "slow" );},
		moveUserCarBackward: function() {$('#' + userChoice).animate({ "left": "-=50px" }, "slow" );},
		moveCompCarForward: function() {$('#' + compChoice).animate({ "left": "+=50px" }, "slow" );},
		moveCompCarBackward: function() {$('#' + compChoice).animate({ "left": "-=50px" }, "slow" );}
	}

	function createRandomQuestion() {
	
		var randomQuestion;
		var number1;
		var number2;

		number1 = Math.ceil(Math.random()*10);
		
		number2 = Math.ceil(Math.random()*10);

		randomQuestion = number1 + " + " + number2;
		randomAnswer = eval(randomQuestion)

		$('#question').text(randomQuestion);

	}

	
	function selectVehicles(userChoice) {
		for (var i = 0; i < race.vehicles.length; i++) {
			if (race.vehicles[i] === userChoice) {
				race.vehicles.splice(i,1);
			}
		};
		compChoice = race.vehicles[Math.ceil(Math.random()*race.vehicles.length)]
	}

	function startTimer() {
	
		var timer = setInterval(functionEverySecond, 1000);
		var compTimer = setInterval(race.moveCompCarForward, 2000)
		$('.glyphicon').addClass('glyphicon-spin');
		
	}


	function isAnswerCorrect(userAnswer, answer) {
		if (userAnswer === answer) {
			addSeconds();
			$('#user-input').val('');
			$('#user-input').parent().removeClass('has-error');
			race.moveUserCarForward();
			createRandomQuestion();
		}
		else {
			$('#user-input').parent().addClass('has-error');
		}
	}

  function addSeconds() {
    race.secondsRemaining += 2;
  }

  function functionEverySecond() {
    if (race.secondsRemaining < 0) {
      
      clearInterval(timer);
    } else {
      $('#timer').text(race.secondsRemaining);
      race.secondsRemaining--;
    }
  }

	$(document).one('click', '.vehicle', function() {
	  userChoice = $(this).attr('id');
	  selectVehicles(userChoice);
	});

	createRandomQuestion();

	$('#play').click(function() {
		$('#user-input').attr('id', 'user-input');
		$('#user-input').removeAttr('disabled');
		$('#user-input').removeAttr('placeholder');
		$('#user-input').focus();
	});

	$(document).one('focus', '#user-input', function() {
		startTimer();
	});

	$(document).on('keyup', '#user-input', function() {
		userAnswer = Number($('#user-input').val());
		answer = eval($('#question').text());
		isAnswerCorrect(userAnswer, answer);
	});

	
});
