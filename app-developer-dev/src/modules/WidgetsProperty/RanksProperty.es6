'use strict';
/**
 * 九宫格行列
 * @author   hey
 * @datetime 2017-06-05
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';

export let RanksProperty = {
	getComponent : React.createClass({
        addNum: function(e){
            e.preventDefault();
            e.stopPropagation()
            let type = e.target.getAttribute('data-type');
            let row = Number(e.target.getAttribute('data-row'));
            let column = Number(e.target.getAttribute('data-column'));
            if(type == "row"){
                if(row == 2) return false;
                let height = this.getNum(row + 1,column);

                Actions.changeSize('height',height);
                Actions.changeWidgetInfo('row',row + 1);
            }else{
                if(column == 4) return false;
                let height = this.getNum(row,column + 1);
                
                Actions.changeSize('height',height);
                Actions.changeWidgetInfo('column',column + 1);
            }
            
        },
        subNum: function(e){
            e.preventDefault();
            e.stopPropagation();
            let type = e.target.getAttribute('data-type');
            let row = Number(e.target.getAttribute('data-row'));
            let column = Number(e.target.getAttribute('data-column'));
            
            if(type == "row"){
                if(row === 1) return false;
                let height = this.getNum(row - 1,column);

                Actions.changeSize('height',height);
                Actions.changeWidgetInfo('row',row - 1);
            }else{
                if(column === 2) return false;
                let height = this.getNum(row,column - 1);

                Actions.changeSize('height',height);
                Actions.changeWidgetInfo('column',column - 1);
            }
        },
        getNum: function(row,column){
            let height = 184;
            let num = row * column;
            switch(num){
                case 2:
                   height = 184; 
                break;
                case 3:
                   height = 128; 
                break;
                case 6:
                   height = 247; 
                break;
                case 8:
                   height = 247; 
                break;
            }
            if(row == 2 && column==2){
                height = 247;
            }
            if(row == 1 && column==4){
                height = 128;
            }
            return height;
        },
        render: function(){
            let row = this.props.row ? this.props.row : 1,
                column = this.props.column ? this.props.column : 2;
            return (
                    <section className="speeddial-ranks">
                        <span>行列</span> 
                        <section className="speeddial-ranks-row">
                            <em className="sub" data-type="row" data-row={row} data-column={column} onClick={this.subNum}>-</em>
                            <span>{row}</span>
                            <em className="add" data-type="row" data-row={row} data-column={column} onClick={this.addNum}>+</em>
                        </section>
                        <section  className="speeddial-ranks-column">
                            <em className="sub" data-type="column" data-row={row} data-column={column} onClick={this.subNum}>-</em>
                            <span>{column}</span>
                            <em className="add" data-type="column" data-row={row} data-column={column} onClick={this.addNum}>+</em>
                        </section>
                    </section>
            );
        }
    })
};