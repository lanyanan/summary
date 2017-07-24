/**
 * Created by Administrator on 2016-08-12.
 */
/**
 * Created by Administrator on 2016-08-11.
 */
import {MeasureMesList} from './MeasureMesList.jsx';
import {Actions} from '../Actions.es6';

//het.ready((data)=> {
//    Actions.ready(data);
//});

let LoadMainData = React.createClass({
    stopSlider(e){
        e.preventDefault();
        e.stopPropagation();
    },
    locationHref(){
      //window.location.href='health://skip_url/membersList';
        //alert(window.location.href);
    },
    render() {
        let _weight = this.props.mydata[0][0].weight ? this.props.mydata[0][0].weight : '--.--',
            _fatRate = this.props.mydata[0][0].fatRate ? this.props.mydata[0][0].fatRate : '--.--',
            _bmiRate = this.props.mydata[0][0].bmiRate ? this.props.mydata[0][0].bmiRate : '--.--';
        let mesData = this.props.mydata,imgSrC=this.props.myuserMes? this.props.myuserMes: './../static/img/user-mes.png',nickName=this.props.myname;
        return (
            <div>
                <header className='index-header' onTouchStart={this.stopSlider}>
                    <div></div>
                    <div className='user-message'>
                        <div style={{float: 'left',display: 'flex',flexDirection: 'column',textAlign: 'center',marginLeft: '0.6rem'}}>
                            <a href={'health://skip_url/membersList'} onTouchEnd={()=>window.location.href='health://skip_url/membersList'}><img  className='mpt-header-user-img'src={imgSrC}/></a>
                            <span style={{fontSize:'0.22rem',color:'#eee'}}>{this.props.myname}</span>
                        </div>+
                        <ul className='user-message-ul'>
                            <li><span>体重</span><span className='bigger-date'>{_weight}<span
                                style={{fontSize:'0.26rem'}}>kg</span></span></li>
                            <li><span>脂肪率</span><span className='bigger-date'>{_fatRate}<span
                                style={{fontSize:'0.26rem'}}>%</span></span></li>
                            <li><span>BMI</span><span className='bigger-date'>{_bmiRate}</span></li>
                        </ul>
                    </div>
                </header>
                <section id='client-information' >
                    {mesData.map(function (it, idx) {
                        return <MeasureMesList mesData={it} key={idx}/>
                     })
                    }
                </section>
                <footer className='operation'>
                    <a className='op-footer-l' href='health://skip_url/measureBalance'><span>上秤</span></a>
                    <a style={{height:'0.8rem',width:'0.2rem'}}>|</a>
                    <a className='op-footer-r' href='health://skip_url/historicalData'><span>历史数据</span></a>
                </footer>
            </div>
        )
    }
});

export default LoadMainData;
