// 食物分类处理类
export class FoodClass{
    constructor(){
        this.items = [
        {
            'foodClassId': '1',
            'foodClassName': '谷类',
            'foodClassIconUrl': '../static/img/foodClass/1.png'
        }, {
            'foodClassId': '2',
            'foodClassName': '蛋类',
            'foodClassIconUrl': '../static/img/foodClass/2.png'
        }, {
            'foodClassId': '3',
            'foodClassName': '奶类',
            'foodClassIconUrl': '../static/img/foodClass/3.png'
        }, {
            'foodClassId': '4',
            'foodClassName': '豆类',
            'foodClassIconUrl': '../static/img/foodClass/4.png'
        }, {
            'foodClassId': '5',
            'foodClassName': '肉类',
            'foodClassIconUrl': '../static/img/foodClass/5.png'
        }, {
            'foodClassId': '6',
            'foodClassName': '蔬菜类',
            'foodClassIconUrl': '../static/img/foodClass/6.png'
        }, {
            'foodClassId': '7',
            'foodClassName': '瓜果类',
            'foodClassIconUrl': '../static/img/foodClass/7.png'
        }, {
            'foodClassId': '8',
            'foodClassName': '根茎类',
            'foodClassIconUrl': '../static/img/foodClass/8.png'
        }, {
            'foodClassId': '9',
            'foodClassName': '鱼虾类',
            'foodClassIconUrl': '../static/img/foodClass/9.png'
        }, {
            'foodClassId': '10',
            'foodClassName': '贝类',
            'foodClassIconUrl': '../static/img/foodClass/10.png'
        }, {
            'foodClassId': '11',
            'foodClassName': '干果类',
            'foodClassIconUrl': '../static/img/foodClass/11.png'
        }, {
            'foodClassId': '12',
            'foodClassName': '调味品',
            'foodClassIconUrl': '../static/img/foodClass/12.png'
        }];
    }
    getAll(){
        return this.items;
    }
    getClassName(id){
        for (let i in this.items) {
            if (this.items[i].foodClassId == id) {
                return this.items[i].foodClassName;
            }
        }
    }
    getClassIcon(id){
        for (let i in this.items) {
            if (this.items[i].foodClassId == id) {
                return this.items[i].foodClassIconUrl;
            }
        }
    }
};