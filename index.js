const inquirer = require('inquirer')
const chalk = require('chalk')
const shelljs = require('shelljs')
const figlet = require('figlet')
const init = () => {

    console.log(
        chalk.green(
            figlet.textSync("J3 Biatch", {
                font: "basic",
                horizontalLayout: "default",
                verticalLayout: "default"
            })
        )
    );
}
const askQuestions = () => {
    const Questions = [{
            name: "FILENAME",
            type: "input",
            message: "What is the file name without exception"
        },
        {
            type: "list",
            name: "EXTENSION",
            message: "What is the extension of the file",
            choices: [".rb", ".css", ".js", ".php"],
            filter: (val) => {
                return val.split(".")[1];
            }
        }

    ];
    return inquirer.prompt(Questions);
}
const createFile = (filename, extension) => {
    const filePath = `${process.cwd()}/${filename}.${extension}`;
    shelljs.touch(filePath);
    return filePath;
}
const success = filepath => {

    console.log(chalk.black.bgGreen.bold(`Done! File Created at file path ${filepath}`));
}
const run = async () => {
    //Init The Script
    init()
    //Ask Question and wait
    const answers = await askQuestions();
    const {
        FILENAME,
        EXTENSION
    } = answers;
    //Create the file path
    const filepath = createFile(FILENAME, EXTENSION);
    //Final success message
    success(filepath);

}
run();