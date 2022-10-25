const reader = require('xlsx');
const readline = require('readline');

// Reading the file
const file = reader.readFile('./test.xlsx');
const data = {};
const sheetNames = [];
const sheets = file.SheetNames;
  
for (let i = 0; i < sheets.length; i++) {
  
   const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
        //console.log(temp);
        data[file.SheetNames[i]] = [];
        sheetNames.push(file.SheetNames[i]);
   temp.forEach((res) => {
        data[file.SheetNames[i]].push(res);
   }
   );
}

// Accepting user input and comparing it to the data
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));
const count = {
     'correct': 0,
     'wrong': 0,
     'total': 0
};


const chooseTest = async() => {
     console.log('Your file has following sheets:');
     console.log(sheetNames);
     console.log('Each sheet has a separate test. Type the name of the sheet that you want to display.');
     let chosenSheet = await prompt(`${'Name of the sheet:'} -> `);
     if (data[chosenSheet.trim()] == undefined) {
          console.log(`Such sheet doesn't exist in your file. Check if you typed it correctly.`);
          console.log(' ');
          chooseTest();
     } else {
          askQuestion(chosenSheet.trim());
     }
}

const askQuestion = async(sheetName) => {
     try {
          for (let i = 0; i < data[sheetName].length; i++) {
               const answer = await prompt(`${data[sheetName][i].question} -> `);
               if (answer.trim() == data[sheetName][i].answer) {
                    console.log('Correct!');
                    console.log(' ');
                    count['correct'] += 1;
               } else {
                    console.log('Wrong!');
                    console.log(`Right answer -> ${data[sheetName][i].answer}`);
                    console.log(' ');
                    count['wrong'] += 1;
               }
               count['total'] += 1;
          }
          const percent = (Math.round(count['correct']/count['total'] * 100) / 100) * 100;

          console.log(`Total questions: ${count['total']}`);
          console.log(`Correct answers: ${count['correct']}`);
          console.log(`Wrong answers: ${count['wrong']}`);
          console.log(`You answered ${percent}% questions correctly.`);
          
          rl.close();
     } catch (e) {
          console.error("Unable to prompt", e);
     }
}

chooseTest();
