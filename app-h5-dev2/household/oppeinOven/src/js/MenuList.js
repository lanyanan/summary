'use strict';

import { BaseComponent } from '../../../common/src/BaseComponent.class.es6';
import InfiniteScroll from 'react-infinite-scroll-component';
import { TOPDISTANCE, DOMAIN, MENULIST, PRODUCTID, setTitle, isOffline } from './constants';
import { Actions } from './Actions';
import { Store } from './Store';


const { Link } = ReactRouter;

const getMoreData = (context) => {
    const that = context;
    het.get(MENULIST, { pageIndex: that.state.pageIndex, productId: PRODUCTID }, (response) => {
        const responseData = JSON.parse(response);
        if (responseData.code == 0 && responseData.data.list.length) {
            const pager = responseData.data.pager,
                hasNextPage = pager.hasNextPage,
                pageIndex = pager.pageIndex;
            that.setState({ menuItems: that.state.menuItems.concat(responseData.data.list), hasNextPage: hasNextPage, pageIndex: pageIndex + 1 });
        }
    }, () => {
        het.toast('请求失败，稍后重试');
    });
};

export class MenuList extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            menuItems: [],
            pageIndex: 1,
            hasNextPage: true
        };
        this.listenStore(Store);
        this.handleLoad = this.handleLoad.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleJumpDetail = this.handleJumpDetail.bind(this);
    }
    componentDidMount() {
        getMoreData(this);
    }
    componentWillMount() {
        setTitle('云菜谱');
    }
    handleLoad() {
        getMoreData(this);
    }
    handleClick(id) {
        if (!isOffline(this.state))  return ;
        het.toast(JSON.stringify({ menuId: id }));
    }
    handleJumpDetail(id) {
        if (!isOffline(this.state))  return ;
        const { MenuNumberHigh, MenuNumberLow } = this.state,
            menuId = MenuNumberHigh * 256 + MenuNumberLow;
        if (menuId != id && menuId != 0 && !isNaN(menuId)) {
            het.toast('当前已有云菜谱正在烹饪，无法切换菜谱');
            return;
        }
        ReactRouter.hashHistory.push('/MenuDetail?menuId=' + id);
    }
    render() {


        return (
            <div className="menu-list">
                <div className="menu-bar" style={{ height: TOPDISTANCE }}></div>
                <InfiniteScroll next={this.handleLoad} hasMore={this.state.hasNextPage} endMessage={<div className="loading fade-out"></div>} loader={<div className="loading">加载中...</div>} style={{ marginTop: TOPDISTANCE }}>
                    {this.state.menuItems.map((item) => {
                        return (
                            <div className="menu-item" key={item.menuId}>
                                <img src={item.cover} onClick={(e) => { this.handleClick(item.menuId); }} alt="" />
                                <div className="menu-con">
                                    <div className="menu-context">
                                        <p className="menu-name">{item.name}</p>
                                        <p className="cooking-time">制作时间：{item.cookingTime}</p>
                                    </div>
                                    <div className="menu-start" onTouchTap={() => { this.handleJumpDetail(item.menuId) }}>一键烹饪</div>
                                </div>
                            </div>
                        );
                    })}
                </InfiniteScroll>
            </div>
        );
    }
}
