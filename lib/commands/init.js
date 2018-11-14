const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const chalk = require("chalk");
const shell = require('shelljs');
const { prompt } = require('inquirer');
const fileUtil = require("../util/file");
const { question, inputQuestion } = require("./init_question");
const download = require('../util/download');

async function init(args, cwd) {
  let options = {},
  projectName = 'node-server';
  options = args[1];

  if (typeof args[0] === 'string') {
    projectName = args[0];
  } 

  const inCurrent = projectName === '.';

  const targetDir = path.resolve(projectName || '.');

  const Content = '\n' + chalk.green([
    '####     ##   ######           ######  ##       ####   ',
    '## ##    ##  ##    ##         ##    ## ##        ##   ',
    '##  ##   ##  ##               ##       ##        ##  ',
    '##   ##  ##   ######  ####### ##       ##        ##  ',
    '##    ## ##        ##         ##       ##        ## ',
    '##     ####  ##    ##         ##    ## ##        ##',
    '##      ###   ######           ######  ######## ####',
    '   '
  ].join('\n'));

  process.stdout.write(Content + '\n');

  if (fs.existsSync(targetDir)) {

    if (options.force) {
      rimraf.sync(targetDir);
    } else {
      if (inCurrent) {
        const {
          ok
        } = await prompt([{
          name: 'ok',
          type: 'confirm',
          message: `Generate project in current directory?`
        }]);

        if (!ok) return;

      } else {
        const {
          ok
        } = await prompt([{
          name: 'ok',
          type: 'confirm',
          message: `目录已存在，是否覆盖?`
        }]);

        if (!ok) return;
        rimraf.sync(targetDir);
      }

      run(projectName);
    }
  } else {
    run(projectName);
  }



  /**
   * 根据用户指令下载对应模板
   * @param {Sting} projectName 
   */
  function run(projectName) {

    prompt(question[0]).then( firstValue => {
      let types, result;
      let templateDir = path.join(process.cwd(), projectName);

      if (firstValue.serverType === 'server') {
        types = {questionIndex: 1, name: 'serverTemplate'};
      } else if (firstValue.serverType === 'serverRender') {
        types = {questionIndex: 2, name: 'serverRenderTemplate'};
      }

      prompt(question[types.questionIndex]).then(secondValue => {
        result = secondValue[types.name];

        prompt(inputQuestion).then(otherOptions => {
          fileUtil.mkdir(projectName)
          .then(() => {
              downloadFile(result, templateDir, projectName, otherOptions);
          });
        });

      });
    });



    /**
     * 下载对应模板
     * @param {输入信息} templateName 
     * @param {模板路径} templateDir 
     * @param {项目名称} projectName
     * @param {项目其他描述} otherOptions
     */
    function downloadFile(templateName, templateDir, projectName, otherOptions) {
      let packagePath = path.join(templateDir, 'package.json');

      download(templateName, templateDir).then(function () {
        let packageMessage = require(packagePath);

        packageMessage.name = projectName;
        for (const key in  otherOptions) {
          packageMessage[key] = otherOptions[key];
        }

        fs.writeFileSync(packagePath, JSON.stringify(packageMessage, null, '\t'), 'utf8');

        console.log(chalk.green('下载完成 ^_^ !\n'));
        console.log(chalk.green('启动服务'));
        console.log(chalk.yellow(`cd ${projectName} \nnpm install \nnpm run dev`));
      });
    }

  }
}

module.exports = init;