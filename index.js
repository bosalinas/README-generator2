//Packages for use
const fs = require('fs');
const inquirer = require('inquirer');
//User questions
inquirer
    .prompt([
        {
            type: 'input',
            name: 'github',
            message: 'What is your GitHub username?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your preferred email?',
        },
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your project?',
        },
        {
            type: 'input',
            name: 'description',
            message: 'What is a good description for your project?',
        },
        {
            type: 'input',
            message: 'What do you want to include as installation instructions?',
            name: 'installation',
        },
        {
            type: 'input',
            message: 'What do you want to include for usage information?',
            name: 'usage',
        },
        {
            type: 'input',
            message: 'What do you want your contribution guidelines to say?',
            name: 'contribution',
        },
        {
            type: 'input',
            message: 'What do you want to include as test instructions?',
            name: 'test',
        },
        {
            type: 'list',
            message: 'Which license do you want for this project?',
            name: 'license',
            choices: ['mit', 'apache', 'gplv2', 'none'],
        }
    ])
//get all the answers and then use them to fill in the readme
    .then((answers) => {
        fs.writeFile(`./output/README.md`, `
${renderLicense(answers.license)}
# Table of Contents
- [License](#project-license)
- [Description](#description)
- [Usage](#usage)
- [Installation](#installation)
- [Contributions](#contribution-guidelines)
- [Testing](#test-instructions)
- [Questions](#questions)

# ${answers.title}
## Project License
### ${answers.license}
## Description 
### ${answers.description}
## Usage
### ${answers.usage}
## Installation 
### ${answers.installation}
## Contribution Guidelines
### ${answers.contribution}
## Test Instructions 
### ${answers.test}
## Questions
### [Github Profile](https://github.com/${answers.github})
### If you have additional questions please reach to me via ${answers.email}

        `, (err) =>
            err ? console.log(err) : console.log('Created README File!')
        );
    });
//function to get badges for license chosen
const renderLicense = (license) => {
    if (license == "mit") {
        return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    } else if (license == "apache") {
        return "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
    } else if (license == "gplv2") {
        return "[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)";
    } else if (license == "None") {
        return "No Licenses were used.";
    } else {
        return "";
    }
};