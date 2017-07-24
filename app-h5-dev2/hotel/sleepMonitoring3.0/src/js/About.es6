import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

export class About extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
         
        };
        this.listenStore(Store); // 监听Store
    }
    componentDidMount() {
        let body = document.getElementsByTagName('body');
        body[0].style.height='100%';
        let locationUrl = window.location.href;
        localStorage.setItem("locationUrl",locationUrl)
        Actions.login();
        let Div = $('.swiper-slide').find('div');
        let mySwiper = new Swiper('.swiper-container',{
            direction: 'vertical',
            onInit:function(swiper){
                animate(document.getElementById('lifeThree'),Div.eq(2),'life-pic-three')
                animate(document.getElementById('lifeFour'),Div.eq(3),'life-pic-four')
                animate(document.getElementById('lifeFive'),Div.eq(4),'life-pic-five')
                animate(document.getElementById('lifeSix'),Div.eq(5),'life-pic-six')
            },
            onSlideChangeStart: function(swiper){
                let ani = $(".swiper-slide").find('.ani');
                ani.attr('class','ani')
                ani.addClass('hid')
            },
            onSlideChangeEnd: function(swiper){
                if(swiper.activeIndex==0){
                    animate(document.getElementById('lifeThree'),Div.eq(2),'life-pic-three')
                    animate(document.getElementById('lifeFour'),Div.eq(3),'life-pic-four')
                    animate(document.getElementById('lifeFive'),Div.eq(4),'life-pic-five')
                    animate(document.getElementById('lifeSix'),Div.eq(5),'life-pic-six')
                }else if(swiper.activeIndex==1){
                    animate(document.getElementById('hotelOne'),Div.eq(12),'hotel-pic-one')
                    animate(document.getElementById('hotelTwo'),Div.eq(13),'hotel-pic-two')
                    animate(document.getElementById('hotelThree'),Div.eq(14),'hotel-pic-three')
                    animate(document.getElementById('hotelFour'),Div.eq(15),'hotel-pic-four')
                    animate(document.getElementById('hotelFive'),Div.eq(16),'hotel-pic-five')
                    animate(document.getElementById('hotelSix'),Div.eq(17),'hotel-pic-six')
                    animate(document.getElementById('hotelSeven'),Div.eq(18),'hotel-pic-seven')
                }else if(swiper.activeIndex==2){
                    animate(document.getElementById('sleepOne'),Div.eq(19),'hotel-pic-one')
                    animate(document.getElementById('sleepTwo'),Div.eq(20),'hotel-pic-two')
                    animate(document.getElementById('sleepThree'),Div.eq(21),'sleep-pic-three')
                    animate(document.getElementById('sleepFour'),Div.eq(22),'sleep-pic-four')
                    animate(document.getElementById('sleepFive'),Div.eq(23),'sleep-pic-five')
                    animate(document.getElementById('sleepSix'),Div.eq(24),'sleep-pic-six')
                }
            }
        })
        function animate(id,name,addName) {
            name.addClass(addName);
            id.addEventListener('webkitAnimationStart',()=>{
                name.removeClass('hid')
            })
        }
    }
    render() {
        return  <div className="swiper-container">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide c-life">
                            <div className="life-pic-one" >
                                <img src='../static/img/diq.png'></img>
                            </div>
                            <div className="life-pic-two">
                                <img src='../static/img/guiji.png'></img>
                            </div>
                            <div id="lifeThree" className="hid ani" >
                                <img src='../static/img/c-life.png'></img>
                            </div>
                            <div id="lifeFour" className="hid ani">
                                <img src='../static/img/life.png'></img>
                            </div> 
                            <div id='lifeFive' className='hid ani'>
                                <img src='../static/img/aboutLife.png' ></img>
                            </div> 
                            <div id='lifeSix' className="hid ani">
                                <img src='../static/img/aboutTitle.png'></img>
                            </div>
                            <div className="life-pic-seven">
                                <img src='../static/img/jiantou.png'></img>
                            </div> 
                            <div className="life-pic-eight">
                                <img src='../static/img/xingxing1.png'></img>
                            </div> 
                            <div className="life-pic-night">
                                <img src='../static/img/xing2.png'></img>
                            </div> 
                            <div className="life-pic-ten">
                                <img src='../static/img/xing3.png'></img>
                            </div> 
                            <div className="life-pic-eleven">
                                <img src='../static/img/xing4.png'></img>
                            </div>     
                        </div>
                        <div className="swiper-slide c-hotel">
                            <div className="life-pic-seven">
                                <img src='../static/img/jiantou.png'></img>
                            </div>
                            <div id="hotelOne" className="hid ani">
                                <img src='../static/img/hotel-kuang.png'></img>
                            </div>
                            <div id="hotelTwo" className="hid ani">
                                <img src='../static/img/hotel-title.png'></img>
                            </div> 
                            <div id="hotelThree" className="hid ani">
                                <img src='../static/img/kong.png'></img>
                            </div>
                            <div id="hotelFour" className="hid ani">
                                <img src='../static/img/shushi.png'></img>
                            </div>
                            <div id="hotelFive" className="hid ani">
                                <img src='../static/img/daizi.png'></img>
                            </div>
                            <div id="hotelSix" className="hid ani">
                                <img src='../static/img/deng.png'></img>
                            </div>
                            <div id="hotelSeven" className="hid ani">
                                <img src='../static/img/hezi.png'></img>
                            </div> 
                        </div>
                        <div className="swiper-slide c-sleep">
                            <div id="sleepOne" className="hid ani">
                                <img src='../static/img/sleepKuang.png'></img>
                            </div>
                            <div id="sleepTwo" className="hid ani">
                                <img src='../static/img/sleep-title.png'></img>
                            </div> 
                            <div id="sleepThree" className="hid ani">
                                <img src='../static/img/sleepBg.png'></img>
                            </div>
                            <div id="sleepFour" className="hid ani">
                                <img src='../static/img/sleep-hansheng.png'></img>
                            </div>
                            <div id="sleepFive" className="hid ani">
                                <img src='../static/img/heart.png'></img>
                            </div>
                            <div id="sleepSix" className="hid ani">
                                <img src='../static/img/breath.png'></img>
                            </div>
                        </div>
                    </div>
                </div>;              
    }
}