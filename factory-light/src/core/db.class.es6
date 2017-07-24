'use strict';

/**
 * 数据库类
 * 使用indexedDB来提供存储大型数据的能力
 * @author   vilien
 * @datetime 2015-11-20
 */

import {BaseClass} from './Base.class';

// 常量
const DEF_DATABASE_NAME = 'V_DEF_STORE'; // 缺省数据库名称

// 私有成员key
const _stores_      = Symbol('_stores_');       // 仓储列表
const _db_          = Symbol('_db_');           // 仓库对象
const _openStatus_  = Symbol('_openStatus_');   // 仓库打开状态
const _openStore_   = Symbol('_openStore_');    // 打开表

export class DBClass extends BaseClass {

    /**
     * 构造方法
     * @param    {array}   stores 仓储列表
     */
    constructor(stores){
        super();
        try {window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;}catch(err){}
        if (typeof window.indexedDB === 'undefined') {
            throw new Error('天！你还在用这么古董的浏览器！建议你换chrome以获得更好的操作体验！');
        }
        if (!Array.isArray(stores)) {
            throw new Error('仓储列表必须为数组类型！');
        }
        this[_stores_] = stores;
        this[_db_] = null;
        this[_openStatus_] = 0; // 0：未打开，1：正在打开，2：打开完成，3：打开失败
    }

    /**
     * 打开数据库
     * @param    {string}   dbName    数据库名称
     * @param    {Number}   dbVersion 数据库版本号
     */
    open(dbName=DEF_DATABASE_NAME, dbVersion=2){
        let request = window.indexedDB.open(dbName, dbVersion);
        this[_openStatus_] = 1;
        // 首次访问本站点（之前从未访问过）时将会触发该事件
        request.onupgradeneeded = (event)=>{
            this[_db_] = event.target.result;
            this[_openStatus_] = 2;
            this[_stores_].map( (tbName)=>this[_db_].createObjectStore(tbName, {keyPath: 'rollNo'}) );
        };
        request.onsuccess = (event)=>{
            this[_db_] = event.target.result;
            this[_openStatus_] = 2;
        };
        request.onerror = (event)=>{
            this[_openStatus_] = 3;
            console.log(`Open ${dbName} fail`, event);
        };
    }
    
    /**
     * 获取一条记录
     * @param    {string}   storeName 表名称
     * @param    {string}   id        记录ID
     * @return   {object}             返回Promise对象，回馈值为json记录
     */
    get(storeName, id){
        let getStore = this[_openStore_](storeName, 'rw');
        return new Promise(function(resolve, reject){
            getStore.then(function(store){
                let request = store.get(id);
                request.onsuccess = function(event){
                    let result = request.result;
                    if (result && result.rollNo) {
                        delete result.rollNo;
                    }
                    resolve(result);
                };
            });
        });
    }

    /**
     * 插入/修改一条记录
     * @param    {string}   storeName 表名称
     * @param    {string}   id        记录ID
     * @param    {json}     data      将插入的记录，必须为JSON格式
     * @return   {object}             返回Promise对象，回馈值为插入记录数量
     */
    set(storeName, id, data){
        let getStore = this[_openStore_](storeName, 'rw');
        if (typeof data !== 'object') {
            console.log('%c只能存储json格式的记录', 'color:red');
            return false;
        }
        return new Promise(function(resolve, reject){
            getStore.then(function(store){
                let request = store.get(id);
                request.onsuccess = function(event){
                    let result = request.result;
                    let rs = result ? Object.assign(result, data) : Object.assign({rollNo: id}, data);
                    // store.add(Object.assign({rollNo: id}, data));
                    store.put(rs);
                    resolve(1);
                };
            });
        });
    }

    /**
     * 删除一条记录
     * @param    {string}   storeName 表名称
     * @param    {string}   id        记录ID
     * @return   {object}             返回Promise对象，回馈值为删除记录数量
     */
    del(storeName, id){
        let getStore = this[_openStore_](storeName, 'rw');
        return getStore.then(function(store){
            store.delete(id);
            return 1;
        });
    }

    /**
     * 清空指定仓储
     * @param    {string}   storeName 表名称
     * @return   {object}             返回Promise对象，回馈值为删除记录数量
     */
    clear(storeName){
        let getStore = this[_openStore_](storeName, 'rw');
        return getStore.then(function(store){
            store.clear();
            return true;
        });
    }

    /**
     * 关闭数据库
     */
    close(){
        return this[_db_].close();
    }

    /**
     * 打开表，私有方法
     * @param    {string}   storeName 表名称
     * @param    {string}   id        读写模式（只读：r ，读写：rw）
     * @return   {object}             返回一个可供操作的IDBObjectStore
     */
    [_openStore_](storeName, rw='r'){
        if (this[_openStatus_] === 0) {
            throw new Error('请先调用open方法打开数据库！');
        }
        if (this[_stores_].indexOf(storeName)<0) {
            throw new Error(`${storeName}不存在！`);
        }
        let mode = rw==='rw' ? 'readwrite' : 'readonly';
        let $this = this;
        return new Promise(function(resolve, reject)
            {
                if ($this[_db_]===null && $this[_openStatus_] !== 3) {
                    setTimeout(function(){
                        resolve($this[_db_]);
                    }, 200);
                } else {
                    resolve($this[_db_]);
                }
            }).then(function(db){
                if (db===null) {
                    return Promise.reject('打开数据库失败，请重试');
                } else {
                    let trans = db.transaction(storeName, mode);
                    // trans.oncomplete = (event)=>console.log('The transaction is successful', event);
                    trans.onerror = (event)=>console.log('The transaction failed', event);
                    return trans.objectStore(storeName);
                }
            });
    }

}