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

inputsEvents();
buttonsEvents();
grammarArr(); //generator macierzy
validateArr(); //walidator ciągu