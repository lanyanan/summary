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

import {appMain} from './appMain.es6';


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

          Actions.locations();

          Actions.newCity();
          
          this.positionClick = this.positionClick.bind(this);
          this.locationClick = this.locationClick.bind(this);
    }
      //加载默认数据
      componentDidMount() {
        // Actions.getDefaultData();  
        // document.title = '选择城市';
        

        //修改标题
        var $body = $('body');
        document.title = '选择城市';
        // hack在微信等webview中无法修改document.title的情况
        var $iframe = $('<iframe src="/favicon.ico"></iframe>');
        $iframe.on('load',function() {
            setTimeout(function() {
                $iframe.off('load').remove();
            }, 0);
        }).appendTo($body);
 
        
      }      



      locationClick(){
          Actions.place();
          setTimeout('window.history.back()',1500);
          clearTimeout();  
      }

      positionClick(e){
          e.stopPropagation();
          e.preventDefault();
          let dataCity = e.currentTarget.getAttribute('data-city');
          let dataCode = e.currentTarget.getAttribute('data-code');
     

          Actions.otherCity(dataCity,dataCode);
          // window.history.back();
           setTimeout('window.history.back()',1500);
      }

    render() {
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
            // console.log("######################",citys)；
            // 所有城市
             cityA = citys.a;
             cityB = citys.b;
             cityC = citys.c;
             cityD = citys.d;
             cityE = citys.e, cityF = citys.f, cityG = citys.g, cityH = citys.h, cityJ = citys.j, cityK = citys.k, cityL = citys.l, cityM = citys.m, cityN = citys.n , 
             cityP = citys.p, cityQ = citys.q, cityR = citys.r, cityS = citys.s, cityT = citys.t, cityW = citys.w, cityX = citys.x, cityY = citys.y, cityZ = citys.z;
    
            for(var i=0;i<arr.length;i++){
             var index = arr[i];
              ff.push(citys[index]);           
            }
         }
         //若还未点击定位，则给空
         this.state.positionCity=this.state.positionCity?this.state.positionCity:'';

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
                        <li><a href="#HH">I</a></li>
                        <li><a href="#JJ">J</a></li>
                        <li><a href="#KK">K</a></li>
                        <li><a href="#LL">L</a></li>
                        <li><a href="#MM">M</a></li>
                        <li><a href="#NN">N</a></li>
                        <li><a href="#NN">O</a></li>
                        <li><a href="#PP">P</a></li>
                        <li><a href="#QQ">Q</a></li>
                        <li><a href="#RR">R</a></li>
                        <li><a href="#SS">S</a></li>
                        <li><a href="#TT">T</a></li>
                        <li><a href="#TT">U</a></li>
                        <li><a href="#TT">V</a></li>
                        <li><a href="#WW">W</a></li>
                        <li><a href="#XX">X</a></li>
                        <li><a href="#YY">Y</a></li>
                        <li><a href="#ZZ">Z</a></li>

                      </ul>
                    </div>

                    <div className="Locations-top">
              
                  
                    </div>
                     <div className="allCitys-title">你当前的位置可能是</div>
                     <div className="Current-loc  allCitys-often-nvg">
                        <span  className="Current-loc-left"  > {this.state.positionCity}   </span>
                        <span  className="Current-loc-right"   onClick={this.locationClick}>定位</span>
                     </div>
                     <div className="AlsoSelect">
                        <p className="allCitys-title" >经常选择的城市</p>
                       
                         <ul>
                         {
                            citysList.map((i,k)=>{
                              let dd = i.cityName;
                              // console.log(i);
                              return  <li className="allCitys-often-nvg" onClick={this.positionClick}  data-city={dd} key={k}  data-code={i.code}  >{dd}</li> ;
                          })

                        }
                        </ul>   
                     </div>

                     <div className="allCitys">
                        <ul>
                         <li className="allCitys-nvg"  id ="Jing" ><p>A</p></li>
                        { 
                             cityA.map((i,k)=>{
                              return  <li className="allCitys-often-nvg" onClick={this.positionClick}   data-city={i.cityName}  key={k} data-code={i.code}    > {i.cityName}   </li>;
                          })
                        }
                        </ul>
                        <ul>
                          <li className="allCitys-nvg"  id="BB"   ><p>B</p></li>
                        {
                            cityB.map((i,k)=>{
                            return   <li className="allCitys-often-nvg"  onClick={this.positionClick}   data-city={i.cityName}  key={k} data-code={i.code}  > {i.cityName}   </li>;
                          })
                        }
                        </ul>
                        <ul>
                          <li className="allCitys-nvg" id="CC"   ><p>C</p></li>
                          {
                            cityC.map((i,k)=>{
                            return   <li className="allCitys-often-nvg"  onClick={this.positionClick}   data-city={i.cityName}  key={k} data-code={i.code}  > {i.cityName}   </li>;
                            })
                          }
                        </ul>
                        <ul>
                          <li className="allCitys-nvg" id="DD"   ><p>D</p></li>
                        {
                          cityD.map((i,k)=>{
                           return   <li className="allCitys-often-nvg"  onClick={this.positionClick}   data-city={i.cityName}  key={k} data-code={i.code}  > {i.cityName}   </li>;
                          })
                        }
                        </ul>
                        <ul>
                          <li className="allCitys-nvg" id="EE" ><p>E</p></li>
                        {
                          cityE.map((i,k)=>{
                            return   <li className="allCitys-often-nvg"  onClick={this.positionClick}   data-city={i.cityName}  key={k} data-code={i.code}  > {i.cityName}   </li>;
                          })
                        }
                        </ul>
                        <ul>
                          <li className="allCitys-nvg" id="FF" >  <p>F</p></li>
                        {
                          cityF.map((i,k)=>{
                           return   <li className="allCitys-often-nvg"  onClick={this.positionClick}   data-city={i.cityName}  key={k} data-code={i.code}  > {i.cityName}   </li>;
                          })
                        }
                        </ul>
                        <ul>
                          <li className="allCitys-nvg" id="GG" ><p>G</p></li>
                        {
                          cityG.map((i,k)=>{
                             return   <li className="allCitys-often-nvg"  onClick={this.positionClick}   data-city={i.cityName}  key={k} data-code={i.code}  > {i.cityName}   </li>;
                          })
                        }
                        </ul>
                        <ul>
                          <li className="allCitys-nvg" id="HH"><p>H</p></li>
                        {
                          cityH.map((i,k)=>{
                             return   <li className="allCitys-often-nvg"  onClick={this.positionClick}   data-city={i.cityName}  key={k} data-code={i.code}  > {i.cityName}   </li>;
                          })
                        }
                        </ul>
                        <ul>
                          <li className="allCitys-nvg" id="JJ"  ><p>J</p></li>
                        {
                          cityJ.map((i,k)=>{
                            return   <li className="allCitys-often-nvg"  onClick={this.positionClick}   data-city={i.cityName}  key={k} data-code={i.code}  > {i.cityName}   </li>;
                          })
                        }
                        </ul>
                        <ul>
                          <li className="allCitys-nvg" id="KK" ><p>K</p></li>
                        {
                          cityK.map((i,k)=>{
                             return   <li className="allCitys-often-nvg"  onClick={this.positionClick}   data-city={i.cityName}  key={k} data-code={i.code}  > {i.cityName}   </li>;
                          })
                        }
                        </ul>
                        <ul>
                          <li className="allCitys-nvg" id="LL" ><p>L</p></li>
                        {
                          cityL.map((i,k)=>{
                            return   <li className="allCitys-often-nvg"  onClick={this.positionClick}   data-city={i.cityName}  key={k} data-code={i.code}  > {i.cityName}   </li>;
                          })
                        }
                        </ul>
                        <ul>
                          <li className="allCitys-nvg" id="MM" ><p>M</p></li>
                        {
                          cityM.map((i,k)=>{
                            return   <li className="allCitys-often-nvg"  onClick={this.positionClick}   data-city={i.cityName}  key={k}  data-code={i.code} > {i.cityName}   </li>;
                          })
                        }
                        </ul>
                        <ul>
                          <li className="allCitys-nvg" id="NN" ><p>N</p></li>
                        {
                          cityN.map((i,k)=>{
                           return  <li className="allCitys-often-nvg"  onClick={this.positionClick}    data-city={i.cityName}  key={k} data-code={i.code}  > {i.cityName}   </li>;
                          })
                        }
                        </ul>
                        <ul>
                          <li className="allCitys-nvg" id="PP" ><p>P</p></li>
                        {
                          cityP.map((i,k)=>{
                            return  <li className="allCitys-often-nvg"  onClick={this.positionClick}   data-city={i.cityName}  key={k} data-code={i.code}  > {i.cityName}   </li>;
                          })
                        }
                        </ul>    
                        <ul>
                          <li className="allCitys-nvg" id="QQ" ><p>Q</p></li>
                        {
                          cityQ.map((i,k)=>{
                             return  <li className="allCitys-often-nvg"  onClick={this.positionClick}   data-city={i.cityName}  key={k} data-code={i.code}  > {i.cityName}   </li>;
                          })
                        }
                        </ul>  
                        <ul>
                          <li className="allCitys-nvg" id="RR"><p>R</p></li>
                        {
                          cityR.map((i,k)=>{
                             return  <li className="allCitys-often-nvg"  onClick={this.positionClick}   data-city={i.cityName}  key={k} data-code={i.code}  > {i.cityName}   </li>;
                          })
                        }
                        </ul>
                        <ul>
                          <li className="allCitys-nvg" id="SS" ><p>S</p></li>
                        {
                          cityS.map((i,k)=>{
                           return   <li className="allCitys-often-nvg"   onClick={this.positionClick}   data-city={i.cityName}  key={k} data-code={i.code}  > {i.cityName}   </li>;
                          })
                        }
                        </ul>    
                        <ul>
                          <li className="allCitys-nvg" id="TT" ><p>T</p></li>
                        {
                          cityT.map((i,k)=>{
                            return   <li className="allCitys-often-nvg"  onClick={this.positionClick}   data-city={i.cityName}  key={k} data-code={i.code}  > {i.cityName}   </li>;
                          })
                        }
                        </ul> 
                        <ul>
                          <li className="allCitys-nvg" id="WW" ><p>W</p></li>
                        {
                          cityW.map((i,k)=>{
                            return   <li className="allCitys-often-nvg"  onClick={this.positionClick}   data-city={i.cityName}  key={k}  data-code={i.code} > {i.cityName}   </li>;
                          })
                        }
                        </ul>
                        <ul>
                          <li className="allCitys-nvg" id="SS" ><p>S</p></li>
                        {
                          cityS.map((i,k)=>{
                           return   <li className="allCitys-often-nvg"  onClick={this.positionClick}   data-city={i.cityName}  key={k} data-code={i.code}  > {i.cityName}   </li>;
                          })
                        }
                        </ul>    
                        <ul>
                          <li className="allCitys-nvg" id="YY" ><p>Y</p></li>
                        {
                          cityY.map((i,k)=>{
                            return   <li className="allCitys-often-nvg"  onClick={this.positionClick}   data-city={i.cityName}  key={k} data-code={i.code}  > {i.cityName}   </li>;
                          })
                        }
                        </ul>  
                        <ul>
                          <li className="allCitys-nvg"   id="ZZ"><p>Z</p></li>
                        {
                          cityZ.map((i,k)=>{
                            return   <li className="allCitys-often-nvg"  onClick={this.positionClick}   data-city={i.cityName}  key={k} data-code={i.code}  > {i.cityName}   </li>;
                          })
                        }
                        </ul>                                                                                
                     </div>
                </section>
            </div>
        );
    }




}

// // 开始渲染
het.domReady(()=>{
    // het.setTitle('选择城市');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    // ReactDOM.render((
    //     <Router history={hashHistory}>
    //         <Route path="/" component={appMain} />

    //     </Router>
    // ), document.getElementById('ROOT'));
});