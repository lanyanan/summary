/**
 * Created by yuanyunlong on 16/10/22.
 */

import React from 'react';


export class Modes extends React.Component {

    constructor(props) {
        super(props);

        this.items = [
            {id:1, isOn:parseInt(this.props.lightIndex) == 1, name:"冷光"},
            {id:2, isOn:parseInt(this.props.lightIndex) == 2, name:"暖光"},
            {id:3, isOn:parseInt(this.props.lightIndex) == 3, name:"智能"}];

    }

    touchStart(event){
        event.preventDefault();
        // 这里必须是currentTarget
        // 并且属性的命名一定是 data-index
        var index = event.currentTarget.getAttribute('data-index');
        if(typeof this.props.touchAction === 'function'){
            this.props.touchAction(index);
        }
    }


    render() {
        //noinspection JSAnnotator
        this.items[0].isOn = this.props.lightIndex == 1 ;
        this.items[1].isOn = this.props.lightIndex == 2 ;
        this.items[2].isOn = this.props.lightIndex == 3 ;;

        return (<section className="mode flex" >
                    {this.items.map(((o) => {

                    var status = o.isOn?'on':'off';
                    return (<dl className="flex-cell" key={o.id}  data-index={o.id} onTouchStart={this.touchStart.bind(this)}   >
                                <dd><img src={"../static/img/pic_modebutton_"+o.id+"_"+status+".png"}/></dd>
                                <dt className={status} >{o.name}</dt>
                            </dl>);
                    }).bind(this))}
                </section>);
    }

};