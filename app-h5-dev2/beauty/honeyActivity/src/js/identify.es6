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
export class identify extends BaseComponent {
    constructor(props) {
        super(props);
        // let arr = JSON.parse(this.GetQueryString('localIds'));
        // let list = [];
        // if(arr){
        //     let len = arr.length;
        //     for(let i=0;i<len;i++){
        //         list[i] = {imgUrl:arr[i],isCover: 'N',imgId: null};
        //     }
        //     list[0].isCover = 'Y';
        // }
        this.state = {
            selected: 0,
            showPop: false,
            showshare: false,
            items: [],
            btnBg: false,
            showSave: false,
        };
        //alert(this.GetQueryString('localIds'));
        // alert(this.items)
        this.listenStore(Store); // 监听Store
    }
    GetQueryString(name){
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var res = window.location.hash;
         var r = res.substr(res.indexOf('?')+1).match(reg);
         if(r!=null) return decodeURI(r[2]);
         return null;
    }
    GetOid(name){
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null) return decodeURI(r[2]);
         return null;
    }
    componentDidMount(){
        let top = ReactDOM.findDOMNode(this.refs.top);
        top.scrollIntoView();
        wx.hideAllNonBaseMenuItem();
        let combId = this.GetOid('combId') || this.state.combinationId;
        let oid = this.GetQueryString('oid');
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
        if(this.state.combName!==null&&this.state.combName!==undefined){
            
            let combname = ReactDOM.findDOMNode(this.refs.combname);
            let applyname = ReactDOM.findDOMNode(this.refs.applyname);
            let applytel = ReactDOM.findDOMNode(this.refs.applytel);
            let honeyname = ReactDOM.findDOMNode(this.refs.honeyname);
            let honeytel = ReactDOM.findDOMNode(this.refs.honeytel);
            combname.value = this.state.combName;
            applyname.value = this.state.participantName;
            applytel.value = this.state.participantPhone;
            honeyname.value = this.state.bestieName;
            honeytel.value = this.state.bestiePhone;
            this.onchange();
            this.setState({
                combName:null,
                participantName:null,
                participantPhone:null,
                bestieName:null,
                bestiePhone:null,
            })
                
        }
         
    }
    cancelPop(e){
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            showPop: false
        })
    }
    selectTag(e){
        let index = e.target.getAttribute('data-id');
        if(index){
            // console.log(index)
            this.setState({
                selected:parseInt(index)
            })
        }
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
        let items = this.state.items;
        //alert(JSON.stringify(items))
        ReactDOM.findDOMNode(this.refs.combname).blur();
        ReactDOM.findDOMNode(this.refs.applyname).blur();
        ReactDOM.findDOMNode(this.refs.applytel).blur();
        ReactDOM.findDOMNode(this.refs.honeyname).blur();
        ReactDOM.findDOMNode(this.refs.honeytel).blur();
        let combname = ReactDOM.findDOMNode(this.refs.combname).value;
        // Actions.checkCombName(combname);
        let applyname = ReactDOM.findDOMNode(this.refs.applyname).value;
        let applytel = ReactDOM.findDOMNode(this.refs.applytel).value;
        let honeyname = ReactDOM.findDOMNode(this.refs.honeyname).value;
        let honeytel = ReactDOM.findDOMNode(this.refs.honeytel).value;
        let len = items.length;
        let selected = this.state.selected;
        let reg1 = /^[a-zA-Z0-9_\u4e00-\u9fa5]{1,16}$/;
        let reg2 = /^1[34578]\d{9}$/;
        let reg3 = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
        let reg4 = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]{2,15}$/;
        //已修改
        if(!this.state.btnBg){
            return
        }else if(len<3){
            showToast('请上传3张图片！');
            return
        }else if(!(reg1.test(combname))){
            this.setState({
                showPop: true,
                poptitle: '组合名称',
                popinfo: '请输入1~16位中英文、数字和下划线。'
            });
            return
        }else if(this.state.exist){
            this.setState({
                showPop: true,
                poptitle: '组合名称',
                popinfo: '组合名称已经存在，请重新选择一个',
                exist: false
            })
            return
        }else if(!selected){
            showToast('请选择一个组合宣言！');
            return
        }else if(!reg3.test(applyname)){
            showToast('申请人姓名: 包含特殊字符');
            return
        }else if(!reg4.test(applyname)){
            showToast('申请人姓名: 限制为2~15个字符');
            return
        }else if(!reg2.test(applytel)){
            this.setState({
                showPop: true,
                poptitle: '申请人手机号',
                popinfo: '格式错误，请输入11位有效手机号码'
            });
            return
        }else if(!reg3.test(honeyname)){
            showToast('闺蜜姓名: 包含特殊字符');
            return
        }else if(!reg4.test(honeyname)){
            showToast('闺蜜姓名: 限制为2~15个字符');
            return
        }else if(!reg2.test(honeytel)){
            this.setState({
                showPop: true,
                poptitle: '闺蜜手机号',
                popinfo: '格式错误，请输入11位有效手机号码'
            });
            return
        }
        
        let declarationId = parseInt(this.state.selected);
        let oid = this.GetQueryString('oid');
        let combId = this.state.combId || '';
        let participantId = this.state.participantId || '';
        let bestieId = this.state.bestieId || '';
        Actions.confirmApply(items,combname,declarationId,applyname,applytel,honeyname,honeytel,oid,combId,participantId,bestieId);
    }
    addPic(){
        let items = this.state.items;
        let len = items.length;
        let num = 3 - len;
        let _this = this;
        wx.chooseImage({
            count: num, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                let arr = [];
                let len = localIds.length;
                for(let i=0;i<len;i++){
                    arr[i] = {};
                    arr[i].imgUrl = localIds[i];
                    arr[i].isCover = 'N';
                    arr[i].imgId = null;
                }
                items = items.concat(arr);
                //alert(JSON.stringify(items));
                let len1 = items.length;
                if(len1>0){
                    let flag = true;
                    for(let i=0;i<len1;i++){
                        if(items[i].isCover=='Y'){
                            flag = false;
                        }
                    }
                    if(flag){
                        items[0].isCover = 'Y';
                    }
                }
                _this.setState({items:items});
                
            }
        });
    }
    removePic(e){
        let idx = e.currentTarget.getAttribute('data-num');
        let items = this.state.items;
        items.splice(idx,1);
        //alert(JSON.stringify(this.changeArr));
        let len = items.length;
        if(len>0){
            let flag = true;
            for(let i=0;i<len;i++){
                if(items[i].isCover=='Y'){
                    flag = false;
                }
            }
            if(flag){
                items[0].isCover = 'Y';
            }
        }
        
        this.setState({items: items});
    }
    setCover(e){
        let cov = e.currentTarget.getAttribute('data-cov');
        let items = this.state.items;
        items.map((item,idx)=>{
            if(idx==parseInt(cov)){
                item.isCover = 'Y';
            }else{
                item.isCover = 'N';
            }
        })
        this.setState({items: items});
    }
    onchange(){
        let combname = ReactDOM.findDOMNode(this.refs.combname).value;
        let applyname = ReactDOM.findDOMNode(this.refs.applyname).value;
        let applytel = ReactDOM.findDOMNode(this.refs.applytel).value;
        let honeyname = ReactDOM.findDOMNode(this.refs.honeyname).value;
        let honeytel = ReactDOM.findDOMNode(this.refs.honeytel).value;
        if(combname&&applyname&&applytel&&honeyname&&honeytel){
            this.setState({btnBg: true});
        }else{
            this.setState({btnBg: false});
        }
    }
    cancelShare(e){
        e.preventDefault();
        e.stopPropagation();
        this.setState({showshare: false});
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
                            <em data-cov={idx} onTouchTap={this.setCover.bind(this)} className={item.isCover=='Y'?'cover':''}></em>
                            <i data-num={idx} onTouchTap={this.removePic.bind(this)}></i>
                        </div>
                    )
            })
        }
        return (

            <div className='m-ide'>
                <div className='ide-top flex' ref='top'>
                    <div className='ide-top-con'>
                        <div className='smallphoto flex' id='sp'>
                            {items}
                            <div className='photo bg flex' style={len==3?{display:'none'}:{}} onTouchTap={this.addPic.bind(this)}></div>
                        </div>
                        <h3>封面照片将用在投票页面</h3>
                    </div>
                </div>

                <div className='ide-body flex'>
                    <div className='ide-body-con'>
                        <div className='ide-group flex'>
                            <h2>组合名称</h2>
                            <input type='text' ref='combname' placeholder='1~16位中英文、数字或下划线' onBlur={this.onchange.bind(this)}/>
                        </div>

                        <div className='ide-watchword flex'>
                            <h2>组合宣言</h2>
                            <div className='wordtag' onTouchTap={this.selectTag.bind(this)}>
                                <p data-id='1' className={this.state.selected==1?'selected':''}>{this.state.tag1}</p>
                                <p data-id='2' className={this.state.selected==2?'selected':''}>{this.state.tag2}</p>
                                <p data-id='3' className={this.state.selected==3?'selected':''}>{this.state.tag3}</p>
                                <p data-id='4' className={this.state.selected==4?'selected':''}>{this.state.tag4}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bgcolor'></div>

                <div className='ide-footer flex'>
                    <div className='ide-footer-con flex'>
                        <div className='ideinfo flex'>
                            <h2>申请人姓名</h2>
                            <input ref='applyname' type='text' placeholder='你的名字' onBlur={this.onchange.bind(this)}/>
                        </div>
                        <div className='ideinfo flex'>
                            <h2>申请人手机</h2>
                            <input ref='applytel' type='tel' placeholder='11位手机号' onBlur={this.onchange.bind(this)}/>
                        </div>
                        <div className='ideinfo flex'>
                            <h2>闺蜜姓名</h2>
                            <input ref='honeyname' type='text' placeholder='闺蜜的名字' onBlur={this.onchange.bind(this)}/>
                        </div>
                        <div className='ideinfo flex'>
                            <h2>闺蜜手机</h2>
                            <input ref='honeytel' type='tel' placeholder='11位手机号' onBlur={this.onchange.bind(this)}/>
                        </div>

                        <div className='idetip flex'>
                            <p>请填写您的真实信息,否则将影响正常申请流程.C-Life美容将保证您的个人信息安全。</p>
                        </div>
                        
                        <button className={this.state.btnActive?'idebtn1':'idebtn'} onTouchStart={this.downBtn.bind(this)} onTouchMove={this.moveBtn.bind(this)} onTouchTap={this.confirmApply.bind(this)} style={this.state.btnBg?{opacity:1}:{opacity:.4}}>保存并转发送给闺蜜接力</button>
                    </div>
                </div>

                <div className='share2f' style={this.state.showshare?{display:''}:{display:'none'}} onTouchTap={this.cancelShare.bind(this)}>
                    <div className='arrow flex'>
                        <img src='../static/img/share2.png'/>
                    </div>
                    <div className='wordtip flex'>
                        <p>点击右上角,选择“发送给朋友”</p>
                        <p>转发给闺蜜接力,</p>
                        <p>就可以一起赢取美容套件啦！</p>
                    </div>

                </div>

                <div className='m-toast' id='toast' style={{display: 'none'}}></div>

                <div className='m-save flex' id='toast' style={this.state.showSave?{}:{display: 'none'}}>
                    
                    <img src='../static/img/loading.gif'/>
                    <p>保存中...</p>

                </div>

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