const chalk = require('chalk');
const printGreen = chalk.green.bold.italic
const printBlue = chalk.blue.italic
const printRed = chalk.underline.red
const printYellow = chalk.yellow

function printCategory(key, value) {
    if (value) {
        return printRed(key + ":") + printYellow(" " + value) + "\n"
    }
    else {
        return printRed(key + ":") + "\n"
    }
}

function printSubCategory(key, value) {
    return printBlue("   " + key + ": ") + printYellow(" " + value) + "\n"
}

exports.printGreen = printGreen
exports.printBlue = printBlue
exports.printCategory = printCategory
exports.printSubCategory = printSubCategory