import React from 'react'

export class DataInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let styleMode = this.props.styleMode !== undefined
            ? this.props.styleMode : 0;    //样式判断 0:首页 1：统计页面 2：水质检测页面

        let tocVal = this.props.myData.toc ? this.props.myData.toc : '0',      //toc
            codVal = this.props.myData.cod ? this.props.myData.cod : '0',      //cod
            chromaVal = this.props.myData.chroma ? this.props.myData.chroma : '0',     //色度
            turbidityVal = this.props.myData.turbidity ? this.props.myData.turbidity : '0',    //浊度
            tdsVal = this.props.myData.tds ? this.props.myData.tds : '0',     //tds
            tempVal = this.props.myData.temperature ? this.props.myData.temperature : '0';     //温度

        return <div>
            <div className={(styleMode == 0) ? "tableCell flex" : (styleMode == 1) ?
                "tableCell flex tableCell-statistics" : "tableCell flex tableCell-detection"}>
                <dl className="flex-cell">
                    <dd><span>{tdsVal}</span>mg/L</dd>
                    <dt>TDS</dt>
                </dl>
                <dl className="flex-cell centerCell">
                    <dd><span>{tocVal}</span>mg/L</dd>
                    <dt>TOC</dt>
                </dl>
                <dl className="flex-cell">
                    <dd><span>{codVal}</span>mg/L</dd>
                    <dt>COD</dt>
                </dl>
            </div>
            <div className={(styleMode == 0) ? "tableCell flex" : (styleMode == 1) ?
                "tableCell flex tableCell-statistics" : "tableCell flex tableCell-detection"}>
                <dl className="flex-cell">
                    <dd><span>{chromaVal}</span></dd>
                    <dt>色度</dt>
                </dl>
                <dl className="flex-cell centerCell">
                    <dd><span>{turbidityVal}</span>NTU</dd>
                    <dt>浊度</dt>
                </dl>
                <dl className="flex-cell">
                    <dd><span>{tempVal}</span>°C</dd>
                    <dt>温度</dt>
                </dl>
            </div>
        </div>;
    }
}