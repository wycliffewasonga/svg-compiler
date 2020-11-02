const fs = require('fs');
const cheerio = require('cheerio');
const datauri = require('datauri/sync');
const path = require('path');

const regex = /data:image\/([a-zA-Z]*);base64,([^\"]*)/g;

export function compile(inputFile, outputFile, minimize = true) {
    const input = fs.readFileSync(inputFile, 'utf-8');
    const $ = cheerio.load(input, {
        xmlMode: true
    });

    $('image').each(function (i, elem) {
        const href = $(this).attr('xlink:href');

        if (!href || regex.test(href)) {
            return;
        }

        const meta = datauri(path.join(path.dirname(inputFile), href));

        $(this).attr('xlink:href', meta.content);
    });

    let output = $.html();
    
    if (minimize) {
        output = output.replace(/\s*\n\s*/g, '');
    }

    fs.writeFileSync(outputFile, output, 'utf8');
}
