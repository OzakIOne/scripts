import fetch from 'node-fetch';
import fs from 'fs';

// https://cdn.intra.42.fr/pdf/pdf/13324/fr.subject.pdf

const limit = 24000;
const pdfs = [];
const writeStream = fs.createWriteStream(`file${limit.toString()}.txt`);
const pathName = writeStream.path;

const fetchTopHeadlinesAsyncAwait = async () => {
  for (let index = limit - 1000; index < limit; index++) {
    const response = await fetch(
      `https://cdn.intra.42.fr/pdf/pdf/${index}/fr.subject.pdf`,
    );
    const status = await response.ok;
    if (status != false)
      pdfs.push(`https://cdn.intra.42.fr/pdf/pdf/${index}/fr.subject.pdf`);
  }
  console.log(pdfs);
  pdfs.forEach((value) => writeStream.write(`${value}\n`));
  writeStream.on('finish', () => {
    console.log(`wrote all the array data to file ${pathName}`);
  });
  writeStream.on('error', (err) => {
    console.error(`There is an error writing the file ${pathName} => ${err}`);
  });
  writeStream.end();
};

fetchTopHeadlinesAsyncAwait();
