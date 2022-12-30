// Including the bcrypt package with node.

// Divs
const roundsSelector = document.querySelector('#rounds-selector');

// Alerts
const encodeAlert = document.querySelector('#encode-alert');
const checkAlert = document.querySelector('#check-alert');
const roundsWarning = document.querySelector('#rounds-warning');

// TextAreas
const encodeString = document.querySelector('#encode-string');
const checkString = document.querySelector('#check-string');
const checkHash = document.querySelector('#hash');

// Labels
const roundsLabel = document.querySelector('#rounds-label');

// Inputs
const rounds = document.querySelector('#rounds');

// Buttons
const decrementBtn = document.querySelector('#decrement-btn');
const incrementBtn = document.querySelector('#increment-btn');
const encodeBtn = document.querySelector('#encode-btn');
const checkBtn = document.querySelector('#check-btn');

// normalizes the values if the user exceeds the limits by manually typing into the input element.
const resetRoundsValue = () => {
    if (rounds.value > 20) {
        rounds.value = 20;
    } else if (rounds.value < 0) {
        rounds.value = 1;
    }
}

// Deciding whether the waning should be shown or not.
const checkRoundsValue = () => {
    resetRoundsValue();

    let lowRoundsWarning = '<b>Warning!</b> Keeping the <i>Bcrypt</i> rounds ' + 'above <b>9</b> is important for safety issues.';
    let highRoundsWaring = '<b>Warning!</b> Keeping the <i>Bcrypt</i> rounds ' + 'below <b>15</b> is important for a swift code.'

    // if the warning is visible and the rounds' value is between the ideal
    // range, make the waring invisible.  
    if (!roundsWarning.classList.contains('hide')) {
        if (rounds.value > 9 && rounds.value < 15) {
            roundsWarning.classList.add('hide');
            return;
        }
    }

    // if the warning is not visible and rounds' value isn't in the ideal range,
    // add the warning content and make the warning visible. 
    if (rounds.value < 10) {
        roundsWarning.innerHTML = lowRoundsWarning;
        roundsWarning.classList.remove('hide');
    } else if (rounds.value > 14) {
        roundsWarning.innerHTML = highRoundsWaring;
        roundsWarning.classList.remove('hide');
    }
}

// Setting the rounds selector checks.
roundsSelector.addEventListener('click', checkRoundsValue);
rounds.addEventListener('input', checkRoundsValue);

// Incrementing and decrementing the rounds' value with buttons.
decrementBtn.addEventListener('click', () => {
    if (rounds.value <= 1) {
        return;
    }

    rounds.value--;
});
incrementBtn.addEventListener('click', () => {
    if (rounds.value >= 20) {
        return;
    }

    rounds.value++;
});

// Starting the encryption
encodeBtn.addEventListener('click', (evt) => {
    evt.preventDefault();

    const saltRounds = rounds.value;
    const string = encodeString.value;
});