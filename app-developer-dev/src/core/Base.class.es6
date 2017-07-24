'use strict';

/**
 * 基类
 * @author   vilien
 * @datetime 2015-11-16
 */

export class BaseClass {
    constructor(){
        // if (new.target === BaseClass) {
        //     throw new Error('This class cannot be instantiated!');
        // }
    }

    toString(){
        return `[Class ${this.getClassName()}]`;
    }

    /**
     * 获取类名
     * @return   {string}   返回类名
     */
    getClassName(){
        return this.constructor.name;
    }
}