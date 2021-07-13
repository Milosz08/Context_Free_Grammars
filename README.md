# Context-free Grammars

### Matrix generator filled with pseudo-random characters of the user-selected grammar and validator of the user-entered name, whether it is within the range of the grammar generated from the value in the edit field.

## Main assumptions:
* Grammar signs can consist of letters, numbers and special characters (by default, the program assigns the full alphabet `abcdefghijklmnopqrstuvwxyz` and any special characters `` `~!@#$%^&*()_-=+{}[];:'\"|,<.>/?``, and numbers and capital letters are set to "true").
* The first column of the matrix (the first character in a word) cannot contain a digit or a special character.
* The last column of the matrix (the last character in a word) cannot contain a special character.

# Matrix as an illustration of sample grammar sequences
By nature, a computer is not able to generate an ordered word, so I based my word generation solution on a matrix filled with pseudo-randomly generated characters, where each line is one word consisting of generated characters (generated on the basis of user-provided instructions).

![img1](https://user-images.githubusercontent.com/61552854/119264429-6e740680-bbe3-11eb-9dc3-cade0dfafb6d.PNG)

With cyan in this matrix, I marked one grammar sequence (one word), which is one row of the matrix. The number of characters in a word depends on the number of columns in the matrix. As you can see, all lines follow the rules for creating sequences of grammar above.

## Control

![img2](https://user-images.githubusercontent.com/61552854/119259205-6a3cee80-bbcd-11eb-9c4e-d92f3192405e.png)

### User can edit:
* Alphabet letters and special characters.
* The number of rows or columns in the generated matrix (where: k> 0 && w> 0, where k - number of columns, w - number of rows).
* Whether the grammar can have numbers and / or uppercase letters.
* Number of special characters that one word can have, and if the number <0, it means that the number of characters is seemingly unlimited (it can be limited only by the number of columns in the matrix).

# Validating the entered string

![img3](https://user-images.githubusercontent.com/61552854/119265108-d4618d80-bbe5-11eb-8f9c-0abd5a704add.png)

### I equipped the validator with two sections:
- Indication section (purple) indicating the currently handled character.
- Introductory section (green), divided into:
  - process control
  - an input field and a field with the resulting processed string

The user can decide whether the process is to run step by step (character by character) or to run quickly (validation of all characters at the same time).

# Program security
* If the edit field for alphabet letters and the edit field for special characters are both empty and the number switch is set to "false", the program will generate a matrix, but the value will not be checked; an error will appear.
* The program will not generate a matrix when the number of rows and/or the number of columns is zero.
* The fields for entering letters and special characters are secured by the "Regex" technology. The program will not allow you to enter a special character, number or capital letter into the letter field (these are generated by the program). Similarly, the program for a field containing special characters will allow you to enter everything except letters (including capital letters) and numbers. The numbers are generated automatically by the program.
* If characters are repeated in a user-specified string, the program will remove unnecessary characters when generating the matrix and update the field value to avoid pseudo-randomness in matrix generation.
* The number of special characters may be greater than the number of columns of the matrix (corresponding to the number of characters in a word), but this will not affect the generated matrix; it will only affect the string in the validator.

# License
This program is on MIT licence. [Terms of use.](https://en.wikipedia.org/wiki/MIT_License)

# Additional informations
* The logic of the program was written entirely in pure JavaScript, compliant with the EcmaScript6 standard with the use of objects.
* To verify the form fields, I used the "RegExp" class, which contains methods for working with the "RegEx" technology in JavaScript.
* I used a recursive algorithm designed by me for the alphabet string validator.
* All data processed by the program are saved and read from the copy of the default object in order to encapsulate and protect the default data. After the page is reloaded, the data entered by the user is deleted. To create an identical copy of an object, I used the "JSON" constructor and the corresponding methods.
