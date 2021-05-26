/*!
 * Generator macierzy zapełnionych znakami pseudolosowymi na podstawie gramatyki wybranej przez użytkownika.
 * Sprawdzanie, czy wpisane przez użytkownika słowo mieści się w zakresie podanej przez niego gramatyki.
 *
 * Skrypty w całości zostały napisane w czystym JavaScript zgodny ze standardem EcmaScript6
 * przez Miłosz Gilga (https://github.com/Milosz08).
 * 
 * ++++++++++++++++++++++++++++++++++++++++++(v1.0)++++++++++++++++++++++++++++++++++++++++++
 * możliwość zmiany liter, znaków specjalnych,
 * przełączniki dwustanowe: "czy wielkie litery", "czy liczby",
 * możliwość zmiany rozmiaru macierzy (ilość wierszy i kolumn),
 * możliwość wpisania dowolnego tekstu przez użytkownika,
 * możliwość ustawienia maksymalnej ilości znaków specjalnych w pojedyńczym słowie
 * sprawdzanie, czy wpisany tekst mieści się w zakresie znaków gramatyki i spełnia jej kryteria
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * 
 * Główne założenia:
 * - pierwsza kolumna macierzy (pierwszy znak słowa) nie może być cyfrą ani znakiem specjalnym,
 * - ostatnia kolumna macierzy (ostatni znak słowa) nie może kończyć się znakiem specjalnym,
 */

//generacja macierzy
const grammarArr = () => {
  const LogicFuncObj = {

    //sprawdzanie ilości argumentów i generowanie na jej podstawie łańcucha znaków gramatyki
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
      } else throw new Error('Podano zbyt dużo argumentów!');
      return retArr.join('');
    },

    //generacja znaków (pseudolosowy) na podstawie długości łańcucha znaków
    randProd: (arrayS, arrayG) => {
      let sign;
      if (arrayS.length !== 0) {
        sign = Math.floor(Math.random() * arrayS.length);
        arrayG.push(arrayS[sign]);
      } else arrayG.push('ε');
    },

    //walidacja danych wprowadzonych przez użytkownika (jeśli błąd - zwraca null object - koniec działania)
    checkValues: () => {
      console.log(copyObj[2].value.toString());
      if (copyObj[0].value === '' && copyObj[1].value === '' && !copyBoolObj[0].value) {
        DOMelmObj.h2Err.style.color = 'orange';
        FunctObj.insert('.userInt h2', 'Uwaga! Wygenerowana macierz nie zawiera żadnych znaków!');
        return null;
      } else if (copyObj[2].value <= 0 || copyObj[3].value <= 0) {
        FunctObj.insert('.userInt h2', '\nBłąd! Próba wygenerowania macierzy na podstawie liczby mniejszej lub równej zero!');
        DOMelmObj.h2Err.style.color = 'red';
        return null;
      } else if(isNaN(parseFloat(copyObj[2].value)) || isNaN(parseFloat(copyObj[3].value))) {
        FunctObj.insert('.userInt h2', '\nBłąd! Próba wygenerowania macierzy na podstawie pustych pól edycyjnych!');
        DOMelmObj.h2Err.style.color = 'red';
        return null;
      }
    },

    //wstawianie w wartość inputa poprawiony string (jeśli zawierał niepotrzebne znaki)
    inputInsert: () => {
      for (let i = 0; i < 2; i++) {
        copyObj[i].value = FunctObj.removeChars(copyObj[i].value, document.querySelectorAll('.rEgEx')[i]);
      }
    },

    //usuwanie elementu DOM po każej akcji (kliku) w przycisk wywołujący stworzenie nowej macierzy
    deleteDOM: () => {
      document.querySelector('.wrapper').children[1] != undefined
        ? document.querySelector('.matrix .wrapper ul').remove() : null;
    },

    //sprawdzenie, czy wartość to znak, jeśli tak, dodawana do tablicy
    checkSpecialChar: (sgn, stack) => {
      for (let k = 0; k < copyObj[1].value.length; k++) {
        if (sgn === copyObj[1].value[k]) {
          stack.push(sgn);
        }
      }
    },

    //renderowanie macierzy losowych wartości
    randGenerate: () => {
      let matrix = []; //tablica pojedyńczego wiersza
      let stack = []; //tablica znaków specjalnych
      let flag = false;
      FunctObj.render('ul', '.matrix .wrapper');
      for (let i = 0; i < copyObj[2].value; i++) {
        FunctObj.render('li', '.matrix .wrapper ul');
        for (let j = 0; j < copyObj[3].value; j++) {
          switch (j) {
            case 0: //pierwsza kolumna macierzy
              LogicFuncObj.randProd(LogicFuncObj.getCharValue('charS', 'charL'), matrix); break;
            case copyObj[3].value - 1: //ostatnia kolumna macierzy
              LogicFuncObj.randProd(LogicFuncObj.getCharValue('charS', 'charL', 'number'), matrix); break;
            default: //reszta kolumn
              !flag //jeśli false -> znaki specjalne, jeśli true -> bez znaków specjalnych
                ? LogicFuncObj.randProd(LogicFuncObj.getCharValue('charS', 'charL', 'number', 'spec'), matrix)
                : LogicFuncObj.randProd(LogicFuncObj.getCharValue('charS', 'charL', 'number'), matrix);
              break;
          }
          const sgn = matrix[j];
          stack.length !== -1 ? LogicFuncObj.checkSpecialChar(sgn, stack) : null;
          stack.length === copyObj[4].value ? flag = true : flag = false;

          FunctObj.render('span', '.matrix .wrapper ul > li', i);
          FunctObj.insert(`.matrix .wrapper ul > li:nth-child(${i + 1}) span`, `${matrix[j]}`, j);
        }
        flag = false;
        matrix = []; //zerowanie tablicy spanów
        stack = []; //zerowanie tablicy znaków specjalnych
      }
    },
  }

  //obsługa funkcji (generowanie i walidacja kontentu)
  const generateContent = () => {
    LogicFuncObj.inputInsert(); //generacja struktury
    LogicFuncObj.deleteDOM(); //usuwanie struktury
    LogicFuncObj.checkValues(); //walidacja danych
    LogicFuncObj.randGenerate(); //generacja kontentu
  }
  DOMelmObj.genBtn.addEventListener('click', generateContent);
  //zerowanie komunikatu o błędzie
  DOMelmObj.defVal.forEach(item => item.addEventListener('click', () => FunctObj.insert('.userInt h2', '')));
  LogicFuncObj.randGenerate(); //generacja domyślnej macierzy przy każdym przeładowaniu strony
}