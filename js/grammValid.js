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

//walidator słowa
const validateArr = () => {
  let ifHasSpec = ''; //znaki specjalne z wprowadzonego słowa

  let spansArr = [];
  FunctObj.createAlphabet();
  const allSpans = [...document.querySelectorAll('.alphJS span')];

  //generowanie całego alfabetu w formie stringa (zależne od wartości wprowadzonych przez użytkownika)
  const fullSignsArray = () => {
    let fullString = '';
    for (let i = 0; i < copyObj.length; i++) {
      !(i > 1 && i < 6) ? fullString += copyObj[i].value : ''; //oprócz kol, wier, ilości znaków spec i wart wprowadzonej
    }
    copyBoolObj[0].value ? fullString += FunctObj.generateNumber() : '';
    copyBoolObj[1].value ? fullString += copyObj[0].value.toUpperCase() : '';
    return fullString;
  }

  //obsługa przycisku "reset" (m. in. normalizacja i przywrócenie styli)
  const resetBtn = e => {
    spansArr = []; //czyszczenie tablicy
    allSpans.forEach(el => el.className = '');
    ifHasSpec = ''; //czyszczenie znaków specjalnych wprowadzanego słowa
    DOMelmObj.errorP.style.display = 'none';
    preserve('', true, true);
    e.target.disabled = true; //zablokowanie przycisku "reset"
    DOMelmObj.allBtnNr.forEach(el => el.disabled = false); //odblokowanie wyczyść i domyślna (pole)
    for (let i = 0; i < 4; i++) {
      if (i >= 3 && i === 5) {
        DOMelmObj.genrtBtns[i].disabled = false;
      } else if (i === 1) {
        const arr = [DOMelmObj.inpIO[0], DOMelmObj.inpIO[1]];
        for (let j = 0; j < arr.length; j++) {
          arr[j].value = ''; //zerowanie pól formularzy i kopii objektu głównego
        }
        DOMelmObj.inpIO[i].style.color = '';
      }
    }
  }

  //blokowanie/odblokowywanie przycisków (jeśli toggle == false(def) -> blokada, jeśli toggle == true -> odblokowanie)
  const preserve = (e, flag = false, toggle = false) => {
    const instIf = value => {
      !!value
        ? DOMelmObj.disBtns.forEach(btn => btn.disabled = !toggle ? false : true)
        : DOMelmObj.disBtns.forEach(btn => btn.disabled = !toggle ? true : false);
    }
    !flag ? instIf(e.target.value !== '') : instIf(flag);
  }

  //walidacja oraz generacja ciągu znaków na podstawie alfabetu stworzonego przez użytkownika
  const doInOneMove = choose => {
    const allSpans = [...document.querySelectorAll('.alphJS span')];
    preserve('', true, true); //odblokowanie przycisków
    document.querySelectorAll('.rightCont button').forEach(el => el.disabled = true); //zablokowanie wyczyść i domyślna (pole)
    let iterator = 0;
    let flag;
    let stringI = DOMelmObj.inpIO[0].value;

    //wiadomość błędu
    const errorMess = (char, allSpans, textValue) => {
      DOMelmObj.genrtBtns[4].disabled = false;
      DOMelmObj.inpIO[1].style.color = 'red';
      DOMelmObj.errorP.style.display = 'block';
      FunctObj.insert('.alph h1', textValue);
      document.querySelector('.alph h1').style.color = 'red';
      letterSelector(char, allSpans).classList.add('alert');
      flag = false;
    }

    //wiadomość o pozytywnym wygenerowaniu ciągu
    const successMess = () => {
      const arr = [DOMelmObj.inpIO[1], DOMelmObj.errorP];
      spansArr.forEach(el => el.classList.add('active'));
      spansArr.forEach(el => el.classList.add('good'));
      arr.forEach(el => el.style.color = 'green');
      DOMelmObj.errorP.style.display = 'block';
      FunctObj.insert('.alph h1', 'Powodzenie! Wprowadzony przez Ciebie ciąg spełnia zasady stworzonej przez Ciebie gramatyki!');
      DOMelmObj.genrtBtns[4].disabled = false;
    }

    //sprawdzenie, czy znak należy do alfabetu (zwrócenie aktualnie obsługiwanego znaku)
    const letterSelector = (letter, allSpans) => {
      for (let i = 0; i < allSpans.length; i++) {
        if (allSpans[i].textContent === letter) {
          allSpans[i].classList.add('active');
          return allSpans[i];
        }
      }
    }

    //algorytm rekurencyjny sprawdzający każdy znak wyrazu wpisanego przez użytkownika
    const recursion = () => {
      const char = copyObj[5].value[iterator];

      spansArr.push(letterSelector(char, allSpans)); //odkładanie elementu span do obiektu tablicy
      allSpans.forEach(el => el.className = '');
      stringI = stringI.substring(1, copyObj[5].value.length); //wycinanie znaku z input IN
      letterSelector(char, allSpans);

      DOMelmObj.inpIO[0].value = stringI;
      DOMelmObj.inpIO[1].value += char;

      if (copyObj[4].value > -1) { //dodawanie znaków specjalnych do stringa
        copyObj[1].value.includes(char) ? ifHasSpec += char : ifHasSpec += '';
      }

      if (!fullSignsArray().includes(char)) { //jeśli ciąg nie zawiera składowych gramatyki; jeśli tak -> end
        errorMess(
          char, allSpans,
          'Błąd! Ten znak nie występuje w stworzonej przez Ciebie gramatyce!'
        );
        return null;
      } else if (iterator === 0) { //czy 1 znak to liczba lub znak specjalny; jeśli tak -> end
        if (FunctObj.generateNumber().includes(char) || copyObj[1].value.includes(char)) {
          errorMess(
            char, allSpans,
            'Błąd! Pierwszy znak nie może być liczbą lub znakiem specjalnym!'
          );
          return null;
        }
      } else if (iterator === copyObj[5].value.length - 1) {
        if (copyObj[1].value.includes(char)) { //czy ostatni znak to znak specjalny; jeśli tak -> end
          errorMess(
            char, allSpans,
            'Błąd! Ostatni znak nie może być znakiem specjalnym!'
          );
          return null;
        }
      } else if ((ifHasSpec.length > copyObj[4].value) && copyObj[4].value !== -1) { //jeśli w ciągu występuje za dużo znaków specjalnych; jeśli tak -> end
        errorMess(
          char, allSpans,
          `Błąd! Według zasad tej gramatyki słowo nie może zawierać ${copyObj[4].value === 0 ? 'znaków specjalnych!' : 'więcej niż ' + copyObj[4].value} ${copyObj[4].value > 0 ? 'znaków specjalnych!' : ''}`
        );
        return null;
      }

      iterator++;
      if (iterator !== copyObj[5].value.length) { //rekurencja (wykonuje się tyle razy ile ciąg posiada znaków)
        switch (choose) {
          case false: setTimeout(recursion, 200); break; //jeden ruch
          case true: recursion(); break; //błyskawicznie
        }
      } else { //koniec rekurencji
        flag = true;
        return null;
      }
    }

    recursion();
    setTimeout(() => flag ? successMess() : null, 200 * (DOMelmObj.inpIO[0].value.length + 1) + 150); //wiadomość sukces
  }

  //obłsuga przycisków sterujących
  const btnsIO = e => {
    const selector = e.target.textContent;
    let switcher = false;
    if (selector.includes('Wykonanie')) {
      if (selector.includes('krok')) switcher = false; //jeden ruch
      else if (selector.includes('natychmiastowe')) switcher = true; //błyskawicznie
      doInOneMove(switcher);
    } else if (selector === 'Reset') { //reset
      resetBtn(e);
    } else if (selector === 'Domyślna wartość') { //domyślnie
      preserve('', true);
    } else if (selector === 'Wyczyść pole') { //czyszczenie inputu IN
      preserve('', true, true);
    }
  }

  DOMelmObj.inpIO[0].addEventListener('input', preserve);
  DOMelmObj.genrtBtns.forEach(btn => btn.addEventListener('click', btnsIO));
}
