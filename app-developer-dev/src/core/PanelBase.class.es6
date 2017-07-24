'use strict';

import {BaseClass} from './Base.class';

/**
 * 面板基类
 */
export class PanelBase extends BaseClass {
    constructor(){
        super();
        // if (new.target === PanelBase) {
        //     throw new Error('This class cannot be instantiated!');
        // }
    }

    /**
     * 加载css文件
     * @param  {String} fileName 文件名
     * @param  {String} base     基准路径，默认为 ../static/css/
     */
    loadCssFile(fileName, base='../static/'){
        let link = document.createElement('link');
        link.rel='stylesheet';
        link.href = base + fileName;
        document.head.appendChild(link);
    }
}