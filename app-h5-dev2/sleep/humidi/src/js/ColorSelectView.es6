export class ColorSelectView extends React.Component{
    constructor(){
        super();
        this.colors = ['#ff7b7c', '#ffffff', '#fcaa6b', '#fcda6f', '#a0e674', '#59bdef', 'tapRingEvent'];
        this.index = 0;
        this.state = {showColorRing:false};
    }
    changeColorHandle(e){
        let index = e.currentTarget.getAttribute('data-val');
        index = parseInt(index);
        if(index == this.index) return;
            if(typeof this.props.changeColorHandle === 'function'){
                this.props.changeColorHandle(this.colors[index]);
            }
    }

    render(){
        // debugger;
        let seekIndex = 0;
        for (let i = 0; i < 6; i++){
            if(this.props.currentColor === this.colors[i]){
                seekIndex = i;
                break;
            }
        }
        if(seekIndex == 0){
            this.colors[0] = this.props.currentColor;
        }

        this.index = seekIndex;

        return(
        <div>
        <section className="colorSelectView">
            {this.colors.map((value,index)=>{
                if(index < 6){
                    return <div style={{backgroundColor:value}} key={index} onTouchEnd={this.changeColorHandle.bind(this)} data-val={index}>
                            <img src={index==1?"../static/img/pic-11@2x.png":"../static/img/pic-08@2x.png"} alt="" style={{visibility:seekIndex===index?'visible':'hidden',with:index==1?'14px':'28px',height:index==1?'14px':'28px'}}/>
                            </div>;
                }
                return(
                    <div key={index} onTouchEnd={this.changeColorHandle.bind(this)} data-val={index}>
                        <img src="../static/img/ico3.png" alt="" style={{width:'28px',height:'28px'}}/>
                    </div>
                );
            })}
        </section>
    </div>);
    }
}
