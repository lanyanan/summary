import Path from './ApiPath.es6';
const Scene = React.createClass({
    getInitialState: function(){
        return {
            sceneName: '',
        }
    },  
    componentDidMount: function(){
       //隐藏浮层
       if($('#appdownload')){
          $('#appdownload').css({display: 'none'});
          $('#m-tabselect').css({bottom: 0});
       }
       var _this = this;
       var status = _this.state.status;
       $.ajax({
           url: Path.wPath+'/wechat/hotel/scene/getHotelScene',
           dataType: 'json',
           cache:true,
           async:true,
           success: function(r){
              if (r.code==0) {
                  var sceneId = r.data.sceneId;
                  var sceneName = r.data.sceneName;
                  var runStatus = r.data.runStatus;
                  _this.setState({
                      sceneId : sceneId,
                      sceneName : sceneName,
                      runStatus : runStatus?true:false
                  })
              }
           }
       })
       
    },
    changOperate: function(){
        // var wechat = this.getCookie('wechatUserId');
        // alert(wechat)
        var _this = this;
        var runStatus = _this.state.runStatus;
        var sceneId = _this.state.sceneId;
        runStatus = !runStatus;
        this.setState({runStatus:runStatus});
        var operate = runStatus?'on':'off';
            $.ajax({
                url: Path.wPath+'/wechat/hotel/scene/setScene?id='+sceneId+'&operate='+operate,
                dataType: 'json',
                cache:true,
                async:true,
                success: function(r){
                    if(r.code==0){
                        console.log('场景设置成功');
                    }else{
                        _this.setState({runStatus:!runStatus});
                        alert('场景设置失败');
                    }
                }
            })
    },
    render: function(){
        var runStatus = this.state.runStatus;
        var hidden = {};
        if(runStatus==undefined){
            hidden={display: 'none'}
        }
        var sceneName = this.state.sceneName;
        // if(status){
        //     var bigStyle={background: '#9C7BDF'},
        //         smallStyle={right: '1px'};
        // }else{
        //     bigStyle={background: '#F3F3F3'};
        //     smallStyle={left: '1px'};
        // }
        //console.log('2time',new Date().getTime());
        return (

            <div className="m-scene">
                <div className="goup-scene flex">
                    <img src="../static/img/goup.png" />
                    <div className="scene-info flex-column">
                        <h2>{sceneName}</h2>
                        <p>当你睁开眼睛，阳光洒进卧室，轻柔的</p>
                    </div>
                    <div className={'scene-btn '+(runStatus?'on':'off')} onTouchEnd={this.changOperate} style={hidden}>
                        <em ></em>
                    </div>
                </div>

                <p className="scene-exp">开启场景后,设备会自动识别您的睡眠,联动设备给您提供最舒适的睡眠环境。</p>
            </div>
            )
    }
});

export default Scene;