'use strict';

import {globActions,gameActions} from '../actions/actions';

var data = {
    step : 1,
    loaded: false,
    cindex:1,
    showRank:false
}

export const globStore = Reflux.createStore({
    listenables: [globActions],

    getInitialState(){
        return data;
    },

    onNextStep(){
        data.step++;
        this.trigger(data);
    },

    onLoaded(){
        data.loaded = true;
        this.trigger(data);
    },

    onSetCartoonIndex(index){
        data.cindex = index;
        this.trigger(data);
    },

    onBB(){
        data.step = 3;

        this.trigger(data)
    },

    onSleep(){
        data.step = 2;
        data.cindex = 13;
        this.trigger(data);
    },

    onShowRank(isShow){
        data.showRank = isShow;
        this.trigger(data);
    }
});
