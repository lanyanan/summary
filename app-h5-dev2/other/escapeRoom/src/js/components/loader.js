import {globActions} from '../actions/actions';

/* 图片加载，数组里可以是字符串，数组，对象。
		对象字段
		path: images目录后的路径	default: ''
		prefix	名称前缀			default: ''
		names 	名称				defalut: undefined
		suffix	后缀				default:'.png'
	*/
var resource = [['equip-bar.png','cover/blink.gif','cover/qr-code.jpg'],
    {
        prefix:'H5-',
        names:[1,3,4,5,6,'text'],
    },{
    	path:'bigImg',
    	names:['codedLock','mural1','paper-open','paper-small']
    },{
    	path:'bigImg',
    	prefix:'phone-',
    	names:[1,2,3,4,5,6,7,8,9,10,'10-1',11,'11-1','11-2',12,13,14]
    },{
        path:'cover',
        names:['bg',12,13,14,15,'15-lock',16]
    },{
        path:'scene',
        names:[1,2,3,4,5]
    },{
    	path:'icon',
    	prefix:'aromathMachine',
    	names:['',3,4,'-green','-yellow','-variation']
    },{
    	path:'icon',
    	prefix:'lampholder',
    	names:['',3,4,'-blue','-pink','-variation']
    },{
    	path:'icon',
    	prefix:'wisdomBox',
    	names:['',3,5,'-variation']
    },{
    	path:'icon',
    	prefix:'fleabag',
    	names:['',3,4,'-variation','-xu','-shi']
    },{
    	path:'icon',
    	names:['bulb','bulb2','esseOil','esseOil3','esseOil4','water','water3','water5','phone','phone2']
    },{
    	path:'icon',
    	names:['box-closed','box-opened','comb_icon','curr-equip-border','flamp-close','flamp-open','hook','icon-left','icon-right','down-arrow']
    },{
    	path:'icon',
    	names:['paperA','paperB','fog']
    },{
    	path:'rank',
    	names:['01','02','03','04','05','06','07','08']
    }];

var audioResource = [{name:'snore',path:'snore.mp3'},		// 鼾声
					{name:'gold',path:'gold.mp3'},			// 金币声
					{name:'touch',path:'touch.mp3'},		// 开关按钮1
					{name:'closedoor',path:'closedoor.mp3'},		// 开关按钮2
					{name:'iphone',path:'iphone.mp3'},		// 电话铃声
					{name:'cheer',path:'cheer.wav'},		// 欢呼声
					{name:'speak',path:'speak.mp3'},		// 接电话说话声
					{name:'keypress',path:'keypress.mp3'},	// 按钮声
					{name:'switch',path:'switch.wav'},		// 开关按钮1
					{name:'bgm',path:'bgm.mp3'}
					];			// 背景声
var audio1 = [{name:'snore',path:'snore.mp3'},{name:'gold',path:'gold.mp3'},{name:'touch',path:'touch.mp3'},
				{name:'speak',path:'speak.mp3'},{name:'keypress',path:'keypress.mp3'},{name:'switch',path:'switch.wav'}]

window.audios = [];

function getResources(){
	var arr = [];
	resource.forEach((item)=>{
		if(typeof item === 'string'){
			arr.push(item);
		}else if(Object.prototype.toString.call(item) === '[object Array]'){
			arr = arr.concat(item);
		}else{
			var path = item.path ? (item.path + '/') : '',
				prefix = item.prefix || '',
				suffix = item.suffix ? item.suffix : '.png';

			item.names && item.names.forEach((name)=>{
				arr.push( path + prefix + name + suffix);
			})
		}
	})

	return arr;
}


export default class Loader extends React.Component{
		constructor(props){
			super(props);

			this.imgArr = getResources();
			this.audioArr = audioResource;
		}
		componentWillMount(){
			this.index = 0;
			this.progress = 0;
			this.state = {steps:1}
		}

		componentDidMount(){
			setTimeout(()=>{
				this.preload();
			},1000);
			
		}

		render(){
			var style={
				width:this.progress*14 + 'rem'
			}

			this.resArr = getResources();

			return (
				<div className="hei100" >
					<div className={'table progress_page '}>
						<div className='table-cell'>
							<div className='progress flex'>
								<div className='progress_img flex-column'>
									<div className='progress_total'>
										<span className='progress_loaded' style={style}></span>
										<span className='fireworks'><img src='../static/images/cover/fireworks.gif'/></span>
									</div>
								</div>
								<div className='flex-column progress_right'>
									<p className='progress_num'><span>{(this.progress*100).toFixed(0)}</span>%</p>
									<p>正在进入深度睡眠状态</p>
								</div>
							</div>
							
						</div>
					</div>
				</div>
			)
		}

		preload(){

			this.loadImgs(this.imgArr);

			this.loadAudio(this.audioArr);
		}

		loadImgs(arr,flag){
			var t = this;

			var num = arr.length/50;

			for(var i = 0; i < num; i++){
				!(function(i){
					setTimeout(function(){
						for(var j = 0; j < 50; j++){
							var src = arr[i*50+j];
							if(!src) break;
							var img = new Image;
							img.onload = function(){
								if(!flag) t.processing();
							};

							img.onerror = function(){
								if(!flag) t.processing();
							}

							img.src ='../static/images/' + src;
						}
					}, 2000*i)
				}(i))
				
			}

			if(!flag) this.setState({steps: this.state.steps + 1});
		}

		loadAudio(arr){
			var t = this, j = 0;

			arr && arr.forEach((item, i)=>{
				var audio = new Audio('../static/audio/' + item.path);

				audio.onloadedmetadata = ()=>{
					t.processing();
					// 全部音频加载完成
					if(++j === arr.length){
						//t.fixAudioIOSbug(arr);
					}
				};
			
				window.audios[item.name] = audio;
			})
		}

		processing(){
			var resLen = this.imgArr.length + this.audioArr.length;

			// 处理进度条加载
			this.index++;

			this.progress = (this.index / resLen).toFixed(2);
			this.setState({steps: this.state.steps});

			// 加载完成后实例化动漫和游戏界面，1s后跳转到动漫界面
			if(parseInt(this.index / resLen) == 1){
				this.fixAudioIOSbug(audio1);
				globActions.loaded();
				setTimeout(()=>{
					globActions.nextStep();
				},2000)
			}
		}

		// ios在第一次play(需要播放一定时间)时会影响正在播放的音频（卡顿）
		// 解决方案：加载后静音状态下播放3秒
		fixAudioIOSbug(arr){
			var j = 0, len = arr.length;
			arr.forEach((item, i)=>{
				var audio = window.audios[item.name];
				if(!audio) return;
				audio.play();
				audio.muted = true;
				setTimeout(()=>{
					audio.pause();
					audio.muted = false;
				},1000)
			})
			
		}
	}

