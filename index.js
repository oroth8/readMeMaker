const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const promptArr = [];

inquirer
// repo info, title, description, table of contents,installation, usage, license(list) , contributiin, tests, questions, username, email address, 
    .prompt([
        {
        type: "input",
        message: "What is the title of your project?",
        name: "title"
        },
        { 
        type: "input",
        message: "What is your github username?",
        name: "username"
        },
        { 
        type: "input",
        message: "Describe your project",
        name: "description"
        },
        {
        type: "input",
        message: "Describe your installation",
        name: "installation"
        },
        {
        type: "input",
        message: "Describe your usage",
        name: "usage"
        },
        {
        type: "input",
        message: "Describe your licenses",
        name: "licenses"
        },
        {
        type: "input",
        message: "Name any contributions",
        name: "contribution"
        },
        { 
        type: "input",
        message: "test instructions?",
        name: "test"
        },
        {
        type: "input",
        message: "What is your email?",
        name: "email"
        },
        {
        type: "input",
        message: "Questions?",
        name: "questions"
        },
    ])
    .then(function(res){
        promptArr.push(res);
        getAxios();
        writeRM();
    });

function writeRM(){
    fs.writeFile("README.md",format(), err=>{
        if(err){
            console.log("ERROR");
        }
        else{
            console.log("Success");
        }
    });
}

// Axios function not working yet. does not push to array
function getAxios(){
    const userName = promptArr[0].username;
    axios.get(`https://api.github.com/users/${userName}`)
    .then(function(res){
        console.log("YOOOO");
        promptArr.push(res.data.url);
        promptArr.push(res.data.repos_url);
    });
    console.log(promptArr);

}
// need to add badges
function format(){
    return `
# ${promptArr[0].title}

# Table of Content
-[Description](#description)
-[Installation](#installation)
-[Usage](#usage)
-[Licenses](#licenses)
-[Contribution](#contribution)
-[Test](#test)
-[Username](#username)
-[Questions](#questions)


## Description:
 ${promptArr[0].description}
    

## Installation: 
${promptArr[0].installation}


## Usage: 
${promptArr[0].usage}

   
## Licenses: 
${promptArr[0].licenses}


## Contribution: 
${promptArr[0].contribution}

    
## Test:
${promptArr[0].test}


## Questions
${promptArr[0].questions}


Contact me:
### Username 
Github: ${promptArr[0].username}

### Email 
${promptArr[0].email}

[gitHub_URL](${promptArr[1]})
[gitHub_Repo_URL](${promptArr[2]})

`;
}
