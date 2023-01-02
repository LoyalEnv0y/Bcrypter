// TextAreas
const encodeString = document.querySelector('#encode-string');
const decodeString = document.querySelector('#decode-string');

// Buttons
const encodeBtn = document.querySelector('#encode-btn');
const decodeBtn = document.querySelector('#decode-btn');

// Alerts
const encodeWarning = document.querySelector('#encode-warning');
const decodeWarning = document.querySelector('#decode-warning');

// Descriptions
const encodeWarningDesc = document.querySelector('#encode-warning-desc');
const decodeWarningDesc = document.querySelector('#decode-warning-desc');

const toMorse = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
    'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
    'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
    'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'Y': '-.--', 'W': '.--', 'X': '-..-',
    'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....',
    '7': '--...', '8': '---..', '9': '----.', '.': '.-.-.-',
    ',': '--..--', '?': '..--..', '!': '-.-.--', '/': '-..-.',
    '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...',
    '=': '-...-', '+': '.-.-.', '-': '-....-', '@': '.--.-.',
    ' ': '/',
}

const toLatin = {
    '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E',
    '..-.': 'F', '--.': 'G', '....': 'H', '..': 'I', '.---': 'J',
    '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O',
    '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T',
    '..-': 'U', '...-': 'V', '-.--': 'Y', '.--': 'W', '-..-': 'X',
    '--..': 'Z', '-----': '0', '.----': '1', '..---': '2',
    '...--': '3', '....-': '4', '.....': '5', '-....': '6',
    '--...': '7', '---..': '8', '----.': '9', '.-.-.-': '.',
    '--..--': ',', '..--..': '?', '-.-.--': '!', '-..-.': '/',
    '-.--.': '(', '-.--.-': ')', '.-...': '&', '---...': ':',
    '-...-': '=', '.-.-.': '+', '-....-': '-', '.--.-.': '@',
    '/': ' ',
}

const checkInvalidChars = (invalidChars, alert, alertDesc) => {
    if (invalidChars.length < 1) {
        return;
    }

    let invalidCharsString = invalidChars.map((char) => {
        return `'${char}',`
    }).join(' ');

    invalidCharsString = invalidCharsString.slice(0, invalidCharsString.length - 1);

    alertDesc.innerHTML = `There are <strong>no</strong> translations for these characters <i>${invalidCharsString}</i>`;
    alert.classList.remove('hide');
}

const encode = (decoded) => {
    decoded = decoded.trim();

    if (decoded.length === 0) {
        return null;
    }

    decoded = decoded.toUpperCase();

    let encoded = '';
    const unknownChars = [];

    for (let char of decoded) {
        if (!toMorse.hasOwnProperty(char) && !unknownChars.includes(char)) {
            unknownChars.push(char);
            continue;
        }

        encoded += toMorse[char] + ' ';
    }

    checkInvalidChars(unknownChars, encodeWarning, encodeWarningDesc);

    return encoded;
}

encodeBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    encodeWarning.classList.add('hide');
    const encoded = encode(encodeString.value);

    if (decode) {
        encodeString.value = encoded;
    }
});

const decode = (encoded) => {
    encoded = encoded.trim();

    if (encoded.length === 0) {
        return null;
    }

    encoded = encoded.toUpperCase();

    let decoded = '';
    let set = '';
    const unknownChars = [];

    for (let char of encoded + ' ') {

        if (char === ' ') {

            if (!toLatin.hasOwnProperty(set) && !unknownChars.includes(set)) {
                unknownChars.push(set);
                continue;
            }

            decoded += toLatin[set];
            set = '';
            continue;
        }
        set += char
    }

    checkInvalidChars(unknownChars, decodeWarning, decodeWarningDesc);

    return decoded;
}

decodeBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    decodeWarning.classList.add('hide');
    const decoded = decode(decodeString.value);

    if (decode) {
        decodeString.value = decoded;
    }
});