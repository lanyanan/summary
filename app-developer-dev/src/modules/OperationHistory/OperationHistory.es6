'use strict';
/**
 * 操作历史处理类
 * @author   vilien
 * @datetime 2016-01-06
 */
import {BaseClass} from '../../core/Base.class';
import {DBClass} from '../../core/db.class';
import {APP_CONFIG} from '../../config/app.config';

class OperationHistoryClass extends BaseClass{
    constructor(){
        super();
        this.storeName = 'history';
        this.pre = 'h-';
        this.db = new DBClass([this.storeName]);
        this.db.open('SHS-HISTORY');
        this.db.clear(this.storeName);
        this.maxLength = APP_CONFIG.operationHistoryLength || 20; // 最多存储20步
        this.length = 0;
        this.cursor = -1; // 当前游标（索引值）
        this.topId = 0; // 顶部ID
        this.latestId = -1; // 最新ID
    }

    /**
     * 添加一条新记录
     * @param    {json}   data 只能保存json格式的对象，如不满足，可先用JSON.parse(JSON.stringify(DATA))强制转换
     * @return   {[type]}      不返回任何值
     */
    push(data){
        if (typeof data !== 'object') return;
        this.latestId ++;
        this.length = this.latestId - this.topId + 1;
        if (this.length > this.maxLength) {
            this.db.del(this.storeName, this.topId);
            this.length = this.maxLength;
            this.topId ++;
            this.cursor = this.length - 1;
        } else {
            this.cursor ++;
        }
        // this.db.del(this.storeName, this.latestId); // 保证该空间可用
        this.db.set(this.storeName, this.getId(), JSON.parse(JSON.stringify(data)));
    }

    /**
     * 返回指定索引的历史记录
     * @param    {integer}   index 记录索引值
     * @return   {promise}         返回一个promise对象
     */
    go(index){
        this.cursor = index >= this.length-1 ? this.length-1 : (index < 0 ? 0 : index);
        this.latestId = this.topId + this.cursor;
        return this.db.get(this.storeName, this.getId());
    }

    /**
     * 回退一条记录
     * @return   {promise}   返回一个promise对象
     */
    back(){
        this.cursor--;
        return this.go(this.cursor);
    }

    /**
     * 往前一条记录
     * @return   {promise}   返回一个promise对象
     */
    forward(){
        this.cursor++;
        return this.go(this.cursor);
    }

    /**
     * 获取记录ID号
     * @return   {string}   ID字符串
     */
    getId(){
        return this.pre + this.latestId;
    }
}

export const OH = new OperationHistoryClass();