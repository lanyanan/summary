/**
 * Created by Administrator on 2016-11-14.
 */
export class StateModel{
    constructor(){
        this.items = [
            {'modelId':'1','name':'标准',photo:'photo0'},
            {'modelId':'2','name':'快煮',photo:'photo1'},
            {'modelId':'3','name':'稀饭',photo:'photo2'},
            {'modelId':'4','name':'粥/汤',photo:'photo3'},
            {'modelId':'5','name':'蒸煮',photo:'photo4'},
            {'modelId':'6','name':'热饭',photo:'photo5'}
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