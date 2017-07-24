import { BaseComponent } from '../../../common/src/BaseComponent.class.es6';
let {hashHistory} = ReactRouter

class Card extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.option = props.option;
        this.state.titleHeight=18;
        this.state.mutLine=2;
    }
    componentDidMount(){
        var title=this.refs.titleText;
        this.formatTitle(title);
    }
    formatTitle(title){
        if(title.offsetHeight>this.state.titleHeight*this.state.mutLine){
            title.isFormat=true;
            title.innerText=title.innerText.substr(0,title.innerText.length-1);
            this.formatTitle(title);
        }
        else if(title.isFormat) {
            title.innerText=title.innerText.substr(0,title.innerText.length-1)+'...';
            title.isFormat=false;
            return;
        };
    }
    handleLoad(e){
        this.refs.thisItem.style.opacity='1';
        this.props.onImgCompalte();
    }
    handleClick(e){
        e.preventDefault();
        e.stopPropagation();
        let newsId=this.state.option.newsId;
        hashHistory.push('/detail/'+newsId);
    }
    render() {
        let option = this.state.option;
        let badgeViews = [];
        let len = (option.badges.length >= 5) ? 2 : option.badges.length;
        for (let i = 0; i < len; i++) {
            badgeViews.push(<span key={i} className="badge">{option.badges[i]}</span>);
        }        
        return <div className="item" ref="thisItem" onTouchTap={this.handleClick.bind(this)}>
            <div className="photo" >
                <img src={option.imgUrl} onLoad={this.handleLoad.bind(this)}/>
            </div>
            <div className="title" style={{lineHeight:this.state.titleHeight+'px'}}>
                <p ref="titleText">{option.title}</p>
            </div>
            {badgeViews.length<=0?null:(<div className="badge-view">{badgeViews}</div>)}
        </div>
    }
}

export {Card};