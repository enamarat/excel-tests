# excel-tests

This simple program reads an Excel file with two columns: the first containing a question, and the second containing the answer. The command line interface (СLI) displays a question and checks user input for being equal to the answer in the second column of an Excel file.

You can create Excel files with different questions and answers and test your knowledge in CLI.

To run this project on your computer you need:

1. install Node.js (go to nodejs.org and download an installation file)
2. copy this github repository to your computer
3. open the command line interface (CLI) and navigate to the folder with the project

   example: cd d:/projects/excel-tests

   A side node: if you don't want to use the default CLI on Windows, you can install a different one. Git Bash is the example of one the available CLIs.

4. run the following command

   npm install

   to install all the packages necessary for the program to work whcih are specified in package.json file

5. run the command

   node read.js

CLI will display a question and ask the user to type an answer.

Example of a question:
2+2 ->

User should type 4. The program then compares what user typed with the value in the second column of the Excel file. If the user input matches the value, the CLI will inform user that their answer is correct and that it is wrong if otherwise. Then the next question will be displayed and so on until the end of the Excel file.

Create any questions you like. For example, you can type a sentence in English as a question and its translation to some other language that you learn as an answer. It will be a great practice for you.

The name of the Excel file should be test.xlsx
The first row of the first column should contain word 'question', and the first row of the second column should contain word 'answer'.
