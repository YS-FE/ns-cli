const fs = require('fs');
const path = require('path');

/**
 * 可选模板列表对象
 */
const templateUrlMap = {
    // 'ns-koa-javascript': '58MIS-FE/koa-server',
    // 'ns-koa-typescript': '58MIS-FE/koa-server-ts',
    // 'ns-express-javascript': '58MIS-FE/express-server',
    // 'ns-express-typescript': '58MIS-FE/express-server-ts'
    'koa + javascript': 'ys-fe/koa-server',
    'koa + typescript': 'ys-fe/koa-server-ts',
    'express + javascript': 'ys-fe/express-server',
    'express + typescript': 'ys-fe/express-server-ts',
    'koa + vue':'ys-fe/koa-vue',
    'express + vue':'ys-fe/express-vue',
    'koa + react':'ys-fe/koa-react',
    'express + react':'ys-fe/express-react'
}

/**
 * 获取模板对象
 */
function getTemplateUrlMap() {
    return templateUrlMap
}

/**
 * 模板数组转换
 */
function getTemplatesList() {
    return Object.keys(templateUrlMap);
}

/**
 * 获取模板目录，如果为. || /开头，或者:d盘符，返回true，否则返回当前目录下的tpl目录是否存在
 * @param {string} tpl 
 * retrun boolean
 */
function isLocalTemplate(tpl) {
    let isLocal = tpl.startsWith('.') || tpl.startsWith('/') || /^\w:/.test(tpl);

    if (isLocal) {
        return isLocal;
    } else {
        return fs.existsSync(path.normalize(path.join(process.cwd(), tpl)));
    }
}

exports.getTemplatesList = getTemplatesList;
exports.getTemplateUrlMap = getTemplateUrlMap;
exports.isLocalTemplate = isLocalTemplate;