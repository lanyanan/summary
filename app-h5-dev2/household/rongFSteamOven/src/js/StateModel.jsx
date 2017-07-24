/**
 * Created by Administrator on 2016-11-14.
 */
export class StateModel{
    constructor(){
        this.items = [
            {'modelId':'0','name':'上烤','defTemp':'180','defTime':'5','mintemp':'120','maxtemp':'250','mintime':'5','maxtime':'180',photo:'photo0'},
            {'modelId':'1','name':'下烤','defTemp':'180','defTime':'5','mintemp':'120','maxtemp':'250','mintime':'5','maxtime':'180',photo:'photo1'},
            {'modelId':'2','name':'上下烤','defTemp':'180','defTime':'5','mintemp':'120','maxtemp':'250','mintime':'5','maxtime':'180',photo:'photo2'},
            {'modelId':'3','name':'蒸煮','defTemp':'100','defTime':'5','mintemp':'80','maxtemp':'115','mintime':'5','maxtime':'180',photo:'photo3'},
            {'modelId':'4','name':'高温蒸烤','defTemp':'180','defTime':'5','mintemp':'120','maxtemp':'250','mintime':'5','maxtime':'180',photo:'photo4'},
            {'modelId':'5','name':'消毒','defTemp':'100','defTime':'20','mintemp':'100','maxtemp':'100','mintime':'20','maxtime':'20',photo:'photo5'},
            {'modelId':'6','name':'解冻','defTemp':'60','defTime':'20','mintemp':'60','maxtemp':'60','mintime':'5','maxtime':'180',photo:'photo6'},
            {'modelId':'7','name':'发酵','defTemp':'40','defTime':'20','mintemp':'40','maxtemp':'40','mintime':'5','maxtime':'180',photo:'photo7'}
        ];
    }
    getAll(){
        return this.items;
    }

    getItem(index){
        return this.items[index];
    }

    getClassName(id){
        for (let i in this.items) {
            if (this.items[i].name == id) {
                return this.items[i];
            }
        }
    }
    getClassID(id){
        for (let i in this.items) {
            if (this.items[i].modelId == id) {
                return this.items[i];
            }
        }
    }
};