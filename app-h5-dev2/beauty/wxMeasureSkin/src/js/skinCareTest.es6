import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

function showToast(msg){
    clearTimeout(st);
    let toast = document.getElementById('toast');
    toast.style.display = 'block';
    toast.innerHTML = msg;
    var st = setTimeout(function(){
        toast.style.display = 'none';
    },3000);
}

function getCookie(c_name) {
    if (document.cookie.length>0) {
        let c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1) { 
            c_start=c_start + c_name.length+1 ;
            let c_end=document.cookie.indexOf(";",c_start);
        if (c_end==-1) c_end=document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
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
export class skinCareTest extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            productShow: false,
            face: false,
            eye: false,
            hand: false,
            proList: [],  
            productId: '',
            imgShow:'../static/img/careSkin.png'
        };
        het.setTitle('护肤品测试');
        setDocumentTitle('护肤品测试');
        this.listenStore(Store); // 监听Store
    }
    componentDidMount(){
        
        Actions.getproductinfo();
    }
    componentDidUpdate(){
        //处理图片压缩变形
        // function handlePic($img){
        //     let width = $img.width();
        //     let height = $img.height();
        //     if(width>=height){
        //         $img.css({'height': '100%'}); 
        //     }
        //     if(height>width){
        //         $img.css({'width': '100%'});
        //     }
        // }
        // $('.scale-pic').each(function(i){
                
        //         $('.scale-pic').on('load',function(){
        //             handlePic($(this));
        //         })
                
        // })
    }
    componentWillUnmount() {
        // Actions.clearProTest();
    }
    selectTag(e){
        let part = e.currentTarget.getAttribute('data-part');
        if(part==='face'){
            this.setState({face: !this.state.face,eye: false,hand: false,part: 6})
        }else if(part==='eye'){
            this.setState({eye: !this.state.eye,face: false,hand: false,part: 2})
        }else if(part==='hand'){
            this.setState({hand: !this.state.hand,face: false,eye: false,part: 3})
        }
    }
    selectProduct(e){
        if(this.state.proList.length===0){
            return
        }
        ReactDOM.findDOMNode(this.refs.productName).blur();
        this.setState({productShow: true})
    }
    confirmProduct(e){
        e.preventDefault();
        e.stopPropagation();
        let productId = parseInt(e.currentTarget.getAttribute('data-productId'));
        let productName = e.currentTarget.getAttribute('data-productName');
        let img = e.currentTarget.getAttribute('data-img');
        let ipt = ReactDOM.findDOMNode(this.refs.productName);
        ipt.value = productName;
        this.setState({productShow: false,productId: productId,imgShow: img});
    }
    cancelPop(e){
        e.preventDefault();
        e.stopPropagation();
        this.setState({productShow: false});
    }
    selectImg(e){
        let _this = this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                let localId = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                _this.setState({imgShow: localId});
            }
        });
    }
    startTest(e){
        e.preventDefault();
        e.stopPropagation();
        let img = this.state.imgShow;
        if(img==='../static/img/careSkin.png'){
            showToast('请选择护肤品照片');
            return false
        }
        let productName = ReactDOM.findDOMNode(this.refs.productName).value;
        if(productName === ''){
            showToast('请选择护肤品名称');
            return false
        }
        if(!this.state.eye&&!this.state.hand&&!this.state.face){
            showToast('请选择测试部位');
            return false
        }
        let productId = this.state.productId;
        let flag1 = false; 
        let flag2 = false;
        let proList = this.state.proList;
        if(productId!==''){
            for(let i=0;i<proList.length;i++){
                if(proList[i].productName===productName&&proList[i].productId===productId){
                    flag1 = true;
                }
            }
            if(img.indexOf('http://')!==-1){
                flag2 = true;
            }
        }
        
        let part = this.state.part;
        
        Actions.uploadProcuctInfo(productName,img,part,productId,flag1,flag2);
    }
    render() {
        let item = null;
        let proList = this.state.proList;
        item = proList.map((item,index)=>{

            return (
                    <li className='flex' key={index} data-productId={item.productId} data-productName={item.productName} data-img={item.imgUrl} onTouchTap={this.confirmProduct.bind(this)}>
                        <div className='item-logo'>
                            <img src={item.imgUrl} className='scale-pic'/>
                        </div>
                        <img src='../static/img/gou.png' style={this.state.productId===item.productId?{display:''}:{display:'none'}}/>
                        <p>{item.productName}</p>
                    </li>
                )
        })
        return (
                <div  className='_frontCare'>
                    
                    <div className='skinCare-tip flex'>
                        <p>通过测试护肤品使用前后皮肤的水油弹含量，科学检测护肤品的功效。</p>
                    </div>

                    <div className='skinCare-photo flex'>
                        <div className='photo-con' onTouchTap={this.selectImg.bind(this)}>
                            <img src={this.state.imgShow} className='scale-pic'/>
                        </div>
                    </div>

                    <div className='skinCare-info flex'>
                        <div className='info-con'>
                            <div className='productName flex'>
                                <h2>产品名称</h2>
                                <input type='text' placeholder='输入护肤品名称' ref='productName'/>
                            </div>

                            <div className='testPart flex'>
                                <h2>测试部位</h2>
                                <div className='parts flex'>
                                    <span onTouchTap={this.selectTag.bind(this)} data-part='face' style={this.state.face?{background:'#949DA9',color: '#FCFCFC'}:{}}>脸部</span>
                                    <span onTouchTap={this.selectTag.bind(this)} data-part='eye' style={this.state.eye?{background:'#949DA9',color: '#FCFCFC'}:{}}>眼周</span>
                                    <span onTouchTap={this.selectTag.bind(this)} data-part='hand' style={this.state.hand?{background:'#949DA9',color: '#FCFCFC'}:{}}>手部</span>
                                </div>
                            </div>

                            <p className='skinProduct' onTouchTap={this.selectProduct.bind(this)} style={this.state.proList.length>0?{color: '#0F80FD'}:{color: '#e5e5e5'}}>选择测试过的护肤品></p>

                        </div>
                    </div>

                    <button onTouchTap={this.startTest.bind(this)}>护肤前测试</button>

                    <div className='skinProductSelect' style={{display: `${this.state.productShow?'':'none'}`}}>
                        <div className='product-shade' onTouchStart={this.cancelPop.bind(this)}></div>
                        <div className='product-item' style={{bottom:this.state.productShow? 0 :"-29rem"}}>
                            {item}
                        </div>
                    </div>

                    <div className='m-toast' id='toast' style={{display: 'none'}}></div>
                </div>
            )
    }
}