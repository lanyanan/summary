/**
 * Created by Administrator on 2016-08-12.
 */
/**
 * Created by Administrator on 2016-08-11.
 */
/**
 * Created by Administrator on 2016-08-11.
 */

//<a href={'health://skip_url/membersList'} className='mpt-header-user-img'>
//    <img className='user-port' src={this.props.userdata?this.props.userdata:'./../static/img/user-mes.png'}/>
//
//</a>
let PromptMeasure = React.createClass({
        render(){
            //let userName = this.props.userdata.nickname ? this.props.userdata.nickname : '美男子',
            //console.log(this.props.userdata);
            let userdata=this.props.userdata? this.props.userdata: './../static/img/user-mes.png',nickName=this.props.myname?this.props.myname:'';
            return (
                <div>
                    <header className='mpt-header'>
                        <div></div>
                        <div className='mpt-header-flex'>
                            <div style={{float: 'left',display: 'flex',flexDirection: 'column',textAlign: 'center',marginLeft: '0.3rem'}}>
                                <a href={'health://skip_url/membersList'} onTouchEnd={()=>window.location.href='health://skip_url/membersList'}><img  className='mpt-header-user-img'src={userdata}/></a>
                                <span style={{fontSize:'0.2rem',color:'#eee'}}>{nickName}</span>
                            </div>
                            <span className='mpt-header-span'>请上秤测量你的身体指标</span>
                        </div>
                    </header>
                    <div className='mpt-wrap-tips'>
                        <div style={{marginLeft:'0.3rem'}}>
                            <span className='mpt-tips-title'>暖心小贴士,快速get用秤技巧</span>
                            <div style={{display:'flex',justifyContent: 'space-around'}}>
                                <img src='./../static/img/tips-bg.png' className="tips-r"/>
                                <ul className='mpt-tips-ul'>
                                    <li style={{flexGrow:1}}>打开手机蓝牙</li>
                                    <li style={{flexGrow:2}}>把秤放在平坦且坚硬的地面上,否则会出现较大误差</li>
                                    <li style={{flexGrow:2}}>脱掉袜子,双脚平均踩在上面,才能准确测出各项指标</li>
                                    <li>设备同步到手机后,可在APP上查看各项身体指标</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <a className='mpt-footer ' href={'health://skip_url/measureBalance'}>上秤</a>
                </div>
            )
        }
    })
    ;

export default PromptMeasure;
//<img className='mpt-wrap-tips-pic' src='./../static/img/prompt-tips.png'/>