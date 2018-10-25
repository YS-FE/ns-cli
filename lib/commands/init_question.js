const question = [{
    type: 'list',
    name: 'serverType',
    message: 'Which type of node server do you want?',
    choices: [
      'server',
      'serverRender'
    ]
  },
  {
    type: 'list',
    name: 'serverTemplate',
    message: 'Which node server template do you want ?',
    choices: [
      'koa + javascript',
      'koa + typescript',
      'express + javascript',
      'express + typescript',
    ]
  },
  {
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

exports.question = question;