'use strict';

import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {HEADERTOP, setTitle} from './constants';

export class MenuList extends BaseComponent {
    constructor(props) {
        super(props);
        setTitle('云菜谱');
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
        Actions.getMenuList(this.state.pageIndex);
    }

    componentWillUpdate(nextProps, nextState) {
        let curResponse = this.state.response || [];
        let nextResponse = nextState.response || [];
        const _this = this;
        if (curResponse != nextResponse) {
            const responseData = JSON.parse(nextResponse);
            if (responseData.code == 0 && responseData.data.list.length) {
                const pager = responseData.data.pager,
                    hasNextPage = pager.hasNextPage,
                    pageIndex = pager.pageIndex;
                let menuItems = _this.setState.menuItems || [];
                _this.setState({
                    menuItems: menuItems.concat(responseData.data.list),
                    hasNextPage: hasNextPage,
                    pageIndex: pageIndex + 1
                });
            }
        }
    }

    handleLoad() {
        Actions.getMenuList(this.state.pageIndex);
    }

    handleClick(id) {
        if (parseInt(this.state.online || 1) == 2) {
            het.toast("设备已离线");
            return false;
        }
        het.toast(JSON.stringify({menuId: id}));
    }

    handleJumpDetail(id) {
        if (parseInt(this.state.online || 1) == 2) {
            het.toast("设备已离线");
            return false;
        }
        const {CookBookHight8b, CookBookLow8b} = this.state,
            menuId = CookBookHight8b * 256 + CookBookLow8b;
        if (menuId != id && menuId != 0 && !isNaN(menuId)) {
            het.toast('当前已有云菜谱正在烹饪，无法切换菜谱');
            return;
        }
        ReactRouter.hashHistory.push('/MenuDetail?menuId=' + id);
    }

    render() {
        return (
            <div className="menu-list">
                <div className="menu-bar" style={{height: HEADERTOP}}></div>
                <InfiniteScroll next={this.handleLoad} hasMore={this.state.hasNextPage}
                                endMessage={<div className="loading fade-out"></div>}
                                loader={<div className="loading">加载中...</div>} style={{marginTop: HEADERTOP}}>
                    {this.state.menuItems.map((item) => {
                        return (
                            <div className="menu-item" key={item.menuId}>
                                <img src={item.cover} onClick={(e) => {
                                    this.handleClick(item.menuId);
                                }} alt=""/>
                                <div className="menu-con">
                                    <div className="menu-context">
                                        <p className="menu-name">{item.name}</p>
                                        <p className="cooking-time">制作时间：{item.cookingTime}</p>
                                    </div>
                                    <div className="menu-start" onTouchTap={() => {
                                        this.handleJumpDetail(item.menuId)
                                    }}>一键烹饪
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </InfiniteScroll>
            </div>
        );
    }
}
