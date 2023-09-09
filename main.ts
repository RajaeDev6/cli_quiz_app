import * as readline from "readline"

type Question = {
	text: string,
	options: string[]
	answer: string
}

interface Quiz{
	addQuestion(quesion: Question): void
	displayQuestion(): void
	showScore(): void
	showWrongAnswers(): void
}

class FullQuiz implements Quiz {
	private score: number = 0
	private questions: Question[] = []

	private wrongAnswers: Question[] = []

	constructor() {}

	addQuestion(question: Question): void {
		this.questions.push(question)
	}




	displayQuestion(): void {
		console.log("Type out answer to answer questions")
	  const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	  });

	  let currentQuestionIndex = 0;

	  const askNextQuestion = () => {
		if (currentQuestionIndex >= this.questions.length) {
		  rl.close();
		  this.showScore();
		  return;
		}

		const q = this.questions[currentQuestionIndex];
		console.log(`${currentQuestionIndex + 1}: ${q.text}?\n`);

		q.options.forEach((option, index: number) => {
		  console.log(`${index + 1}: ${option}`);
		});

		rl.question('\nEnter your answer: ', (answer: string) => {
		  if (answer.toLowerCase() === q.answer.toLowerCase()) {
			this.score += 1;
		  } else {
			this.wrongAnswers.push(q);
		  }

		  currentQuestionIndex += 1;
		  askNextQuestion();
		});
	  };

	  askNextQuestion();
	}



	showScore(): void {
		console.log(`Score: ${this.score}`)		
		this.showWrongAnswers()
	}

	showWrongAnswers(): void {
		if (this.wrongAnswers.length <= 0) {
			console.log("got All questions correct")
			return 
		}

		for (const q of this.wrongAnswers) {
			console.log(`${q.text} CorrectAnswer: ${q.answer}`)
		}
	}
}



const quiz = new FullQuiz()

quiz.addQuestion({
	text: "Who create this",
	options: ["Rajae", "Donte", "Kyle"],
	answer: "Rajae"
})


quiz.addQuestion({
	text: "What time did the wifi go away",
	options: ["10pm", "8pm", "9pm"],
	answer: "9pm"
})

quiz.addQuestion({
	text: "What Uni Dp I Go To",
	options: ["CMU", "UWI", "UTECH"],
	answer: "CMU"
})


quiz.displayQuestion()
