/**
 * 保存设置按钮组件
 * @prop {string} settingStatus  设置按钮状态
 * @act  {function} this.props.callback 点击保存时触发
 */
var SettingButton = React.createClass({
    getInitialState: function(){
        return {
        };
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            settingBtnStatus:nextProps.settingStatus
        });
    },
    TouchStart: function(e){
        if(this.state.settingBtnStatus=='off') return;
        var status = this.state.settingBtnStatus=='active'?'on':'active';
        this.setState({
            settingBtnStatus:status
        });
    },
    TouchEnd:function(e){
        if(this.state.settingBtnStatus=='off') return;
        if(typeof this.props.callback === 'function'){
            this.props.callback();
        }
    },
    render : function() {
        var idx = this.state.settingBtnStatus || this.props.settingStatus || 'off';
        return (
            <section onTouchStart={this.TouchStart} onTouchEnd={this.TouchEnd} className={"settingbtn-"+idx}>
                <em>保存</em>
            </section>
        );
    }
});
module.exports = SettingButton;