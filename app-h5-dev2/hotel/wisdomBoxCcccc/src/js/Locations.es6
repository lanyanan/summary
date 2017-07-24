'use strict';
/**
 *定位页
 *
 */
//定位路由页面
import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';


var {Router, Route, hashHistory,Link} = ReactRouter;



 // 创建React    这个是Location  页面的  组件
export class Locations extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.listenStore(Store); // 监听Store

         let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
         this.state = {
            headerTop:isAndroid?73:64
        };   

        // Actions.place();
         Actions.gan();

    }
      //加载默认数据
      componentDidMount() {
        // Actions.getDefaultData();   
      }      


      positionClick(){
          Actions.place()
         
      }


    render() {

       let sss = this.state;
          console.log(sss);

        //交互       
         let citys = (this.state.citys ? this.state.citys:'');
         //经常选择的城市
         let citysList = [];
         //a-z的遍历
         let allCitys = [];
         let str;
         let arr = ['a','b','c','d','e','f','g','h','j','k','l','m','n','p','q','r','s','t','w','x','y','z'];
         let ff = [];
         let cityA=[], cityB=[],cityC=[],cityD=[],cityE=[],cityF=[],cityG=[],cityH=[],cityJ=[],cityK=[],cityL=[],cityM=[],cityN=[],cityP=[],cityQ=[],cityR=[],cityS=[],cityT=[],cityW=[],cityX=[],cityY=[],cityZ=[];
          if(citys){
            //经常选择的城市
            citysList = citys.hostCityList;
            console.log("######################",citys)
            // 所有城市
             // allCitys = citys;
             cityA = citys.a;
             cityB = citys.b;
             cityC = citys.c;
             cityD = citys.d;
             cityE = citys.e, cityF = citys.f, cityG = citys.g, cityH = citys.h, cityJ = citys.j, cityK = citys.k, cityL = citys.l, cityM = citys.m, cityN = citys.n , 
             cityP = citys.p, cityQ = citys.q, cityR = citys.r, cityS = citys.s, cityT = citys.t, cityW = citys.w, cityX = citys.x, cityY = citys.y, cityZ = citys.z;
    
            for(var i=0;i<arr.length;i++){
             var index = arr[i];
             // console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeee",index);
              // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',citys[index]);
              ff.push(citys[index]);           
            }
         }

        return (
            <div>
                <section className="locations-sec">
                
                    <div className="RightSide">
                      <ul>
                        <li><a href="#Jing">#</a></li>
                        <li><a href="#Xing">☆</a></li>
                        <li><a href="#AA">A</a></li>
                        <li><a href="#BB">B</a></li>
                        <li><a href="#CC">C</a></li>
                        <li><a href="#DD">D</a></li>
                        <li><a href="#EE">E</a></li>
                        <li><a href="#FF">F</a></li>
                        <li><a href="#GG">G</a></li>
                        <li><a href="#HH">H</a></li>
                        <li><a href="#JJ">J</a></li>
                        <li><a href="#KK">K</a></li>
                        <li><a href="#LL">L</a></li>
                        <li><a href="#MM">M</a></li>
                        <li><a href="#NN">N</a></li>
                        <li><a href="#PP">P</a></li>
                        <li><a href="#QQ">Q</a></li>
                        <li><a href="#RR">R</a></li>
                        <li><a href="#SS">S</a></li>
                        <li><a href="#TT">T</a></li>
                        <li><a href="#WW">W</a></li>
                        <li><a href="#XX">X</a></li>
                        <li><a href="#YY">Y</a></li>
                        <li><a href="#ZZ">Z</a></li>

                      </ul>
                    </div>

                    <div className="Locations-top">
                      <span>&lt;</span>
                      <span>选择城市</span>
                      <span>&gt;</span>
                  
                    </div>
                     <div className="allCitys-title">你当前的位置可能是</div>
                     <div className="Current-loc  allCitys-often-nvg">
                        <span  className="Current-loc-left"  > {this.state.positionCity}   </span>
                        <span  className="Current-loc-right"   onClick={this.positionClick}>定位</span>
                     </div>
                     <div className="AlsoSelect">
                        <p className="allCitys-title" >经常选择的城市</p>
                        <span>得到经常选择的城市，然后遍历出来</span> 
                         <ul>
                         {
                            //方法1
                            citysList.map(function(dd){
                              let ddd = dd.cityName;
                               return  <li className="allCitys-often-nvg">{ddd}</li>;
                            }.bind(this))
                            //方法2
                          //    citysList.map((i,k)=>{
                          //     let dd = i.cityName;
                          //     // console.log("dd",dd);
                          //      return  <li>{dd}</li>;
                          // })
                        }
                        </ul>   
                     </div>

                     <div className="allCitys">
                        <ul>
                         <li className="allCitys-nvg"  id ="Jing" ><p>A</p></li>
                        { 
                            
                            // ff.map((item,k)=>{
                            //   // console.log(item);
                            //     // return <li>{jj.cityName}</li>
                            //   item.map((jj,kk)=>{---->   ff[k].map --> ff[k] = item
                            //     console.log(jj.cityName);
                            //     var po = jj.cityName
                            //        return <li>{po}</li>
                            //   })
                            // })
                             cityA.map((i,k)=>{
                              // var  = i.cityName;    
                              // console.log(i);
                              return  <li><a> {i.cityName}</a> </li>;
                          })
                        }
                        </ul>
                        <ul>
                          <li className="allCitys-nvg"  id="BB" ><p>B</p></li>
                        {
                          cityB.map(function(b){
                            return <li> <a>{b.cityName}</a> </li>
                          })
                        }
                        </ul>
                        <ul>
                          <li className="allCitys-nvg" id="CC"><p>C</p></li>
                          {
                            cityC.map((v,i)=>{
                              return <li><a>{v.cityName} </a> </li>
                            })
                          }
                        </ul>
                        <ul>
                          <li className="allCitys-nvg" id="DD"><p>D</p></li>
                        {
                          cityD.map(function(d){
                            return <li> <a>{d.cityName}</a> </li>
                          })
                        }
                        </ul>
                        <ul>
                          <li className="allCitys-nvg" id="EE"><p>E</p></li>
                        {
                          cityE.map(function(e){
                            return <li> <a>{e.cityName}</a> </li>
                          })
                        }
                        </ul>
                        <ul>
                          <li className="allCitys-nvg" id="FF"><p>F</p></li>
                        {
                          cityF.map(function(f){
                            return <li> <a>{f.cityName}</a> </li>
                          })
                        }
                        </ul>
                        <ul>
                          <li className="allCitys-nvg" id="GG"><p>G</p></li>
                        {
                          cityG.map(function(g){
                            return <li> <a>{g.cityName}</a> </li>
                          })
                        }
                        </ul>
                        <ul>
                          <li className="allCitys-nvg" id="HH"><p>H</p></li>
                        {
                          cityH.map(function(h){
                            return <li> <a>{h.cityName}</a> </li>
                          })
                        }
                        </ul>
                        <ul>
                          <li className="allCitys-nvg" id="JJ"><p>J</p></li>
                        {
                          cityJ.map(function(j){
                            return <li> <a>{j.cityName}</a> </li>
                          })
                        }
                        </ul>
                        <ul>
                          <li className="allCitys-nvg" id="KK"><p>K</p></li>
                        {
                          cityK.map(function(k){
                            return <li> <a>{k.cityName}</a> </li>
                          })
                        }
                        </ul>
                        <ul>
                          <li className="allCitys-nvg" id="LL"><p>L</p></li>
                        {
                          cityL.map(function(l){
                            return <li> <a>{l.cityName}</a> </li>
                          })
                        }
                        </ul>
                        <ul>
                          <li className="allCitys-nvg" id="MM"><p>M</p></li>
                        {
                          cityM.map(function(m){
                            return <li> <a>{m.cityName}</a> </li>
                          })
                        }
                        </ul>
                        <ul>
                          <li className="allCitys-nvg" id="NN"><p>N</p></li>
                        {
                          cityN.map(function(n){
                            return <li> <a>{n.cityName}</a> </li>
                          })
                        }
                        </ul>
                        <ul>
                          <li className="allCitys-nvg" id="PP"><p>P</p></li>
                        {
                          cityP.map(function(p){
                            return <li> <a>{p.cityName}</a> </li>
                          })
                        }
                        </ul>    
                        <ul>
                          <li className="allCitys-nvg" id="QQ"><p>Q</p></li>
                        {
                          cityQ.map(function(q){
                            return <li> <a>{q.cityName}</a> </li>
                          })
                        }
                        </ul>  
                        <ul>
                          <li className="allCitys-nvg" id="RR"><p>R</p></li>
                        {
                          cityR.map(function(r){
                            return <li> <a>{r.cityName}</a> </li>
                          })
                        }
                        </ul>
                        <ul>
                          <li className="allCitys-nvg" id="SS"><p>S</p></li>
                        {
                          cityS.map(function(s){
                            return <li> <a>{s.cityName}</a> </li>
                          })
                        }
                        </ul>    
                        <ul>
                          <li className="allCitys-nvg" id="TT"><p>T</p></li>
                        {
                          cityT.map(function(t){
                            return <li> <a>{t.cityName}</a> </li>
                          })
                        }
                        </ul> 
                        <ul>
                          <li className="allCitys-nvg" id="WW"><p>W</p></li>
                        {
                          cityW.map(function(w){
                            return <li> <a>{w.cityName}</a> </li>
                          })
                        }
                        </ul>
                        <ul>
                          <li className="allCitys-nvg" id="SS"><p>S</p></li>
                        {
                          cityS.map(function(s){
                            return <li> <a>{s.cityName}</a> </li>
                          })
                        }
                        </ul>    
                        <ul>
                          <li className="allCitys-nvg" id="YY"><p>Y</p></li>
                        {
                          cityY.map(function(y){
                            return <li> <a>{y.cityName}</a> </li>
                          })
                        }
                        </ul>  
                        <ul>
                          <li className="allCitys-nvg"   id="ZZ"><p>Z</p></li>
                        {
                          cityZ.map(function(z){
                            return <li> <a>{z.cityName}</a> </li>
                          })
                        }
                        </ul>                                                                                
                     </div>
                </section>
            </div>
        );
    }

        componentWillUpdate() {
            // console.log("componentDidMount的值",this.state);
        }



}

// // 开始渲染
het.domReady(()=>{
    het.setTitle('智慧盒子');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    // ReactDOM.render((
    //     <Router history={hashHistory}>
    //         // <Route path="/" component={Appcity} />

    //     </Router>
    // ), document.getElementById('ROOT'));
});