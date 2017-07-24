export class ColorSelectView extends React.Component{
    constructor(){
        super();
        // this.colors = ['#ff7b7c', '#ffffff', '#fcaa6b', '#fcda6f', '#a0e674', '#59bdef', 'tapRingEvent'];
        this.colors = ['rgb(255,123,124)', 'rgb(255,255,255)', 'rgb(252,170,107)', 'rgb(252,218,111)', 
        'rgb(160,230,116)', 'rgb(89,189,239)', 'tapRingEvent'];
        this.index = 0;
        this.state = {showColorRing:false};
    }
    changeColorHandle(index, e){
        this.props.changeColorHandle(this.colors[index]);
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
                    return <div style={{backgroundColor:value}} key={index} onTouchEnd={this.changeColorHandle.bind(this,index)} data-val={index}>
                            <img src={index==1?"../static/img/pic-11@2x.png":"../static/img/pic-08@2x.png"} alt="" style={{visibility:seekIndex===index?'visible':'hidden',with:index==1?'14px':'28px',height:index==1?'14px':'28px'}}/>
                            </div>;
                }
                return(
                    <div key={index} onTouchEnd={this.changeColorHandle.bind(this,index)} data-val={index}>
                        <img src="../static/img/ico3.png" alt="" style={{width:'28px',height:'28px'}}/>
                    </div>
                );
            })}
        </section>
    </div>);
    }
}
