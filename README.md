# Gramatyki bezkontekstowe

### Generator macierzy wypełnionych pseudolosowymi znakami gramatyki wybranej przez użytkownika oraz walidator nazwy wprowadzanej przez użytkownika, czy mieści się w zakresie gramatyki wygenerowanej na podstawie wartości w polu edycyjnym.

## Główne założenia:
* Znaki gramatyki mogą składać się z liter, cyfr oraz znaków specjalnych (domyślnie program przydziela pełny alfabet `abcdefghijklmnopqrstuvwxyz` oraz wszystkie znaki specjalne `` `~!@#$%^&*()_-=+{}[];:'\"|,<.>/?``, a liczby i wielkie litery ustawione są na "true").
* Pierwsza kolumna macierzy (pierwszy znak w wyrazie) nie może zawierać cyfry lub znaku specjalnego.
* Ostatnia kolumna macierzy (ostatni znak w wyrazie) nie może zawierać znaku specjalnego.

## Macierz jako zilustrowanie przykładowych ciągów gramatyki
Komputer z natury nie jest w stanie wygenerować uporządkowanego słowa, toteż rozwiązanie generowania słów oparłem na pseudolosowej macierzy, w której każdy wiersz to jedno słowo składające się z wygenerowanych znaków (generowanych na podstawie instrukcji podanych przez użytkownika).

![Screenshot](src/img1.png)
