const reader = require('xlsx');
const readline = require('readline');

// Reading the file
const file = reader.readFile('./test.xlsx');
let data = [];
const sheets = file.SheetNames;
  
for (let i = 0; i < sheets.length; i++) {
   const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
   temp.forEach((res) => {
        data.push(res);
   });
}
//console.log(data);

// Accepting user input and comparing it to the data
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));
const count = {
     'correct': 0,
     'wrong': 0,
     'total': 0
};

const askQuestion = async() => {
     try {
          for (let i = 0; i < data.length; i++) {
               const answer = await prompt(`${data[i].question} -> `);
               if (answer.trim() == data[i].answer) {
                    console.log('Correct!');
                    console.log(' ');
                    count['correct'] += 1;
               } else {
                    console.log('Wrong!');
                    console.log(`Right answer -> ${data[i].answer}`);
                    console.log(' ');
                    count['wrong'] += 1;
               }
               count['total'] += 1;
          }
          console.log(`You answered ${count['correct']/count['total'] * 100}% questions correctly.`);
          console.log(`Correct answers: ${count['correct']}`);
          console.log(`Wrong answers: ${count['wrong']}`);
          
          rl.close();
     } catch (e) {
          console.error("Unable to prompt", e);
     }
}

askQuestion();
