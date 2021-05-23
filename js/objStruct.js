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

const letArrObj = [
  { name: 'charsRegex', value: 'abcdefghijklmnopqrstuvwxyz' }, //litery
  { name: 'specRegex', value: "`~!@#$%^&*()_-=+{}[];:'\\\"|,<.>/\?" }, //znaki specjalne
];

const boolArrObj = [
  { name: 'ifNumb', value: true }, //czy cyfry
  { name: 'ifBigLett', value: true }, //czy wielkie litery
];

const staticArrObj = [
  { name: 'rows', value: 15 }, //liczba kolumn
  { name: 'cols', value: 15 }, //liczba wierszy
  { name: 'ifSpecialChars', value: -1 }, //ilość znaków specjalnych, które może mieć słowo
  { name: 'exmpRegex', value: 'x?zadanie5' }, //przykładowa wartość
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

  //usuwa zduplikowane znaki i aktualizuje input
  removeChars: (string, input = '') => {
    string = string.split('').filter((item, pos, self) => {
      return self.indexOf(item) == pos;
    }).join('');
    !!input ? input.value = string : null;
    return string;
  },

  //kopiowanie zawartości objektu z danymi i przekazanie jej do zmiennej (okres życia - przeładowanie strony)
  copyObjects: (flag = true) => {
    const objArr = [DOMelmObj.globalObj, boolArrObj];
    const copyObjArr = [];
    objArr.forEach(obj => copyObjArr.push(JSON.parse(JSON.stringify(obj))));
    return flag ? copyObjArr[0] : copyObjArr[1];
  },

  //dynamiczne wstawianie tekstu do elementu drzewa DOM
  insert: (elm, content = '', i = 0) => {
    const ins = document.querySelectorAll(elm)[i];
    ins.textContent = content;
  },

  //dynamiczne renderowanie wybranego elementu drzewa DOM
  render: (type, parent, i = 0) => {
    const parentEl = document.querySelectorAll(parent)[i];
    const el = document.createElement(type);
    parentEl.appendChild(el);
  },

  //dynamiczne wstawianie elementów span (zawartości wszystkich znaków) do kontenera
  createAlphabet: () => {
    const allSigns = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`~!@#$%^&*()_-=+{}[];:'\"\\|,<.>/?ε";
    for (let i = 0; i < allSigns.length; i++) {
      FunctObj.render('span', '.alphJS');
      FunctObj.insert('.alphJS span', allSigns[i], i);
    }
  },

  //generacja cyfr (0-9)
  generateNumber: () => {
    const nrArr = [];
    for (let i = 0; i < 10; i++) nrArr.push(i);
    return nrArr.toString().split(',').join('');
  },

  //konwersja łańcucha stringów na tablicę i dodawanie pustego znaku
  convert: str => {
    const arr = [];
    for (let i = 0; i < str.length; i++) arr.push(str[i]);
    return arr.join('');
  },

  //wiadomość informująca o więszej ilości znaków specjalnych niż długość jednej linii macierzy (słowa)
  validateSpecCount: () => {
    if (copyObj[4].value > copyObj[3].value) {
      DOMelmObj.h2Err.style.color = 'orange';
      FunctObj.insert(
        '.userInt h2',
        'Uwaga! Macierz wygeneruje się poprawnie, lecz wartość wpłynie jedynie na większą ilość znaków specjalnych w walidatorze.'
      );
    }
  },
};

const copyObj = FunctObj.copyObjects(); //kopia obiektu (string)
const copyBoolObj = FunctObj.copyObjects(false); //kopia obiektu (boolean)