import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Component} from 'react';
import {Link} from 'react-router';

/* 
 判断是否为数组
 */ 
function isArrayFn(value){ 
    if (typeof Array.isArray === "function") { 
        return Array.isArray(value); 
    }else{ 
        return Object.prototype.toString.call(value) === "[object Array]"; 
    } 
} 

// 创建React组件
export class AddCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.listenable = Store.listen((data)=>this.setState(data)); // 监听Store
    }
    componentDidMount(){
        
    }
    componentWillUnmount(){
        this.listenable();
    }
    handleTap(e){
        e.currentTarget.click();
    }
    render() {
        return (
                <div>
                    <div className='m-tab flex'>
                        <Link to='/addCourse/singleCourse' activeClassName='active' onTouchTap={this.handleTap.bind(this)}><span>单次课程</span></Link>
                        <Link to='/addCourse/periodCourse' activeClassName='active' onTouchTap={this.handleTap.bind(this)}><span>周期课程</span></Link>
                    </div>
                    <div className='course-detail'>
                        {this.props.children}
                    </div>
                </div>
                
            );
    }
}