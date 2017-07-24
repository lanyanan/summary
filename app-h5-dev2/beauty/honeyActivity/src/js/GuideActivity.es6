import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

// 开始渲染
het.domReady(()=>{
    het.setTitle('闺蜜行动');
});

// 创建React组件
export class GuideActivity extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            cname:this.GetQueryString('cname') || ''
        };
        this.listenStore(Store); // 监听Store
    }
    componentDidMount() {
        
    }
    componentWillUpdate() {
        
    }
    componentDidUpdate(){
        
    }
    GetQueryString(name){
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null) return decodeURI(r[2]);
         return null;
    }
    render() {
        return (
            <div className="guide-box">
                <p>只需要3步</p>
                <p>就可以给闺蜜助力，一起赢取美容套件</p>
                <div className="guide-step flex">
                    <span className="number">1</span><span className="flex-cell">关注并打开CLady公众号</span>
                </div>
                <div className="guide-step flex">
                    <span className="number">2</span><span className="flex-cell">点击底部的“闺蜜行动”，进入活动详情页</span>
                </div>
                <div className="guide-step flex">
                    <span className="number">3</span><span className="flex-cell">点击活动详情页底部的“马上参加”按钮就可以参与活动啦</span>
                </div>
                <img className="qr-code" src="../static/img/clady-code.jpg"/>         
                <p>长按二维码</p>
                <p>关注或打开CLady公众号</p>
            </div>
        );
    }
}
