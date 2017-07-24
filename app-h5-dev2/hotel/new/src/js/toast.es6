/*
 	toast 提示组件
 	参数：
 	show： Boolean类型 true为显示false为隐藏；
 	tips： string类型 toast的提示文本；
*/
export class Toast extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return <div id="toast"  style={{width:"100%",height:"5rem",position:"fixed",left:"0",bottom:"0",display:this.props.show?"block":"none",textAlign:"center"}}>
                    <span style={{padding:"0.8rem 1.5rem",background:"#000",color:"#fff",borderRadius:"3px",fontSize:"14px"}}>
                      {this.props.tips}
                    </span> 
               </div>;
    }
}