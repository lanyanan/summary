'use strict';

import {bindActions} from '../actions/actions';

export const bindStore = Reflux.createStore({
    listenables: [bindActions],
    onShowPrompt(data){
        this.trigger(data);
    },

    onSend(data){
    	this.trigger(data);
    }
});
