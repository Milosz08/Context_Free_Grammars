/*!
 * Matrix generator filled with pseudo-random characters of the user-selected grammar and validator of 
 * the user-entered name, whether it is within the range of the grammar generated from the value in the edit field.
 *
 * The scripts were entirely written in pure JavaScript compatible with the EcmaScript6 standard
 * by Miłosz Gilga (https://github.com/Milosz08).
 * 
 * ++++++++++++++++++++++++++++++++++++++++++(v1.0)++++++++++++++++++++++++++++++++++++++++++
 * - the ability to change letters, special characters,
 * - toggle switches: "whether capital letters", "or numbers",
 * - the ability to change the size of the matrix (number of rows and columns),
 * - the ability to enter any text by the user,
 * - possibility to set the maximum number of special characters in a single word
 * - checking if the typed text is within the grammar range and meets the grammar criteria
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * 
 * Main assumptions:
 * - the first column of the matrix (the first character of a word) cannot be a digit or a special character,
 * - the last column of the matrix (the last character of a word) cannot end with a special character,
 */

const letArrObj = [
  { name: 'charsRegex', value: 'abcdefghijklmnopqrstuvwxyz' }, //letters
  { name: 'specRegex', value: "`~!@#$%^&*()_-=+{}[];:'\\\"|,<.>/\?" }, //special characters
];

const boolArrObj = [
  { name: 'ifNumb', value: true }, //if numbers
  { name: 'ifBigLett', value: true }, //if big letters
];

const staticArrObj = [
  { name: 'rows', value: 15 }, //matrix rows
  { name: 'cols', value: 15 }, //matrix columns
  { name: 'ifSpecialChars', value: -1 }, //the number of special characters a word can have
  { name: 'exmpRegex', value: 'x?zadanie5' }, //sample value
];

const DOMelmObj = {
  labels: [...document.querySelectorAll('label.data')],
  globalObj: [...letArrObj, ...staticArrObj],
  rEgEx: [...document.querySelectorAll('.rEgEx')],
  clearBtns: [...document.querySelectorAll('button.ret, button.cl')],
  boolBtns: [...document.querySelectorAll('button.bool')],
  genBtn: document.querySelector('button.gen'),
  inputs: [...document.querySelectorAll('input')],
  defVal: [...document.querySelectorAll('input, button:not(.gen)')],
  genrtBtns: [...document.querySelectorAll('.insertContent button')],
  disBtns: [...document.querySelectorAll('.insertContent button.doIt')],
  leftGenBtns: [...document.querySelectorAll('.leftCont button')],
  inpIO: [...document.querySelectorAll('input.genrt')],
  errorP: document.querySelector('.alph h1'),
  inputGraph: [...document.querySelectorAll('.gramma.tr')],
  h2Err: document.querySelector('.userInt h2'),
  allBtnNr: [...document.querySelectorAll('.rightCont button:not(:nth-last-of-type(1))')],
};

const FunctObj = {

  //removes duplicate characters and updates input
  removeChars: (string, input = '') => {
    string = string.split('').filter((item, pos, self) => {
      return self.indexOf(item) == pos;
    }).join('');
    !!input ? input.value = string : null;
    return string;
  },

  //copying the content of an object with data and passing it to a variable (lifetime - page reload)
  copyObjects: (flag = true) => {
    const objArr = [DOMelmObj.globalObj, boolArrObj];
    const copyObjArr = [];
    objArr.forEach(obj => copyObjArr.push(JSON.parse(JSON.stringify(obj))));
    return flag ? copyObjArr[0] : copyObjArr[1];
  },

  //dynamically inserting text into a DOM tree element
  insert: (elm, content = '', i = 0) => {
    const ins = document.querySelectorAll(elm)[i];
    ins.textContent = content;
  },

  //dynamic rendering of the selected DOM tree element
  render: (type, parent, i = 0) => {
    const parentEl = document.querySelectorAll(parent)[i];
    const el = document.createElement(type);
    parentEl.appendChild(el);
  },

  //dynamically inserting span elements (content of all characters) into the container
  createAlphabet: () => {
    const allSigns = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`~!@#$%^&*()_-=+{}[];:'\"\\|,<.>/?ε";
    for (let i = 0; i < allSigns.length; i++) {
      FunctObj.render('span', '.alphJS');
      FunctObj.insert('.alphJS span', allSigns[i], i);
    }
  },

  //digit generation (0-9)
  generateNumber: () => {
    const nrArr = [];
    for (let i = 0; i < 10; i++) nrArr.push(i);
    return nrArr.toString().split(',').join('');
  },

  //converting a string of strings to an array and adding an empty character
  convert: str => {
    const arr = [];
    for (let i = 0; i < str.length; i++) arr.push(str[i]);
    return arr.join('');
  },

  //message informing about more special characters than the length of one matrix line (words)
  validateSpecCount: () => {
    if (copyObj[4].value > copyObj[3].value) {
      DOMelmObj.h2Err.style.color = 'orange';
      FunctObj.insert(
        '.userInt h2',
        'Warning! The matrix will generate correctly, but the value will only affect more special characters in the validator.'
      );
    }
  },
};

const copyObj = FunctObj.copyObjects(); //object copy (string)
const copyBoolObj = FunctObj.copyObjects(false); //object copy (boolean)