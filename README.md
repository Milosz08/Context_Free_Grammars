# Gramatyki

### Generator macierzy wypełnionych pseudolosowymi znakami gramatyki wybranej przez użytkownika oraz walidator nazwy wprowadzanej przez użytkownika, czy mieści się w zakresie gramatyki wygenerowanej na podstawie wartości w polu edycyjnym.

## Główne założenia:
* Znaki gramatyki mogą składać się z liter, cyfr oraz znaków specjalnych (domyślnie program przydziela pełny alfabet `abcdefghijklmnopqrstuvwxyz` oraz wszystkie znaki specjalne `` `~!@#$%^&*()_-=+{}[];:'\"|,<.>/?``, a liczby i wielkie litery ustawione są na "true").
* Pierwsza kolumna macierzy (pierwszy znak w wyrazie) nie może zawierać cyfry lub znaku specjalnego.
* Ostatnia kolumna macierzy (ostatni znak w wyrazie) nie może zawierać znaku specjalnego.

# Macierz jako zilustrowanie przykładowych ciągów gramatyki
Komputer z natury nie jest w stanie wygenerować uporządkowanego słowa, toteż rozwiązanie generowania słów oparłem na macierzy zapełnionej generowanymi pseudolosowo znakami, w której każdy wiersz to jedno słowo składające się z wygenerowanych znaków (generowanych na podstawie instrukcji podanych przez użytkownika).

![img1](https://user-images.githubusercontent.com/61552854/119264429-6e740680-bbe3-11eb-9dc3-cade0dfafb6d.PNG)

Kolorem cyjanowy w tej macierzy zaznaczyłem jeden ciąg gramatyki (jedno słowo), które jest jednym wierszem macierzy. Ilość znaków w słowie zależna jest od ilości kolumn macierzy. Jak można zauważyć, wszyskie wiersze są zgodne z przyjętymi wyżej zasadami tworzenia ciągów gramatyki.

## Sterowanie

![img2](https://user-images.githubusercontent.com/61552854/119259205-6a3cee80-bbcd-11eb-9c4e-d92f3192405e.png)

### Użytkownik może edytować:
* Litery alfabetu oraz znaki specjalne.
* Liczbę wierszy lub kolumn w generowanej macierzy (przy czym: k > 0 && w > 0, gdzie k - liczba kolumn, w - liczba wierszy).
* To, czy gramatyka może posiadać cyfry i/lub wielkie litery.
* Ilość znaków specjalnych jakie może posiadać jedno słowo, przy czym jeśli ilość < 0, będzie oznaczać to że liczba znaków jest pozornie nieograniczona (ograniczać ją w macierzy może jedynie ilość kolumn).

# Walidator sprawdzający poprawność prowadzanego ciągu

![img3](https://user-images.githubusercontent.com/61552854/119265108-d4618d80-bbe5-11eb-8f9c-0abd5a704add.png)

### Walidator wyposażyłem w dwie sekcje: 
- Sekcję indykacjyjną (kolor fioletowy) wskazującą aktualnie obsługiwany znak.
- Sekcję wprowadzającą (kolor zielony) dzielącą się na:
  - sterowanie procesem
  - pole do wprowadzania i pole z otrzymywanym przetworzonym ciągiem

Użytkownik może zdecydować, czy proces ma przebiegać krok po kroku (znak po znaku), czy ma przebiec błyskawicznie (walidacja wszystkich znaków w tym samym czasie).

# Zabezpieczenia programu
* Jeśli pole edycyjne liter alfabetu i pole edycyjne znaków specjalnych będą jednocześnie puste oraz przełącznik liczb będzie ustawiony na "false", program wygeneruje macierz, ale nie nastąpi sprawdzenie wartości; pojawi się błąd.
* Program nie pozwoli wygenerować macierzy, kiedy liczba wierszy i/lub liczba kolumn będzie wynosiła zero.
* Pola do wpisywania liter oraz znaków specjalnych są zabezpieczone przez technologię "Regex". Program nie pozwoli wpisać do pola liter znaku specjalnego, cyfry bądź dużej litery (takowe są generowane przez program). Analogicznie program do pola zawierającego znaki specjalne pozwoli wpisać wszysko za wyjątkiem liter (w tym wielkich) oraz cyfr. Cyfry są generowane automatycznie przez program.
* Jeśli w ciągu znaków podawanych przez użytkownika, znaki będa się powtarzać, program przy generowaniu macierzy usunie zbędne znaki i zaktualizuje wartość pola w celu uniknięcia zakłamań pseudolosowości generowania znaków w macierzy.
* Ilość znaków specjalnych może być większa niż liczba kolumn macierzy (odpowiadająca ilości znaków w słowie), lecz nie wpłynie to na generowaną macierz; będzie miało wpływ jednynie na ciąg znaków w walidatorze.

# Licencja/License
Program na licencji MIT. Jeśli nie znasz jej warunków, przeczytaj [ten artykuł](https://en.wikipedia.org/wiki/MIT_License)

# Informacje dodatkowe
* Logika programu napisana w całości w czystym JavaScript zgodnym ze standardem EcmaScript6.
* Do weryfikacji pól formularza użyłem konstruktora "RegExp", którzy zawiera metody umożliwiające pracę z technologią "RegEx" w języku JavaScript.
* Do walidatora ciągu znaków alfabetu użyłem zaprojektowanego przeze mnie algorytmu rekurencyjnego.
* Wszyskie dane które podlegają obróbce przez program są zapisywane i odczytywane z kopii objektu domyślnego w celu hermetyzacji i ochrony danych domyślnych. Po przeładowaniu strony dane wprowadzone przez użytkownika są usuwane. Do stworzenia identycznej kopii objektu użyłem konstroktora "JSON" i odpowiadajcym mu metodom.
