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


//word validator
const validateArr = () => {
  let ifHasSpec = ''; //special characters from the entered word

  let spansArr = [];
  FunctObj.createAlphabet();
  const allSpans = [...document.querySelectorAll('.alphJS span')];

  //generating the entire alphabet in the form of a string (depending on the values entered by the user)
  const fullSignsArray = () => {
    let fullString = '';
    for (let i = 0; i < copyObj.length; i++) {
      !(i > 1 && i < 6) ? fullString += copyObj[i].value : ''; //except for col, line, number of spec characters and entered value
    }
    copyBoolObj[0].value ? fullString += FunctObj.generateNumber() : '';
    copyBoolObj[1].value ? fullString += copyObj[0].value.toUpperCase() : '';
    return fullString;
  }

  //support for the "reset" button (e.g. normalization and restoration of styles)
  const resetBtn = e => {
    spansArr = []; //clearing the board
    allSpans.forEach(el => el.className = '');
    ifHasSpec = ''; //clearing special characters of the entered word
    DOMelmObj.errorP.style.display = 'none';
    preserve('', true, true);
    e.target.disabled = true; //blocking the "reset" button
    DOMelmObj.allBtnNr.forEach(el => el.disabled = false); //clear and default unlock (field)
    for (let i = 0; i < 4; i++) {
      if (i >= 3 && i === 5) {
        DOMelmObj.genrtBtns[i].disabled = false;
      } else if (i === 1) {
        const arr = [DOMelmObj.inpIO[0], DOMelmObj.inpIO[1]];
        for (let j = 0; j < arr.length; j++) {
          arr[j].value = ''; //resetting form fields and copies of the main object
        }
        DOMelmObj.inpIO[i].style.color = '';
      }
    }
  }

  //locking / unlocking buttons (if toggle == false (def) -> lock, if toggle == true -> unlocking)
  const preserve = (e, flag = false, toggle = false) => {
    const instIf = value => {
      !!value
        ? DOMelmObj.disBtns.forEach(btn => btn.disabled = !toggle ? false : true)
        : DOMelmObj.disBtns.forEach(btn => btn.disabled = !toggle ? true : false);
    }
    !flag ? instIf(e.target.value !== '') : instIf(flag);
  }

  //validation and generation of a string based on the alphabet created by the user
  const doInOneMove = choose => {
    const allSpans = [...document.querySelectorAll('.alphJS span')];
    preserve('', true, true); //unlock buttons
    document.querySelectorAll('.rightCont button').forEach(el => el.disabled = true); //blocking clear and default (field)
    let iterator = 0;
    let flag;
    let stringI = DOMelmObj.inpIO[0].value;

    //error message
    const errorMess = (char, allSpans, textValue) => {
      DOMelmObj.genrtBtns[4].disabled = false;
      DOMelmObj.inpIO[1].style.color = 'red';
      DOMelmObj.errorP.style.display = 'block';
      FunctObj.insert('.alph h1', textValue);
      document.querySelector('.alph h1').style.color = 'red';
      letterSelector(char, allSpans).classList.add('alert');
      flag = false;
    }

    //message about positive string generation
    const successMess = () => {
      const arr = [DOMelmObj.inpIO[1], DOMelmObj.errorP];
      spansArr.forEach(el => el.classList.add('active'));
      spansArr.forEach(el => el.classList.add('good'));
      arr.forEach(el => el.style.color = 'green');
      DOMelmObj.errorP.style.display = 'block';
      FunctObj.insert('.alph h1', 'Success! The string you enter meets the rules of the grammar you have created!');
      DOMelmObj.genrtBtns[4].disabled = false;
    }

    //checking if a character belongs to the alphabet (returning the currently supported character)
    const letterSelector = (letter, allSpans) => {
      for (let i = 0; i < allSpans.length; i++) {
        if (allSpans[i].textContent === letter) {
          allSpans[i].classList.add('active');
          return allSpans[i];
        }
      }
    }

    //a recursive algorithm that checks each character of a word entered by the user
    const recursion = () => {
      const char = copyObj[5].value[iterator];

      spansArr.push(letterSelector(char, allSpans)); //checking a span into an array object
      allSpans.forEach(el => el.className = '');
      stringI = stringI.substring(1, copyObj[5].value.length); //cutting a character from input IN
      letterSelector(char, allSpans);

      DOMelmObj.inpIO[0].value = stringI;
      DOMelmObj.inpIO[1].value += char;

      if (copyObj[4].value > -1) { //adding special characters to the string
        copyObj[1].value.includes(char) ? ifHasSpec += char : ifHasSpec += '';
      }

      // if the string has no grammar members; if so -> end
      if (!fullSignsArray().includes(char)) {
        errorMess(
          char, allSpans,
          'Error! This character does not appear in the grammar you created!'
        );
        return null;
      } else if (iterator === 0) {
        //whether 1 character is a number or a special character; if so -> end
        if (FunctObj.generateNumber().includes(char) || copyObj[1].value.includes(char)) {
          errorMess(
            char, allSpans,
            'Error! The first character cannot be a number or a special character!'
          );
          return null;
        }
      } else if (iterator === copyObj[5].value.length - 1) {
        //whether the last character is a special character; if so -> end
        if (copyObj[1].value.includes(char)) { 
          errorMess(
            char, allSpans,
            'Error! The last character cannot be a special character!'
          );
          return null;
        }
        //if there are too many special characters in the string; if so -> end
      } else if ((ifHasSpec.length > copyObj[4].value) && copyObj[4].value !== -1) { 
        errorMess(
          char, allSpans,
          `Error! According to the rules of this grammar, a word cannot contain 
            ${copyObj[4].value === 0 
              ? 'special characters!' 
              : 'more than ' + copyObj[4].value} ${copyObj[4].value > 0 
                ? 'special characters!' : ''}`
        );
        return null;
      }

      iterator++;
      if (iterator !== copyObj[5].value.length) { //recursion (performed as many times as the string has characters)
        switch (choose) {
          case false: setTimeout(recursion, 200); break; //step by step
          case true: recursion(); break; //in one move
        }
      } else { //end of recursion
        flag = true;
        return null;
      }
    }

    recursion();
    setTimeout(() => flag ? successMess() : null, 200 * (DOMelmObj.inpIO[0].value.length + 1) + 150); //sukcess message
  }

  //operation of the control buttons
  const btnsIO = e => {
    const selector = e.target.textContent;
    let switcher = false;
    if (selector.includes('Do it')) {
      if (selector.includes('step')) switcher = false; //step by step
      else if (selector.includes('immediately')) switcher = true; //in one move
      doInOneMove(switcher);
    } else if (selector === 'Reset') { //reset
      resetBtn(e);
    } else if (selector === 'Default value') { //default
      preserve('', true);
    } else if (selector === 'Clear field') { //clear input IN
      preserve('', true, true);
    }
  }

  DOMelmObj.inpIO[0].addEventListener('input', preserve);
  DOMelmObj.genrtBtns.forEach(btn => btn.addEventListener('click', btnsIO));
}
