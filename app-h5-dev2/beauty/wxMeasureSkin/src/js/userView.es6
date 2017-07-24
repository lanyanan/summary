import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

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

function getQueryString(name){
     let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     let hash = window.location.hash;
     let r = hash.substr(hash.indexOf('?')+1).match(reg);
     if(r!=null) return decodeURI(r[2]);
     return '';
}

function changePart(part){
    //1:额头 2:左脸 3:右脸 4:鼻子 5:眼周 6:手部
    //11:额头 13:左脸 15:右脸 12:鼻子 2:眼周 3:手部
    let val = 0;
    switch(part){
        case 11:
            val = 1;break;
        case 13:
            val = 2;break;
        case 15:
            val = 3;break;
        case 12:
            val = 4;break;
        case 2:
            val = 5;break;
        case 3:
            val = 6;break;
    }
    return val;
}

function setDocumentTitle (title) {
     document.title = title;
     if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
         var i = document.createElement('iframe');
         i.src = '/favicon.ico';
         i.style.display = 'none';
         i.onload = function() {
             setTimeout(function(){
                  i.remove();
             }, 9)
         }
         document.body.appendChild(i);
     }
 }
// 创建React组件
export class userView extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            showSex: false,
            sex: '女',
            part:0,
            skinTypeName: '',
            skinAreaRank: '',
            proId: 6,
            cityId: 77,
            date: '1990/1/1',
        };
        het.setTitle('水油弹性测试');
        setDocumentTitle('水油弹性测试');
        this.partArr = ['额头','左脸','右脸','鼻子','眼周','手部'];
        this.listenStore(Store); // 监听Store
    }
    componentWillUnmount(){
        Actions.hideShareMenu();
    }
    componentDidMount(){
        let _this = this;
        new DateSelector({
            input: 'date-picker',
            container: 'date-con',
            type: 0,
            param: [1,1,1],
            beginTime: [1950,1,1],
            endTime: [2017,2,28],
            recentTime: [1990,1,1],
            success: function(arr){
                let date = arr[0]+'/'+arr[1]+'/'+arr[2];
                _this.setState({date: date})
            }
        });
        let area = ReactDOM.findDOMNode(_this.refs['area']);
        Actions.getPosition(area);
        let oid = getQueryString('openid');
        let lastInsertId = getQueryString('lastInsertId');
        Actions.getSingleResult(oid,lastInsertId);
        
    }
    handleTap(e){
        e.preventDefault();
        e.stopPropagation();
        
    }
    confirmSex(e){
        e.preventDefault();
        e.stopPropagation();
        let name = e.currentTarget.getAttribute('data-name');
        this.setState({
            showSex: false,
            sex: name,
        });
    }
    cancelSelect(e){
        e.preventDefault();
        e.stopPropagation();
        this.setState({showSex: false})
    }
    selectSex(e){
        this.setState({showSex: true})
    }
    getResult(e){
        let sex = this.state.sex==='女'?2:1;
        let oid = getQueryString('openid');
        let birthday = this.state.date.replace(/\//g,'-');
        let province = this.state.proId;
        let city= this.state.cityId;
        Actions.saveUseInfo(oid,birthday,sex,province,city);
    }
    render() {
        let list = ['男','女'];
        let items = null;
        items = list.map((item,index)=>{

            return (
                    <li key={index} data-name={item} onTouchTap={this.confirmSex.bind(this)}>
                        <span>{item}</span>
                        <img src='../static/img/gou.png' style={{display: `${this.state.sex===item?'':'none'}`}}/>
                    </li>
                )
        })
        let part = this.state.part || 0;
        return (
                <div className='m-userView'>
                    
                    <section className="measure-result">
                        <section className="r-top">
                            <h3>{(this.partArr[changePart(part)-1] || '')+'的肤质为'}</h3>
                            <h2>{this.state.skinTypeName}</h2>
                        </section>
                        <section className="r-middle">
                            <figure className="woe-data">
                                <h5 className="item water-item">水份<b>{this.state.water}</b><span>%</span></h5>
                                <p className="flex desc">
                                    <span className="w40 tac">缺水</span>
                                    <span className="w20 tac">正常</span>
                                    <span className="w40 tac">湿润</span>
                                </p>
                                <p className="flex colorful water-color">
                                    <i className="w40"></i><i className="w20"></i><i className="w40"></i>
                                    <b style={{left:(this.state.water+'%')}}></b>
                                </p>
                                <p className="flex desc">
                                    <span className="flex-cell tal">00</span>
                                    <span className="flex-cell tac" style={{textIndent:'1.4rem'}}>40%</span>
                                    <span className="flex-cell tac" style={{textIndent:'-0.8rem'}}>60%</span>
                                    <span className="flex-cell tar">99.9%</span>
                                </p>
                            </figure>
                            <figure className="woe-data">
                                <h5 className="item oil-item">油份<b>{this.state.oil}</b><span>%</span></h5>
                                <p className="flex desc">
                                    <span className="w15 tac">缺油</span>
                                    <span className="w10 tac">正常</span>
                                    <span className="w75 tac">偏油</span>
                                </p>
                                <p className="flex colorful oil-color">
                                    <i className="w15"></i><i className="w10"></i><i className="w75"></i>
                                    <b style={{left:(this.state.oil+'%')}}></b>
                                </p>
                                <p className="flex desc">
                                    <span className="flex-cell tal">00</span>
                                    <span className="flex-cell tal" style={{textIndent:'-0.8rem'}}>15%</span>
                                    <span className="flex-cell tac" style={{textIndent:'-4.9rem'}}>25%</span>
                                    <span className="flex-cell tal"></span>
                                    <span className="flex-cell tal"></span>
                                    <span className="flex-cell tal"></span>
                                    <span className="flex-cell tar">99.9%</span>
                                </p>
                            </figure>
                            <figure className="woe-data">
                                <h5 className="item tx-item">弹性<b>{this.state.elasticity}</b></h5>
                                <p className="flex desc">
                                    <span className="w37 tac">易皱纹</span>
                                    <span className="w00 tac"></span>
                                    <span className="w63 tac" style={{textIndent:'-1rem'}}>紧致</span>
                                </p>
                                <p className="flex colorful tx-color">
                                    <i className="w37"></i><i className="w00"></i><i className="w63"></i>
                                    <b style={{left:(this.state.elasticity*10+'%')}}></b>
                                </p>
                                <p className="flex desc">
                                    <span className="flex-cell tal">00</span>
                                    <span className="flex-cell tac" style={{textIndent:'-0.1rem'}}>3.7</span>
                                    <span className="flex-cell tac"></span>
                                    <span className="flex-cell tar">9.9</span>
                                </p>
                            </figure>
                        </section>
                    </section>

                    <div className='changeInfo' style={typeof this.state.userInfoStatus !== undefined&&this.state.userInfoStatus===0?{}:{display:'none'}}>
                        
                        <div className='color-block' style={this.state.userInfoStatus?{display: 'none'}:{display: ''}}></div>

                        <div className='user-info flex' style={this.state.userInfoStatus?{display: 'none'}:{display: ''}}>
                            
                            <div className='info-con'>
                                
                                <p>输入个人数据，就可以生成您的肤质分析了！</p>
                                <div className='user-select flex'>
                                    <h2>性别</h2>
                                    <p onTouchTap={this.selectSex.bind(this)} ref='sex'>{this.state.sex}</p>
                                </div>
                                <div className='user-select flex'>
                                    <h2>生日</h2>
                                    <p className='date-picker' id='date-picker' ref='date'>{this.state.date}</p>
                                </div>
                                <div className='user-select flex'>
                                    <h2>地区</h2>
                                    <p className='area-picker' id='area-picker' ref='area'>广东深圳</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className='skinRank' style={this.state.userInfoStatus?{}:{display: 'none'}}>{'结果表明,您当前眼周肤质优于'+this.state.skinAreaRank+'％同龄用户！'}</p>
                    <div className='color-block' style={this.state.userInfoStatus?{}:{display: 'none'}}></div>

                    <div className='result-info' style={this.state.userInfoStatus?{}:{display: 'none'}}>
                        
                        <div className='result-item'>
                            <h2>肤质分析</h2>
                            <p>{this.state.skinProblem}</p>
                        </div>
                        <div className='result-item'>
                            <h2 className='introduce'>护肤指南</h2>
                            <p>{this.state.skinGuide}</p>
                        </div>

                    </div>

                    <button className='get-btn' onTouchTap={this.getResult.bind(this)} style={typeof this.state.userInfoStatus !== undefined&&this.state.userInfoStatus===0?{}:{display:'none'}}>生成测试分析</button>

                    <div className='sex-select' style={{display: `${this.state.showSex?'':'none'}`}}>
                        <div className='sex-shade' onTouchTap={this.cancelSelect.bind(this)}></div>
                        <div className='sex-item' style={{bottom:this.state.showSex? 0 :"-24rem"}}>
                            {items}
                        </div> 
                    </div>

                    <div className='date-con' id='date-con'>
                        
                    </div>
                    <div className='area-con' id='area-con'>
                        
                    </div>
                </div>
            )
    }
}