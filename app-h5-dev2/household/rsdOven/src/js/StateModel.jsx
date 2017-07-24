/**
 * Created by Administrator on 2016-11-14.
 */
export class StateModel{
    constructor(){
        this.items = [
            {'modelId':'0','name':'发酵','defTemp':'48','defTime':'40','mintemp':'35','maxtemp':'230','mintime':'1','maxtime':'120',photo:'photo0'},
            {'modelId':'1','name':'解冻','defTemp':'65','defTime':'30','mintemp':'35','maxtemp':'230','mintime':'1','maxtime':'120',photo:'photo1'},
            {'modelId':'2','name':'消毒','defTemp':'150','defTime':'30','mintemp':'35','maxtemp':'230','mintime':'1','maxtime':'120',photo:'photo2'},
            {'modelId':'3','name':'饼干','defTemp':'180','defTime':'20','mintemp':'35','maxtemp':'230','mintime':'1','maxtime':'120',photo:'photo3'},
            {'modelId':'4','name':'蛋挞','defTemp':'210','defTime':'25','mintemp':'35','maxtemp':'230','mintime':'1','maxtime':'120',photo:'photo4'},
            {'modelId':'5','name':'面包','defTemp':'180','defTime':'40','mintemp':'35','maxtemp':'230','mintime':'1','maxtime':'120',photo:'photo5'},
            {'modelId':'6','name':'烤肉','defTemp':'160','defTime':'40','mintemp':'35','maxtemp':'230','mintime':'1','maxtime':'120',photo:'photo6'},
            {'modelId':'7','name':'披萨','defTemp':'200','defTime':'25','mintemp':'35','maxtemp':'230','mintime':'1','maxtime':'120',photo:'photo7'},
            {'modelId':'8','name':'烤薯','defTemp':'230','defTime':'45','mintemp':'35','maxtemp':'230','mintime':'1','maxtime':'120',photo:'photo8'},
            {'modelId':'9','name':'上烤','defTemp':'180','defTime':'30','mintemp':'35','maxtemp':'230','mintime':'1','maxtime':'120',photo:'photo9'},
            {'modelId':'10','name':'下烤','defTemp':'180','defTime':'30','mintemp':'35','maxtemp':'230','mintime':'1','maxtime':'120',photo:'photo10'},
            {'modelId':'11','name':'上下烤','defTemp':'220','defTime':'40','mintemp':'80','maxtemp':'230','mintime':'1','maxtime':'120',photo:'photo11'}
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