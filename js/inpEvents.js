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

const inputsEvents = () => {

  //wstawianie domyślnych wartości w pole inputów
  const defaultInputs = labels => {
    Object.keys(copyObj).forEach((key, j) => {
      labels[j].children[0].value = copyObj[j].value;
    });
  }

  //blokada inputu przeciw wprowadzaniu znaków innych niż założono (na podstawie rEgExp);
  const checkInput = (el, e) => {
    let exprs;
    el.dataset.id !== '1' ? exprs = '[^a-zA-Z0-9]' : exprs = "[a-z]";
    const rEgExpValue = RegExp(exprs);
    !rEgExpValue.test(e.key) && e.key !== 'Backspace' ? e.preventDefault() : null;
  }

  //wstawianie aktualnej wartości inputa w pola wartości gramatyki (V1, V2, V3, V4)
  const grammaInfos = (i, ev) => {
    DOMelmObj.inputGraph[i].innerHTML = FunctObj.removeChars(ev.target.value);
    if (i === 0) {
      DOMelmObj.inputGraph[3].innerHTML = FunctObj.removeChars(ev.target.value.toUpperCase());
    }
  }

  //wstawianie wartości pisanych przez użytkownika z inputu do kopii objektu
  const inputsListener = (i, e) => {
    if (e.target.value != '' && i !== 4 && i !== 5) {
      DOMelmObj.boolBtns[1].disabled = false;
      DOMelmObj.boolBtns[1].textContent = 'Włączone';
      copyBoolObj[1].value = true;
    }
    if (i < 2) {
      copyObj[i].value = e.target.value; //litery i zn specjalne
      grammaInfos(i, e); //tylko dla inp litery i znaki specjalne
    }
    i > 1 && i < 5 ? copyObj[i].value = parseInt(e.target.value) : null; //cyfry
    i === 5 ? copyObj[i].value = e.target.value : null; //pole wprowadzania słowa do sprawdzenia
    FunctObj.validateSpecCount();
  }

  window.addEventListener('load', defaultInputs.bind(null, DOMelmObj.labels));
  DOMelmObj.labels.forEach((el, i) => el.addEventListener('input', inputsListener.bind(null, i)));
  DOMelmObj.rEgEx.forEach(btn => btn.addEventListener('keydown', checkInput.bind(null, btn)));
}