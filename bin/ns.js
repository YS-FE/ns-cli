#!/usr/bin/env node

/**
 * 命令入口 
 */

const program = require('commander');
const { resolve } = require('path');

/**
 * entrance 入口action跳转
 * @param command 
 */
const entrance = command => resolve(__dirname, '../lib/commands/', command);

program.version(require('../package').version);
program.usage('<command>');


program
    .command('init')
    .description('使用 ns-cli 初始化一个基于nodeJs的服务')
    .option('-f, --force', '如果目标目录存在，强制覆盖')
    .option('-c, --clone', '在获取远程预置时使用Git克隆')
    .action((...args) => {
        require(entrance('init'))(args, process.cwd());
    });

    

program.parse(process.argv);

if (!program.args.length) {
    program.help();
}