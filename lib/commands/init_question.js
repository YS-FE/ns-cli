const question = [{
  type: 'list',
  name: 'template',
  message: 'Which node server template do you want?',
  choices: [
    'ns-koa',
    'ns-express'
  ]
}, {
  type: 'list',
  name: 'language',
  message: 'Which language do you want?',
  choices: [
    'javascript',
    'typescript'
  ]
}];

exports.question = question;