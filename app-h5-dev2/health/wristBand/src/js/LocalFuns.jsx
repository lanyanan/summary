'use strict';
/**
 * 本地库
 * @type {localCache}
 * isIOS {string}   //导航栏判断安卓73，苹果64
 * frontAjax {function}
 * 步数，最大值50000 最小5000
 **/
export const isIOS = !!(navigator.userAgent.match(/iPad|iPhone|iPod/)) ? ' ios':' android';
export let frontAjax = function(url,params,suc,err){
    $.ajax({
        type:'POST',
        url: url,
        data: params,
        dataType:'json',
        crossDomain: true,
        success: suc,
        error:err
    })
};
export let reduceKey= (arr,json) =>{
    arr.map((o)=>{
        delete json[o];
        return json;
    })
};
export let isEmptyObject=(obj)=> {
    for (var key in obj) {
        return false;
    }
    return true;
};

export let arrayMin = function(arr) {
    if(Object.prototype.toString.call(arr) !== "[object Array]" ) return false;
    arr.map((o)=>{
        o<arr[0] && (arr[0] = o)
    });
    return arr[0];
};
export let arrayMax = function(arr) {
    if(Object.prototype.toString.call(arr) !== "[object Array]" ) return false;
    let max = arr[0];
    for (let i = 1; i < arr.length; i++){
        if (arr[i] > max){
            max = arr[i];
        }
    }
    return max;
};
export let arrayAvg = function(arr) {
    if(Object.prototype.toString.call(arr) !== "[object Array]" ) return false;
    let sum = 0,avg = 0;
    arr.map((o)=>{
        sum+=o
    });
    avg = sum/arr.length;
    return avg;
};
export let fillZero = function(num) {
    num = num < 10 ? '0'+num : num;
    return num;
};
window.arrayAvg = arrayAvg;