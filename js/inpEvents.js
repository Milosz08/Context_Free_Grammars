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

const inputsEvents = () => {

  //inserting default values into the input field
  const defaultInputs = labels => {
    Object.keys(copyObj).forEach((key, j) => {
      labels[j].children[0].value = copyObj[j].value;
    });
  }

  //input blocking against entering characters other than assumed (based on rEgExp);
  const checkInput = (el, e) => {
    let exprs;
    el.dataset.id !== '1' ? exprs = '[^a-zA-Z0-9]' : exprs = "[a-z]";
    const rEgExpValue = RegExp(exprs);
    !rEgExpValue.test(e.key) && e.key !== 'Backspace' ? e.preventDefault() : null;
  }

  //inserting the current input value into the grammar value fields (V1, V2, V3, V4)
  const grammaInfos = (i, ev) => {
    DOMelmObj.inputGraph[i].innerHTML = FunctObj.removeChars(ev.target.value);
    if (i === 0) {
      DOMelmObj.inputGraph[3].innerHTML = FunctObj.removeChars(ev.target.value.toUpperCase());
    }
  }

  //inserting user-supplied values from input into a copy of the object
  const inputsListener = (i, e) => {
    if (e.target.value !== '' && i !== 4 && i !== 5) {
      DOMelmObj.boolBtns[1].disabled = false;
      DOMelmObj.boolBtns[1].textContent = 'Active';
      copyBoolObj[1].value = true;
    }
    if (i < 2) {
      copyObj[i].value = e.target.value; //letters and special charaters
      grammaInfos(i, e); //only for input letters and special characters
    }
    i > 1 && i < 5 ? copyObj[i].value = parseInt(e.target.value) : null; //numbers
    i === 5 ? copyObj[i].value = e.target.value : null; //input field for the word to be checked
    FunctObj.validateSpecCount();
  }

  window.addEventListener('load', defaultInputs.bind(null, DOMelmObj.labels));
  DOMelmObj.labels.forEach((el, i) => el.addEventListener('input', inputsListener.bind(null, i)));
  DOMelmObj.rEgEx.forEach(btn => btn.addEventListener('keydown', checkInput.bind(null, btn)));
}