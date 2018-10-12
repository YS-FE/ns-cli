const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const chalk = require("chalk");
const { prompt } = require('inquirer');
const fileUtil = require("../util/file");
const { question } = require("./init_question");
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
    prompt(question).then(inputValue => {
      // { template: 'ns-express', language: 'javascript' }
      let templateDir = path.join(process.cwd(), projectName);

      fileUtil.mkdir(projectName)
      .then(() => {
          downloadFile(inputValue, templateDir, projectName);
      });
      
    });

    /**
     * 下载对应模板
     * @param {输入信息} inputValue 
     * @param {模板路径} templateDir 
     * @param {项目名称} projectName
     */
    function downloadFile(inputValue, templateDir, projectName) {
      let templateName = inputValue.template + '-' + inputValue.language;

      download(templateName, templateDir).then(function () {
        console.log(chalk.green('下载完成 ^_^ !\n'));
        console.log(chalk.green('启动服务'));
        console.log(chalk.yellow(`cd ${projectName} \nnpm install \nnpm run dev`));
      });
    }

  }
}

module.exports = init;