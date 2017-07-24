import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory} = ReactRouter;

/**
 * 部位id--name
 * @param    {String}      部位id
 */
 function proPart(partId){
    let val = '';
    switch(partId){
        case 6:
            val = '脸部';break;
        case 2:
            val = '眼周';break;
        case 3:
            val = '手部';break;
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
// /:part/:beforeWater/:beforeOil/:beforeElasticity/:afterWater/:afterOil/:afterElasticity
export class ProResult extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            status:5
        };
        het.setTitle('护肤品测试');
        setDocumentTitle('护肤品测试');
        // let oid = 'oTjGfwC7f5RQpBr3fcUzATglMFnY';
        let oid = this.GetQueryString('openid');
        let lastInsertId = parseInt(this.GetQueryString('lastInsertId'));
        let lastPartMeasureId = parseInt(this.GetQueryString('lastPartMeasureId'));
        Actions.getContrastData(oid,lastInsertId,lastPartMeasureId);
        this.listenStore(Store); // 监听Store
    }
    componentWillUnmount(){
        Actions.hideShareMenu();
    }
    GetQueryString(name){
         let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         let hash = window.location.hash;
         let r = hash.substr(hash.indexOf('?')+1).match(reg);
         if(r!=null) return decodeURI(r[2]);
         return null;
    }
    render() {
        console.log('最终数据:',JSON.stringify(this.state));
        let part = this.state.part || 6;
        let skinTypeName = this.state.skinTypeName || '';
        let status = this.state.status || '';
        let beforeWater = this.state.beforeWater || '';
        let beforeOil = this.state.beforeOil || '';
        let beforeElasticity = this.state.beforeElasticity || '';
        let afterWater = this.state.afterWater || '';
        let afterOil = this.state.afterOil || '';
        let afterElasticity = this.state.afterElasticity || '';
        return (
            <div>
                <section className="qr-top">
                    <div className="qr-wrap">
                        <img src={this.state.imgUrl} />
                        <span>{this.state.productName}</span>
                    </div>
                </section>
                {/*测试结果*/}
                <section className="pro-measure-result" data-status={5}>
                    <section className="r-top">
                        <h3>{'护肤后'+proPart(part)+'的肤质为'}</h3>
                        <h2>{this.state.skinTypeName}</h2>
                    </section>
                    <section className="r-middle">
                        <figure className="woe-data">
                            <h5 className="item water-item">水份</h5>
                            <div className="contrast">
                                <span>护肤前<i>{beforeWater+'%'}</i></span><span>护肤后<i>{afterWater+'%'}</i></span><em className={(afterWater-beforeWater)>=0?'up':'down'}>{(Math.abs(afterWater-beforeWater)).toFixed(1)+'%'}</em>
                            </div>
                            <p className="flex desc">
                                <span className="w40 tac">缺水</span>
                                <span className="w20 tac">正常</span>
                                <span className="w40 tac">湿润</span>
                            </p>
                            <p className="flex colorful water-color">
                                <i className="w40"></i><i className="w20"></i><i className="w40"></i>
                                <b className="before" style={{left:(beforeWater+'%')}}></b>
                                <b className="after" style={{left:(afterWater+'%')}}></b>
                            </p>
                            <p className="flex desc">
                                <span className="flex-cell tal">00</span>
                                <span className="flex-cell tac" style={{textIndent:'1.4rem'}}>40%</span>
                                <span className="flex-cell tac" style={{textIndent:'-0.8rem'}}>60%</span>
                                <span className="flex-cell tar">99%</span>
                            </p>
                        </figure>
                        <figure className="woe-data">
                            <h5 className="item oil-item">油份</h5>
                            <div className="contrast">
                                <span>护肤前<i>{beforeOil+'%'}</i></span><span>护肤后<i>{afterOil+'%'}</i></span><em className={(afterOil-beforeOil)>=0?'up':'down'}>{(Math.abs(afterOil-beforeOil)).toFixed(1)+'%'}</em>
                            </div>
                            <p className="flex desc">
                                <span className="w15 tac">缺油</span>
                                <span className="w10 tac">正常</span>
                                <span className="w75 tac">偏油</span>
                            </p>
                            <p className="flex colorful oil-color">
                                <i className="w15"></i><i className="w10"></i><i className="w75"></i>
                                <b className="before" style={{left:(beforeOil+'%')}}></b>
                                <b className="after" style={{left:(afterOil+'%')}}></b>
                            </p>
                            <p className="flex desc">
                                <span className="flex-cell tal">00</span>
                                <span className="flex-cell tal" style={{textIndent:'-0.8rem'}}>15%</span>
                                <span className="flex-cell tac" style={{textIndent:'-4.9rem'}}>25%</span>
                                <span className="flex-cell tal"></span>
                                <span className="flex-cell tal"></span>
                                <span className="flex-cell tal"></span>
                                <span className="flex-cell tar">99%</span>
                            </p>
                        </figure>
                        <figure className="woe-data">
                            <h5 className="item tx-item">弹性</h5>
                            <div className="contrast">
                                <span>护肤前<i>{beforeElasticity}</i></span><span>护肤后<i>{afterElasticity}</i></span><em className={(afterElasticity-beforeElasticity)>=0?'up':'down'}>{(Math.abs(afterElasticity-beforeElasticity)).toFixed(1)}</em>
                            </div>
                            <p className="flex desc">
                                <span className="w37 tac">易皱纹</span>
                                <span className="w00 tac"></span>
                                <span className="w63 tac" style={{textIndent:'-1rem'}}>紧致</span>
                            </p>
                            <p className="flex colorful tx-color">
                                <i className="w37"></i><i className="w00"></i><i className="w63"></i>
                                <b className="before" style={{left:(beforeElasticity*10+'%')}}></b>
                                <b className="after" style={{left:(afterElasticity*10+'%')}}></b>
                            </p>
                            <p className="flex desc">
                                <span className="flex-cell tal">00</span>
                                <span className="flex-cell tac" style={{textIndent:'-0.1rem'}}>3.7</span>
                                <span className="flex-cell tac"></span>
                                <span className="flex-cell tar">9.9</span>
                            </p>
                        </figure>
                        <div className="area">
                            <span>护肤前</span>
                            <span>护肤后</span>
                        </div>
                    </section>
                </section>
            </div>
        )
    }
}
