import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Store} from './Store.es6';
import {Actions} from './Actions.es6';

function showToast(msg){
    clearTimeout(st);
    let toast = document.getElementById('toast');
    toast.innerHTML = '';
    toast.style.display = 'block';
    toast.innerHTML = msg;
    var st = setTimeout(function(){
        toast.style.display = 'none';
    },3000);

}

// 创建React组件
export class bestieConfirm extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            showPop: false,
            showshare: false,
            items: [],
            btnBg: false,
            confirm: '提交',
        };
        //alert(this.GetQueryString('localIds'));
        // alert(this.items)
        this.listenStore(Store); // 监听Store
    }
    GetQueryString(name){
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var res = window.location.search;
         var r = res.substr(res.indexOf('?')+1).match(reg);
         if(r!=null) return decodeURI(r[2]);
         return null;
    }
    componentDidMount(){
        let oid = this.GetQueryString('oid');
        let combId = this.GetQueryString('combId');
        Actions.getTags();
        Actions.getInfo(oid,combId);
    }
    componentDidUpdate(){
        //处理图片压缩变形
        function handlePic($img){
            let width = $img.width();
            let height = $img.height();
            if(width>=height){
                $img.css({'height': '100%'}); 
            }
            if(height>width){
                $img.css({'width': '100%'});
            }
        }
        $('.scale-pic').each(function(i){
                
                $('.scale-pic').on('load',function(){
                    handlePic($(this));
                })
                
        })
    }
    cancelPop(){
        this.setState({
            showPop: false
        })
    }
    tapPhoto(e){
        let idx = parseInt(e.currentTarget.getAttribute('data-idx'));
        let len = this.state.items.length;
        let arr = [];
        let items = this.state.items;
        for(let i=0;i<len;i++){
            arr.push(items[i].imgUrl);
        }
        Actions.tapPhoto(arr,idx);
    }
    confirmApply(){
        this.setState({btnActive: false});
        if(this.state.confirm!=='提交'){
            return
        }
        let oid = this.GetQueryString('oid');
        let combId = this.GetQueryString('combId');
        Actions.confirmBestie(oid,combId);
    }
    downBtn(e){
        e.preventDefault();
        e.stopPropagation();
        this.setState({btnActive: true});
    }
    moveBtn(e){
        e.preventDefault();
        e.stopPropagation();
        this.setState({btnActive: false});
    }
    render(){
        //alert(JSON.stringify(this.state.items));
        let imgItems = this.state.items;
        let items = null;
        let len = 0;
        if(imgItems.length>0){
            len = imgItems.length;
            items = imgItems.map((item,idx)=>{
                return (
                        <div className='photo pic-wrap' key={idx}>
                            <div className='pic-con'>
                                <img src={item.imgUrl} className='scale-pic' data-idx={idx} onTouchTap={this.tapPhoto.bind(this)} />
                            </div>
                            <em data-cov={idx} style={item.isCover=='Y'?{display:''}:{display:'none'}} className={item.isCover=='Y'?'cover':''}></em>
                        </div>
                    )
            })
        }
        return (

            <div className='m-ide'>
                <div className='ide-top flex'>
                    <div className='ide-top-con'>
                        <div className='smallphoto flex'>
                            {items}
                        </div>
                        <h3>封面照片将用在投票页面</h3>
                    </div>
                </div>

                <div className='ide-body flex'>
                    <div className='ide-body-con'>
                        <div className='ide-group flex'>
                            <h2>组合名称</h2>
                            <input type='text' ref='combname' disabled='disabled' value={this.state.combName} />
                        </div>

                        <div className='ide-watchword flex'>
                            <h2>组合宣言</h2>
                            <div className='wordtag'>
                                <p data-id='1' className={this.state.selected==1?'selected':''}>{this.state.tag1||'点一支烟，将温柔卷成细丝去燃烧'}</p>
                                <p data-id='2' className={this.state.selected==2?'selected':''}>{this.state.tag2||'记忆是我们所共同拥有的最美好'}</p>
                                <p data-id='3' className={this.state.selected==3?'selected':''}>{this.state.tag3||'情若为花开'}</p>
                                <p data-id='4' className={this.state.selected==4?'selected':''}>{this.state.tag4||'拨袖舞清风 独醉红衣泪'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bgcolor'></div>

                <div className='ide-footer flex'>
                    <div className='ide-footer-con flex'>
                        <div className='ideinfo flex'>
                            <h2>申请人姓名</h2>
                            <input ref='applyname' disabled='disabled' type='text' value={this.state.participantName|| ''}/>
                        </div>
                        <div className='ideinfo flex'>
                            <h2>申请人手机</h2>
                            <input ref='applytel' disabled='disabled' type='text' value={this.state.participantPhone|| ''}/>
                        </div>
                        <div className='ideinfo flex'>
                            <h2>闺蜜姓名</h2>
                            <input ref='honeyname' disabled='disabled' type='text' value={this.state.bestieName|| ''}/>
                        </div>
                        <div className='ideinfo flex'>
                            <h2>闺蜜手机</h2>
                            <input ref='honeytel' disabled='disabled' type='text' value={this.state.bestiePhone|| ''}/>
                        </div>

                    {/*  
                        <div className='idetip flex'>
                            <p>请填写您的真实信息,否则将影响正常申请流程.C-Life美容将保证您的个人信息安全。</p>
                        </div>
                    */}
                        
                        
                        <button className={this.state.btnActive?'idebtn1':'idebtn'} onTouchStart={this.downBtn.bind(this)} onTouchMove={this.moveBtn.bind(this)} onTouchTap={this.confirmApply.bind(this)} style={this.state.confirm!=='提交'?{background: '#BCBCBC',color: '#666'}:{}}>{this.state.confirm}</button>
                    </div>
                </div>

                <div className='share2f' style={this.state.showshare?{display:''}:{display:'none'}}>
                    <div className='arrow flex'>
                        <img src='../static/img/share2.png'/>
                    </div>
                    <div className='wordtip flex'>
                        <p>点击右上角,选择“发给朋友”</p>
                        <p>转发给闺蜜接力,</p>
                        <p>就可以一起赢取美容套件啦！</p>
                    </div>

                </div>

                <div className='m-toast' id='toast' style={{display: 'none'}}></div>

                <div className='m-pop' id='pop' style={this.state.showPop?{}:{display: 'none'}}>
                    <div className='popshade'></div>
                    <div className='popwrap flex'>
                        <div className='popcon flex'>
                            <h2 id='poptitle'>{this.state.poptitle||'组合名称'}</h2>
                            <p id='popinfo'>{this.state.popinfo||'请输入有效信息'}</p>
                        </div>
                        <div className='popcancel' onTouchTap={this.cancelPop.bind(this)}>我知道了</div>
                    </div>
                </div>
            </div>

            )
    }
}