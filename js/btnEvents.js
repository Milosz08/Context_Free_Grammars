/**
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

const buttonsEvents = () => {

  //obsługa przycisków (typ string/number)
  const inputsBtnsFunc = (labels, i, e) => {

    //tylko dla przycisków liter i znaków specjalnych (zmiana stanu)
    const buttonSwitch = (state, text, onClick) => {
      if (i === 0 || i === 1) {
        copyBoolObj[1].value = state;
        DOMelmObj.boolBtns[1].textContent = text;
        DOMelmObj.boolBtns[1].disabled = onClick;
      }
    }

    //obsługa przycisków "wyczyść" i "domyślnie".
    const relatInputs = (el, itL = 1, itO = 1) => {
      if (el.classList.contains('cl')) { //wyczyść
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
        buttonSwitch(false, 'Wyłączone', true);
      } else { //domyślnie
        labels[itL].children[0].value = DOMelmObj.globalObj[itL].value;
        copyObj[itL].value = DOMelmObj.globalObj[itL].value;
        itL !== 4 && itL !== 5 ? DOMelmObj.inputGraph[itL].innerHTML = FunctObj.convert(DOMelmObj.globalObj[itL].value) : null;
        buttonSwitch(true, 'Włączone', false);
      }
    }

    //obsługa wszystkich przycisów
    const buttonServ = () => {
      const el = e.target;
      if (i < 2) { //litery
        relatInputs(el, i - 1, i);
        if (i === 1) {
          DOMelmObj.inputGraph[3].innerHTML = copyObj[0].value.toUpperCase();
        }
      } else if (i > 1 && i < 4) { //znaki specjalne
        relatInputs(el);
      } else { //wprowadż swoje słowo
        relatInputs(el, i, i + 1);
      }
    }
    buttonServ();
  }

  //obsługa przycisków (typ boolean)
  const boolBtnsFunc = (i, e) => {

    //usuwanie i dodawanie kontentu (cyfry, wielkie litery)
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
    e.target.textContent = `${copyBoolObj[i].value ? 'Włączone' : 'Wyłączone'}`;
  }

  DOMelmObj.clearBtns.forEach((el, i) => el.addEventListener('click', inputsBtnsFunc.bind(null, DOMelmObj.labels, i)));
  DOMelmObj.boolBtns.forEach((el, i) => el.addEventListener('click', boolBtnsFunc.bind(null, i)));
}