import {Link} from 'react-router';
const NoData = React.createClass({
        getDefaultProps: function(){
            return {
                
            }
        },
        render: function(){
            return (
                    <div className='m-nodevice flex'>
                        <div className="m-nodevice-ct flex-column">
                            <img src="../static/img/logo.png" className='logo'/>
                            <img src="../static/img/cc.png" className='robot'/>
                            <h2>暂无数据</h2>
                        </div>

                        <div className='m-btn flex'>                        
                            <div className="m-btn-mn flex" onTouchEnd={this.startMonitor}>
                                <Link to="/live" style={{color: '#7748D6'}}>开始监测</Link>
                            </div>                   
                        </div>
                    </div>
                )
        }
})

export default NoData;