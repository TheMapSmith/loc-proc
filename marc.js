const fs = require('fs');
const XmlStream = require('xml-stream');

const stream = fs.createReadStream('BooksAll.2014.part01.xml');
const xml = new XmlStream(stream);

// const summaries = [];
const titles = [];
// const authors = [];

xml.collect('subfield');
xml.on('endElement: datafield', data => {
	// if (data.$.tag === '520') {
	// 	summaries.push(data.subfield[0].$text);
	// }
	if (data.$.tag === '245') {
		let title = '';
		// let author = '';
		for (let i = 0; i < data.subfield.length; i++) {
			if (i < data.subfield.length - 1) {
				title += data.subfield[i].$text + ' ';
			}
			// else if (i === data.subfield.length - 1) {
			// 	if (data.subfield[i].$text.substring(0, 3) === 'By ') {
			// 		author += data.subfield[i].$text.substring(3);
			// 	}
			// }
		}
		if (title.length > 0 && title.length < 100 && titles.length < 50000) {
			if (titles.length / 10000 === 0) {
				console.log(titles.length + ' titles');
			}
			titles.push(title);
		}
		// if (author.length > 0) {
		// 	authors.push(author);
		// }
	}
});

xml.on('end', () => {
	// const summariesFile = fs.createWriteStream('summaries.txt');
	const titlesFile = fs.createWriteStream('titles.txt');
	// const authorsFile = fs.createWriteStream('authors.txt');
	// summaries.forEach(v => {
	// 	summariesFile.write(v + '\n');
	// });
	// summariesFile.end();
	// console.log(`Wrote ${summaries.length} book summaries.`);
	// console.log('---');

	titles.forEach(v => {
		titlesFile.write(v + '\n');
	});
	titlesFile.end();
	console.log(`Wrote ${titles.length} book titles.`);
	console.log('---');

	// authors.forEach(v => {
	// 	authorsFile.write(v + '\n');
	// });
	// authorsFile.end();
	// console.log(`Wrote ${authors.length} authors.`);
	// console.log('---');
});

xml.on('error', err => {
	console.log(err);
});
