/**
 * @Authors Arjun Variar & Prakhar Srivastav.
 * @Purpose Integerates POSTMAN Collection runner/tests with CI systems.
 * 
 * Main file which parses the command line arguments and runs Newman, Supports JSON5.
 */

var color = require('cli-color')
,	program = require('commander')
,	path = require('path')
,	fs = require('fs')
,	JSON5 = require('json5')
,	Newman = require('../src/Newman');

function parseArguments()
{
	program
	  .version('0.0.1')
	  .usage('[options] file')
	  .option('-c, --collection [file]', 'Specify your Postman Collection [file]', 'file');

	program.on('--help', function()
	{
	  console.log('  Examples:');
	  console.log('');
	  console.log('    node app.js -c POSTMAN_COLLECTION');
	});

	program.parse(process.argv);

	if (!fs.existsSync(program.collection))
	{
		console.warn(color.red('Please Specify a Postman Collection.'));
		process.exit(1);
	}
}

function main()
{
	parseArguments();
	var collectionJson = JSON5.parse(fs.readFileSync(program.collection, 'utf8'));
	Newman.execute(collectionJson);
}

main();