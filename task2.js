import csv from "csvtojson";
import fs from "fs";

const readStream = fs.createReadStream("nodejs-hw1-ex1.csv");

const writeStream = fs.createWriteStream("output.txt");

readStream.pipe(csv({ delimiter: [";"] })).pipe(writeStream);
