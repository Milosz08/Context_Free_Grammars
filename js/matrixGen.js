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

//matrix generation
const grammarArr = () => {
  const LogicFuncObj = {

    //checking the number of arguments and generating a grammar string based on it
    getCharValue: (...args) => {
      const argsSwitch = (
        argsArr, retArr, pushNr,
        pushCharL, pushCharS = copyObj[0].value,
        pushSpec = copyObj[1].value
      ) => {
        argsArr.forEach((arg, i) => {
          switch (arg) {
            case 'spec': retArr.push(pushSpec); break;
            case 'number': retArr.push(pushNr); break;
            case 'charL': retArr.push(pushCharL); break;
            case 'charS': retArr.push(pushCharS); break;
          }
        });
      }
      let retArr = [];
      if (args.length <= 4) {
        if (copyBoolObj[0].value && copyBoolObj[1].value) {
          argsSwitch(args, retArr, FunctObj.generateNumber(), copyObj[0].value.toUpperCase());
        } else if (copyBoolObj[0].value && !copyBoolObj[1].value) {
          argsSwitch(args, retArr, FunctObj.generateNumber(), '');
        } else if (!copyBoolObj[0].value && copyBoolObj[1].value) {
          argsSwitch(args, retArr, '', copyObj[0].value.toUpperCase());
        } else {
          argsSwitch(args, retArr, '', '');
        }
      } else throw new Error('Too many arguments!');
      return retArr.join('');
    },

    //character generation (pseudorandom) based on the string length
    randProd: (arrayS, arrayG) => {
      let sign;
      if (arrayS.length !== 0) {
        sign = Math.floor(Math.random() * arrayS.length);
        arrayG.push(arrayS[sign]);
      } else arrayG.push('ε');
    },

    //validation of data entered by the user (if error - returns null object - end of action)
    checkValues: () => {
      console.log(copyObj[2].value.toString());
      if (copyObj[0].value === '' && copyObj[1].value === '' && !copyBoolObj[0].value) {
        DOMelmObj.h2Err.style.color = 'orange';
        FunctObj.insert(
          '.userInt h2', 
          'Warning! The generated matrix does not contain any characters!'
        );
        return null;
      } else if (copyObj[2].value <= 0 || copyObj[3].value <= 0) {
        FunctObj.insert(
          '.userInt h2', 
          '\nError! Attempting to generate a matrix from a number less than or equal to zero!'
        );
        DOMelmObj.h2Err.style.color = 'red';
        return null;
      } else if(isNaN(parseFloat(copyObj[2].value)) || isNaN(parseFloat(copyObj[3].value))) {
        FunctObj.insert(
          '.userInt h2', 
          '\nError! An attempt to generate a matrix on the basis of empty edit fields!'
        );
        DOMelmObj.h2Err.style.color = 'red';
        return null;
      }
    },

    //inserting into the value of input a corrected string (if it contained unnecessary characters)
    inputInsert: () => {
      for (let i = 0; i < 2; i++) {
        copyObj[i].value = FunctObj.removeChars(copyObj[i].value, document.querySelectorAll('.rEgEx')[i]);
      }
    },

    //removing the DOM element after each action (click) on the button that triggers the creation of a new matrix
    deleteDOM: () => {
      document.querySelector('.wrapper').children[1] != undefined
        ? document.querySelector('.matrix .wrapper ul').remove() : null;
    },

    //checking if value is a sign, if yes, added to the array
    checkSpecialChar: (sgn, stack) => {
      for (let k = 0; k < copyObj[1].value.length; k++) {
        if (sgn === copyObj[1].value[k]) {
          stack.push(sgn);
        }
      }
    },

    //rendering a matrix of random values
    randGenerate: () => {
      let matrix = []; //single-line array
      let stack = []; //special characters table
      let flag = false;
      FunctObj.render('ul', '.matrix .wrapper');
      for (let i = 0; i < copyObj[2].value; i++) {
        FunctObj.render('li', '.matrix .wrapper ul');
        for (let j = 0; j < copyObj[3].value; j++) {
          switch (j) {
            case 0: //first matrix column
              LogicFuncObj.randProd(
                LogicFuncObj.getCharValue('charS', 'charL'), 
                matrix
              ); break;
            case copyObj[3].value - 1: //last matrix column
              LogicFuncObj.randProd(
                LogicFuncObj.getCharValue('charS', 'charL', 'number'), 
                matrix
              ); break;
            default: //rest of the columns
              !flag //if false -> special characters, if true -> no special characters
                ? LogicFuncObj.randProd(
                    LogicFuncObj.getCharValue('charS', 'charL', 'number', 'spec'), 
                    matrix
                  )
                : LogicFuncObj.randProd(
                    LogicFuncObj.getCharValue('charS', 'charL', 'number'), 
                    matrix
                  );
              break;
          }
          const sgn = matrix[j];
          stack.length !== -1 ? LogicFuncObj.checkSpecialChar(sgn, stack) : null;
          stack.length === copyObj[4].value ? flag = true : flag = false;

          FunctObj.render('span', '.matrix .wrapper ul > li', i);
          FunctObj.insert(
            `.matrix .wrapper ul > li:nth-child(${i + 1}) span`, 
            `${matrix[j]}`, 
            j
          );
        }
        flag = false;
        matrix = []; //resetting the sleep table
        stack = []; //clearing an array of special characters
      }
    },
  }

  //function support (content generation and validation)
  const generateContent = () => {
    LogicFuncObj.inputInsert(); //structure generation
    LogicFuncObj.deleteDOM(); //structure deletion
    LogicFuncObj.checkValues(); //data validation
    LogicFuncObj.randGenerate(); //content generation
  }
  DOMelmObj.genBtn.addEventListener('click', generateContent);
  //resetting the error message
  DOMelmObj.defVal.forEach(item => item.addEventListener('click', () => FunctObj.insert('.userInt h2', '')));
  LogicFuncObj.randGenerate(); //generation of a default matrix each time the page is reloaded
}
