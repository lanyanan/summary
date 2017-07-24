'use strict';
/**
 * 统计页面
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {StatisticsList} from './StatisticsList.jsx';

const pageSize = 10;

export class Statistics extends BaseComponent {

    constructor(props) {
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
        this.state = {
            headerTop: isAndroid ? 73 : 64,
            showDialog: false,
            activeIndex: -1,
            dataList: null,
            dataIndex: 1,
            message: null,
        };
        this.unBindDataStore = Store.listen(this.onGetResult.bind(this));// 监听Store
        het.setTitle(JSON.stringify({setNavTitle: 1, title: '统计', setNavRightBtnHiden: 1}));
    }

    componentDidMount() {
        this.getHisData('refresh');
    }

    componentWillUnmount() {
        this.unBindDataStore();
    }

    onGetResult(data) {
        if (data.index == 1) {
            this.setState({dataList: data.list});
        } else if (this.state.dataList) {
            if (data.list.length <= 0) {
                this.showToast('没有数据了');
            }
            this.setState({dataList: this.state.dataList.concat(data.list)});
        }
    }

    getHisData(state) {
        if (state == 'refresh') {
            this.state.dataIndex = 1;
            this.setState({dataList: null});
        } else {
            this.state.dataIndex++;
        }
        Actions.getHisData(this.state.dataIndex, pageSize);
    }

    showToast(text) {
        let self = this;
        this.setState({message: text});
        setTimeout(function () {
            self.setState({message: null});
        }, 2000);
    }

    render() {
        let myDataList = this.state.dataList || [];
        console.log("---myDataList---------" + JSON.stringify(myDataList));
        return (<div className="statistics-full">
            <div style={{height: this.state.headerTop + 'px', width: '100%', backgroundColor: '#4BA2FF'}}></div>
            <div className="statistics-tab" >
                {myDataList.length > 0 ? <StatisticsList datas={myDataList} dataMethod={this.getHisData.bind(this)}/> : <div></div>}
            </div>
            <div style={{display: this.state.message == null ? 'none' : 'block'}}>
                <div className="statistics-cover-layout"></div>
                <div className="statistics-message">{this.state.message}</div>
            </div>
        </div>);
    }
}