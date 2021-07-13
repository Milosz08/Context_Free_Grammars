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

const buttonsEvents = () => {

  //button support (type string / number)
  const inputsBtnsFunc = (labels, i, e) => {

    //only for letter buttons and special characters (status change)
    const buttonSwitch = (state, text, onClick) => {
      if (i === 0 || i === 1) {
        copyBoolObj[1].value = state;
        DOMelmObj.boolBtns[1].textContent = text;
        DOMelmObj.boolBtns[1].disabled = onClick;
      }
    }

    //support for "clear" and "default" buttons.
    const relatInputs = (el, itL = 1, itO = 1) => {
      if (el.classList.contains('cl')) { //clear
        labels[itO].children[0].value = '';
        copyObj[itO].value = '';
        if (itO !== 4 && itO !== 5) {
          if (itO === 0) {
            const arr = [DOMelmObj.inputGraph[itO], DOMelmObj.inputGraph[3]];
            arr.forEach(el => el.innerHTML = '');
          } else if (itO === 1) {
            DOMelmObj.inputGraph[1].innerHTML = '';
          }
        }
        buttonSwitch(false, 'Inactive', true);
      } else { //default
        labels[itL].children[0].value = DOMelmObj.globalObj[itL].value;
        copyObj[itL].value = DOMelmObj.globalObj[itL].value;
        itL !== 4 && itL !== 5 ? DOMelmObj.inputGraph[itL].innerHTML = FunctObj.convert(DOMelmObj.globalObj[itL].value) : null;
        buttonSwitch(true, 'Active', false);
      }
    }

    //support for all buttons
    const buttonServ = () => {
      const el = e.target;
      if (i < 2) { //letters
        relatInputs(el, i - 1, i);
        if (i === 1) {
          DOMelmObj.inputGraph[3].innerHTML = copyObj[0].value.toUpperCase();
        }
      } else if (i > 1 && i < 4) { //special characters
        relatInputs(el);
      } else { //insert you word
        relatInputs(el, i, i + 1);
      }
    }
    buttonServ();
  }

  //button support (boolean type)
  const boolBtnsFunc = (i, e) => {

    //removing and adding content (numbers, capital letters)
    const innerHtmlSwitch = (el, toConvert) => {
      !copyBoolObj[i].value
        ? DOMelmObj.inputGraph[el].innerHTML = FunctObj.removeChars(FunctObj.convert(toConvert))
        : DOMelmObj.inputGraph[el].innerHTML = '';
    }
    switch (i) {
      case 0: innerHtmlSwitch(2, FunctObj.generateNumber()); break;
      case 1: innerHtmlSwitch(3, copyObj[0].value.toUpperCase()); break;
    }
    copyBoolObj[i].value = !copyBoolObj[i].value;
    e.target.textContent = `${copyBoolObj[i].value ? 'Active' : 'Inactive'}`;
  }

  DOMelmObj.clearBtns.forEach((el, i) => el.addEventListener('click', inputsBtnsFunc.bind(null, DOMelmObj.labels, i)));
  DOMelmObj.boolBtns.forEach((el, i) => el.addEventListener('click', boolBtnsFunc.bind(null, i)));
}