const fs = require('fs');
const Markov = require('markov-strings');

const summaries = fs.readFileSync('array-all.txt').toString().split('\n');
const authors = fs.readFileSync('authors.txt').toString().split('\n');
const titles = fs.readFileSync('titles.txt').toString().split('\n');

const markovSummaries = new Markov(summaries, {
	maxLength: 140,
	minWords: 10,
	minScore: 35
});
const markovAuthors = new Markov(authors, {
	maxLength: 40,
	minScore: 35,
	filter: result => {
		return result;
	}
});
const markovTitles = new Markov(titles, {
	maxLength: 100,
	maxWords: 10,
	minScore: 35,
	stateSize: 3
});

markovSummaries.buildCorpusSync();
console.log('Markov Summaries created');
markovAuthors.buildCorpusSync();
console.log('Markov Authors created');
markovTitles.buildCorpusSync();
console.log('Markov Titles created');

const tweets = [];
for (let j = 0; j < 10; j++) {
	console.log('Generating title #' + j);
	const title = markovTitles.generateSentenceSync();
	console.log('Generating summary #' + j);
	const summary = markovSummaries.generateSentenceSync();
	console.log('Generating author #' + j);
	const author = markovAuthors.generateSentenceSync();

	const fakeBook = title.string + ': ' + summary.string + ', by ' + author.string;
	console.log('Result ' + j + ':');
	console.log(fakeBook);
	tweets.push(fakeBook);

	if (tweets.length === 9) {
		for (let i = 0; i < tweets.length; i++) {
			console.log(tweets[i]);
			console.log('--');
		}
	}
}
