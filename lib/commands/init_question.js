const shell = require('shelljs');

let defaultGitName = shell.exec('git config --get user.name', { silent: true }).stdout.trim();
let defaultGitEmail = shell.exec('git config --get user.email', { silent: true }).stdout.trim();

const question = [{
    type: 'list',
    name: 'serverType',
    message: 'Which type of node server do you want?',
    choices: [
      'server',
      'serverRender'
    ]
  },{
    type: 'list',
    name: 'serverTemplate',
    message: 'Which node server template do you want ?',
    choices: [
      'koa + javascript',
      'koa + typescript',
      'express + javascript',
      'express + typescript',
    ]
  },{
    type: 'list',
    name: 'serverRenderTemplate',
    message: 'Which node serverRender template do you want ?',
    choices: [
      'koa + vue',
      'koa + react',
      'express + vue',
      'express + react',
    ]
  }
]

const inputQuestion = [
  {
    type: 'input',
    name: 'description',
    message: 'Project Description? ',
    default: 'description'
  }, {
    type: 'input',
    name: 'author',
    message: 'Author Name:',
    default: defaultGitName || ''
  }, {
    type: 'input',
    name: 'email',
    message: 'Author Email:',
    default: defaultGitEmail || ''
  }, {
    type: 'input',
    name: 'version',
    message: 'Version:',
    default: '1.0.0'
  }
];

exports.question = question;
exports.inputQuestion = inputQuestion;
