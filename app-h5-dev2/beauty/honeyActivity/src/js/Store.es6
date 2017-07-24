'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';

let voteList = [];
let ip = location.protocol+'//'+location.host + '/manages/mobile/cBeauty';
let backIp = location.protocol+'//'+location.host + '/v1/web/cms';
// let backIp = '';
// let ip = 'http://np.tunnel.qydev.com';
let activityShare = ip + '/honeyActivity/page/index.html#/';
// let shareImg = 'http://4493bz.1985t.com/uploads/allimg/150127/4-15012G52133.jpg';
let shareImg = 'http://fileserver1.clife.net:8080/group1/M00/01/59/Cvtlp1g8HD-AcPGNABsCKx3zW2E343.jpg';
/**
 * 微信分享配置
 * @param    {String}    title   分享标题 
 * @param    {String}    desc    分享描述
 * @param    {String}    link    分享链接
 * @param    {String}    imgUrl  分享图标
 * @param    {String}    type    分享类型,music、video或link，不填默认为link
 * @param    {String}    dataUrl 如果type是music或video，则要提供数据链接，默认为空
 * @param    {function}  success 用户确认分享后执行的回调函数
 * @param    {function}  error   用户取消分享后执行的回调函数
 */
function wxShareConfig(data,oid){
    // alert(JSON.stringify(data));
    let title = data.title || '';// 分享标题
    let title1 = data.title1 || data.title; // 分享到朋友圈
    let desc = data.desc || '';// 分享描述
    let link = data.link || '';// 分享链接
    let imgUrl = data.imgUrl || '';// 分享图标
    let type = data.type || '';// 分享类型,music、video或link，不填默认为link
    let dataUrl = data.dataUrl || '';// 如果type是music或video，则要提供数据链接，默认为空
    //分享给微信朋友
    wx.onMenuShareAppMessage({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        type: type,
        dataUrl: dataUrl,
        success: function () { 
            // // 用户确认分享后执行的回调函数
            registerShare(oid);
            data.success && data.success();
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
            data.error && data.error();
        }
    });
    //分享给朋友圈
    wx.onMenuShareTimeline({
        title: title1, // 分享标题
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            registerShare(oid);
            data.success && data.success();
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
            data.error && data.error();
        },
        fail: function (res) {
            alert(JSON.stringify(res));
        }
    });
    //分享到QQ
    wx.onMenuShareQQ({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () { 
           // 用户确认分享后执行的回调函数
           registerShare(oid);
           data.success && data.success();
        },
        cancel: function () { 
           // 用户取消分享后执行的回调函数
           data.error && data.error();
        }
    });
    //分享到腾讯微博
    wx.onMenuShareWeibo({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () { 
           // 用户确认分享后执行的回调函数
           registerShare(oid);
           data.success && data.success();
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
            data.error && data.error();
        }
    });
    //分享到QQ空间
    wx.onMenuShareQZone({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () { 
           // 用户确认分享后执行的回调函数
           registerShare(oid);
           data.success && data.success();
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
            data.error && data.error();
        }
    });
}

/**
 * Toast提示
 * @param    {String}      msg提示信息
 */
function showToast(msg){
    clearTimeout(st);
    let toast = document.getElementById('toast');
    toast.style.display = 'block';
    toast.innerHTML = msg;
    var st = setTimeout(function(){
        toast.style.display = 'none';
    },3000);
}

/**
 * 活动转发数统计
 * @param    {String}      oid
 */
function registerShare(oid){
    let _this = this;
    let data = {
        name:'forwarding',
        oid:oid
    };
    $.ajax({
        url: backIp + '/hairdressing/bestie/registerPage',
        data:data,
        success:function(res){
            if(res.code == 0){
                
            }
        }
    });
}

/**
 * 投票页面转发配置
 * @param    {String}      oid
 */
function voteShare(oid){
    let voteShare = ip + '/honeyActivity/page/index.html#/Vote';
    let configData = {
        title: '为我助力', // 分享标题
        desc: '我在参加【闺蜜行动】申请体验智能美容产品，快为我投票吧！', // 分享描述
        link: voteShare, // 分享链接
        imgUrl: shareImg, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () { 
            // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
        }
    };
    wxShareConfig(configData,oid);
}

/**
 * 投票详情页面转发配置
 * @param    {String}      oid
 */
function voteDetailShare(oid){
    let href = window.location.hash;
    let cid = href.substr(href.indexOf('VoteDetail/')+11);
    let voteShare = ip + '/honeyActivity/page/index.html#/VoteDetail/'+cid;
    let configData = {
        title: '为我助力', // 分享标题
        desc: '我在参加【闺蜜行动】申请体验智能美容产品，快为我投票吧！', // 分享描述
        link: voteShare, // 分享链接
        imgUrl: shareImg, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () { 
            // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
        }
    };
    wxShareConfig(configData,oid);
}

/**
 * 首页展示页面转发配置
 * @param    {String}      oid
 */
function infoShare(oid){
    let voteShare = ip + '/honeyActivity/page/index.html#/showInfo';
    let configData = {
        title: '【闺蜜行动】召唤闺蜜进行时~', // 分享标题
        desc: '来参加就是对友谊最好的证明！', // 分享描述
        link: voteShare, // 分享链接
        imgUrl: shareImg, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () { 
            // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
        }
    };
    wxShareConfig(configData,oid);
}

export const Store = Reflux.createStore({
    listenables: [Actions],
    onGetData(pindex,prows,txt){
    	let _this = this;
    	let data = {
    		query: txt,
            pageIndex:pindex,
            pageRows:prows
    	};
        $.ajax({
            url: backIp + '/hairdressing/bestie/showWhole',
            data:data,
            success:function(res){
                if(res.code == 0){
                    if(pindex == 1){
                        voteList = res.data.list.concat([]);
                    }else{
                        voteList = voteList.concat(res.data.list);
                    }
                    _this.trigger({voteList:voteList});
                }
            }
        });
    },
    onGetMyGroupData(cid,oid) {
        let _this = this;
        let data = {
            oid:oid,
            combId:cid
        };

        let voteShare = '';
        if(window.location.href.indexOf('VoteDetail') == -1){
            voteShare = ip + '/honeyActivity/page/index.html#/Vote';
        }else{
            voteShare = ip + '/honeyActivity/page/index.html#/VoteDetail/'+cid;
        }
        let configData = {
            title: '为我助力', // 分享标题
            title1: '我在参加【闺蜜行动】申请体验智能美容产品，快为我投票吧！',
            desc: '我在参加【闺蜜行动】申请体验智能美容产品，快为我投票吧！', // 分享描述
            link: voteShare, // 分享链接
            imgUrl: shareImg, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () { 
                // 用户确认分享后执行的回调函数
            },
            cancel: function () { 
                // 用户取消分享后执行的回调函数
            }
        };
        // alert(voteShare);
        wxShareConfig(configData,oid);

        $.ajax({
            url: backIp + '/hairdressing/bestie/showInfo',
            data:data,
            success:function(res){
                if(res.code == 0){
                    let data = res.data;
                    let triggerData = {};
                    let imgObj = {};
                    let tempArr = [];
                    data.participanterImg.map((item,index)=>{
                        if(item.isCover == 'Y'){
                            imgObj.cover = item.imgUrl;
                        }else if(item.isCover == 'X'){
                            imgObj.coverS = item.imgUrl;    
                        }else{
                            tempArr.push(item.imgUrl);
                        }
                    });
                    imgObj.img1 = tempArr[0];
                    imgObj.img2 = tempArr[1];
                    triggerData = Funs._extends(data,imgObj);
                    _this.trigger(triggerData);
                }
            }
        });
    },
    onVote(cid,oid,pIndex,pRows,value,origiCid){
        let _this = this;
        let data = {
            oid:oid,
            combId:cid
        };
        $.ajax({
            url: backIp + '/hairdressing/bestie/checkStatus',
            data:{
                oid:oid
            },
            success:function(res){
                if(res.code == 0){
                    if(res.data.vote == -1){
                        showToast('投票已过期');
                        return;
                    }else{
                        $.ajax({
                            url: backIp + '/hairdressing/bestie/vote',
                            data:data,
                            success:function(res){
                                //console.log(123,res);
                                if(res.code == 0){
                                    calVote(cid,res.data);
                                    showToast('投票成功');
                                    _this.onGetMyGroupData(origiCid,oid);
                                    _this.trigger({voteList:voteList});
                                    return;
                                }
                                if(res.code == -1){
                                    showToast('今日已投3票，明天再来吧');
                                    return;
                                }else{
                                    //console.log(99999,res);
                                    showToast(res.msg);
                                    return;
                                }
                            }
                        });
                    }
                }
            }
        });
        //投票之后直接修改对应组合的票数，不请求列表接口
        function calVote(cid,votenum){
            voteList.map((item,idx)=>{
                if(item.combinationId == cid){
                    item.totalVotes = votenum;
                }
            });
        }
    },
    onRegisterPage(name,oid){
        let _this = this;
        let data = {
            name:name,
            oid:oid
        };
        $.ajax({
            url: backIp + '/hairdressing/bestie/registerPage',
            data:data,
            success:function(res){
                //console.log(res);
                if(res.code == 0){
                    
                }
            }
        });
    },
    onCheckActivity(oid){
        let _this = this;
        let data = {
            oid:oid
        };
        $.ajax({
            url: backIp + '/hairdressing/bestie/checkStatus',
            data:data,
            success:function(res){
                //console.log(res);
                if(res.code == 0){
                    if(res.data.takeIn == -1){
                        _this.trigger({joinText:'已参加',joinClass:'btn2-disabled'});
                    }else if(res.data.activity == -1){
                        _this.trigger({joinText:'活动已过期',joinClass:'btn2-disabled'});
                    }else{
                        _this.trigger({joinText:'马上参加',joinClass:'btn2'});
                    }
                }
            }
        });
    },
    onConfigWx(oid){
        let url = backIp + '/hairdressing/bestie/sign';
        let _url = window.location.href;
        let config = {};
        let _this = this;
        $.ajax({
            url: url,
            dataType: 'json',
            data: {
                url: _url
            },
            async:true,
            success: function(r){
                    //console.log(r)
                    if(r.code==0){
                        config.nonceStr = r.data.nonceStr;
                        config.signature = r.data.signature;
                        config.appId = r.data.appId;
                        config.timestamp = r.data.timestamp;
                        wx.config({
                             debug:false,
                             appId: config.appId,   
                             timestamp: config.timestamp,    
                             nonceStr: config.nonceStr,    
                             signature: config.signature,    
                             jsApiList: [
                             'checkJsApi',
                             'uploadImage',
                             'chooseImage',
                             'previewImage',
                             'showMenuItems',
                             'showAllNonBaseMenuItem',
                             'hideAllNonBaseMenuItem',
                             'onMenuShareAppMessage',
                             'onMenuShareTimeline',
                             'onMenuShareQQ',
                             'onMenuShareWeibo',
                             'onMenuShareQZone'
                             ]  
                        });
                        wx.ready(function(){
                            if(window.location.href.indexOf('VoteDetail') != -1){
                                voteDetailShare(oid);
                            }else if(window.location.href.indexOf('Vote') != -1 && window.location.href.indexOf('VoteDetail') == -1){
                                voteShare(oid);
                            }else if(window.location.href.indexOf('Guide') != -1){

                            }else if(window.location.href.indexOf('DetailsApp') != -1){

                            }else if(window.location.href.indexOf('identify') != -1){

                            }else if(window.location.href.indexOf('bestie') != -1){

                            }else if(window.location.href.indexOf('showInfo') != -1){
                                infoShare(oid);
                            }else{
                                _this.onShareActivity(oid) 
                            }; 
                        });

                    }else{
                        showToast('访问异常！')
                    }
                },
            error: function(r){
                showToast('访问异常！')
            }
            })
    },
    onGetActivityInfo(){
        let url = backIp + '/hairdressing/bestie/activityInfo';
        $.ajax({
            url: url,
            dataType: 'json',
            async: true,
            success: function(res){
                if(res.code==0){
                    //console.log(res.data);
                    let activityStartTime = res.data.activityStartTime.split(' ')[0];
                    let activityEndTime = res.data.activityEndTime.split(' ')[0];
                    let voteStartTime = res.data.voteStartTime.split(' ')[0];
                    let voteEndTime = res.data.voteEndTime.split(' ')[0];
                    let voteResultPublishTime = res.data.voteResultPublishTime.split(' ')[0];
                    //console.log(activityEndTime)
                    this.trigger({activityStartTime:activityStartTime,activityEndTime:activityEndTime,voteStartTime:voteStartTime,voteEndTime:voteEndTime,voteResultPublishTime:voteResultPublishTime})
                }
            }.bind(this),

        })
    },
    onGetTags(){
        let url = backIp + '/hairdressing/bestie/getLabel';
        $.ajax({
            url: url,
            dataType: 'json',
            async: true,
            success: function(res){
                if(res.code==0){
                    let tag1 = res.data[0].content;
                    let tag2 = res.data[1].content;
                    let tag3 = res.data[2].content;
                    let tag4 = res.data[3].content;
                    this.trigger({tag1:tag1,tag2:tag2,tag3:tag3,tag4:tag4,});
                }

            }.bind(this)
        })
    },
    onGetInfo(oid,cid){
        let url = backIp + '/hairdressing/bestie/showInfo?oid='+oid+'&combId='+cid;
        let _this = this;
        $.ajax({
            url: url,
            dataType: 'json',
            async: true,
            success: function(res){
                if(res.code==0){
                    //wx.showAllNonBaseMenuItem();
                    let participanterImgTemp = res.data.participanterImg || [];
                    let participanterImg = [];
                    if(participanterImgTemp.length > 0){
                        participanterImgTemp.map((item,index)=>{
                            if(item.isCover != 'X'){
                                participanterImg.push(item);
                            }
                        });
                    }
                    let combinationName = res.data.combinationName;
                    if(combinationName){
                        wx.showAllNonBaseMenuItem();
                    }
                    let declarationId = res.data.declarationId;
                    let combinationId = res.data.combinationId || '';
                    let participantName = res.data.participant.participantName;
                    let participantPhone = res.data.participant.participantPhone;
                    let participantId = res.data.participant.participantId;
                    let bestieName = res.data.bestie.participantName;
                    let bestiePhone = res.data.bestie.participantPhone;
                    let bestieId = res.data.bestie.participantId;

                    let url1 = ip + '/honeyActivity/page/index.html?cname='+combinationName+'#/Guide';
                    let configData = {
                        title: '和我一起参加闺蜜行动吧！', // 分享标题
                        desc: '作为我的好闺蜜，当然要和我一起美美哒！', // 分享描述
                        link: url1, // 分享链接
                        imgUrl: shareImg, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () { 
                            // 用户确认分享后执行的回调函数
                            let shareUrl = backIp + '/hairdressing/bestie/shareLink?combId='+combinationId;
                            $.ajax({
                                url: shareUrl,
                                dataType: 'json',
                                async: true,
                                success: function(res){
                                    if(res.code==0){
                                        _this.trigger({showshare: false});
                                        //let url2 = '#Vote/'+oid+'/'+combId;
                                        // window.location.href = url; 
                                        let url2 = ip + '/honeyActivity/page/index.html#/Vote/'+oid+'/'+combinationId;
                                        window.location.href = url2;
                                    }
                                }
                            })
                        },
                        cancel: function () { 
                            // 用户取消分享后执行的回调函数
                        }
                    };
                    wxShareConfig(configData,oid);
                    // 闺蜜提交页面判断提交状态
                    let confirmDate = res.data.confirmDate;
                    let confirm = '提交';
                    if(confirmDate){
                        confirm = '已提交';
                    }
                    this.onCheckStatus4ide(oid);
                    this.trigger({
                        items: participanterImg,
                        combName: combinationName,
                        combId: combinationId,
                        selected: declarationId,
                        participantName : participantName,
                        participantPhone : participantPhone,
                        participantId : participantId,
                        bestieName : bestieName,
                        bestiePhone : bestiePhone,
                        bestieId : bestieId,
                        confirm: confirm
                    })
                }
            }.bind(this)
        })
    },
    onCheckCombName(val){
        let url = backIp + '/hairdressing/bestie/checkCombName?name='+val;
        $.ajax({
            url: url,
            dataType: 'json',
            async: false,
            success: function(res){
                if(res.code==-1){
                    this.trigger({exist: true});
                }else{

                }
            }.bind(this)
        })
    },
    onCheckStatus(oid){
        let url = backIp + '/hairdressing/bestie/checkStatus?oid='+ oid;
        $.ajax({
            url: url,
            dataType: 'json',
            async: true,
            success: function(res){
                if(res.code==0){
                    if(res.data.takeIn==-1){
                        this.trigger({joinbtn: '已参加'})
                    }
                    if(res.data.activity==-1){
                        this.trigger({joinbtn: '活动已过期'})
                    }
                }
            }.bind(this)
        })

    },
    onCheckStatus4ide(oid){
        let url = backIp + '/hairdressing/bestie/checkStatus?oid='+ oid;
        $.ajax({
            url: url,
            dataType: 'json',
            async: true,
            success: function(res){
                if(res.code==0){
                    if(res.data.takeIn==-1){
                        this.trigger({confirm: '已参加'})
                    }
                    if(res.data.activity==-1){
                        this.trigger({confirm: '活动已过期'})
                    }
                    if(res.data.linkValid !== undefined&&res.data.linkValid==-1){
                        this.trigger({confirm: '邀请已过期'})
                    }
                }
            }.bind(this)
        })
    },
    onChooseImage(oid,val){
        let url = backIp + '/hairdressing/bestie/invitationCode?participant='+oid+'&invitationCode='+val;
        $.ajax({
            url: url,
            dataType: 'json',
            async: true,
            success: function(res){
                if(res.code==0){
                    //alert(344)
                    let url = window.location.href;
                    let url1 = url.substr(0,url.indexOf('#')+1);
                    window.location.href = url1 + '/identify?oid='+oid;
                    // wx.chooseImage({
                    //     count: 3, // 默认9
                    //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    //     success: function (res) {
                    //         let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    //         let id = JSON.stringify(localIds);
                    //         let url = window.location.href;
                    //         let url1 = url.substr(0,url.indexOf('#')+1);
                    //         window.location.href = url1 + '/ide?localIds='+id;

                    //     }
                    // });
                }
            }
        })
    },
    onJoinNow(oid,cid){
        let url = backIp + '/hairdressing/bestie/participant?oid='+oid;
        $.ajax({
            url: url,
            dataType: 'json',
            async: true,
            success: function(res){
                if(res.code==0){
                    if(res.data.focus ==-1){
                        //已修改
                        showToast('你还未关注公众号')
                    }else{
                        if(res.data.code==-1){
                            this.trigger({show: true});
                        }else{
                            if(res.data.perInfo==-1){
                                let url = window.location.href;
                                let url1 = url.substr(0,url.indexOf('#')+1);
                                window.location.href = url1 + '/identify?oid='+oid;
                                // wx.chooseImage({
                                //     count: 3, // 默认9
                                //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                                //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                                //     success: function (res) {
                                //         let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                                //         let id = JSON.stringify(localIds);
                                //         let url = window.location.href;
                                //         let url1 = url.substr(0,url.indexOf('#')+1);
                                //         window.location.href = url1 + '/ide?localIds='+id+'&oid='+oid;
                                //     }
                                // });
                            }else if(res.data.perInfo==0){
                                //ToDo:要加上组合Id
                                let url = window.location.href;
                                let url1 = url.substr(0,url.indexOf('#')+1);
                                window.location.href = url1 + '/identify?oid='+oid+'&combId='+cid;
                            }
                        }
                    } 
                }
            }.bind(this)
        })
    },
    onTapPhoto(arr,index){
        wx.previewImage({
            current: arr[index], // 当前显示图片的http链接
            urls: arr //预览的图片http链接列表
        });
    },
    onConfirmApply(items,combname,declarationId,applyname,applytel,honeyname,honeytel,oid,combId,participantId,bestieId){
          let arr = items.concat([]);
          let _items = [];
          var _this = this;
          let len1 = arr.length;
          for(let i = 0;i< len1;i++){
                if(arr[i].imgUrl.indexOf('http://') ==-1){
                    _items.push(arr[i]);
                    arr[i] = 1;
                }
          }
          for(let i = 0,len=arr.length;i<len;i++){
                if(arr[i]==1){
                    arr.splice(i,1);
                }
          }
          let serverIds = [];
          //alert(JSON.stringify(_items));
          let i = 0,len = _items.length;
          if(len>0){
                upload();
          }else{
                _this.trigger({showSave: true});
                let a = 0;
                for(let i=0,len=arr.length;i<len;i++){
                    if(arr[i].isCover == 'Y'){
                        a = i+1;
                    }
                }
                let url = backIp + '/hairdressing/bestie/share';
                let data = {
                    pic1: arr[0].imgUrl,
                    pic2: arr[1].imgUrl,
                    pic3: arr[2].imgUrl,
                    coverPic: 'pic'+a,
                    combName: combname,
                    declare: declarationId,
                    participantName: applyname,
                    participantPhone: applytel,
                    bestieName: honeyname,
                    bestiePhone: honeytel,
                    openId: oid,
                    combId: combId,
                    participantId: participantId,
                    bestieId: bestieId
                }
                $.post(url,data,function(res){
                    // alert(JSON.stringify(res));
                    if(res.code==0){
                        wx.showAllNonBaseMenuItem(); 
                        _this.trigger({showSave:false,showshare: true,participantId: res.data.participantId,bestieId:res.data.bestieId,combId:res.data.combId});
                        // let combname = res.data;
                        let cid = res.data.combId;
                        let url = ip + '/honeyActivity/page/index.html?cname='+combname+'#/Guide';
                        let configData = {
                            title: '和我一起参加闺蜜行动吧！', // 分享标题
                            desc: '作为我的好闺蜜，当然要和我一起美美哒！', // 分享描述
                            link: url, // 分享链接
                            imgUrl: shareImg, // 分享图标
                            type: '', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () { 
                                // 用户确认分享后执行的回调函数
                                let shareUrl = backIp + '/hairdressing/bestie/shareLink?combId='+cid;
                                $.ajax({
                                    url: shareUrl,
                                    dataType: 'json',
                                    async: true,
                                    success: function(res){
                                        if(res.code==0){
                                            _this.trigger({showshare:false});
                                            let url = ip + '/honeyActivity/page/index.html#/Vote/'+oid+'/'+combId;
                                            //let url = '/honeyActivity/page/index.html#Vote/'+oid+'/'+combId;
                                            window.location.href = url; 
                                        }
                                    }
                                })

                                // _this.trigger({showshare: false});
                                // let url = '#Vote/'+oid+'/'+combId;
                                // //let url = '/honeyActivity/page/index.html#Vote/'+oid+'/'+combId;
                                // window.location = url; 
                            },
                            cancel: function () { 
                                // 用户取消分享后执行的回调函数
                            }
                        };
                        wxShareConfig(configData,oid);
                        _this.onGetInfo(oid,res.data.combId);
                    }else{
                            if(res.code==1){
                                _this.trigger({showSave:false})
                                showToast('闺蜜已确认，无法修改');
                            }
                            if(res.code==-1){
                                _this.trigger({showSave:false})
                                showToast('您还未关注公众号，请按活动流程进行操作')
                            }
                            if(res.code==-2){
                                _this.trigger({showSave:false})
                                showToast('组合名称已存在，数据保存失败')
                            }
                        }
                })
          }
          function upload() {
            wx.uploadImage({
              localId: _items[i].imgUrl,
              success: function (res) {
                i++;
                //alert('已上传：' + i + '/' + length);
                //alert(JSON.stringify(res.serverId));
                serverIds.push({imgUrl:res.serverId,isCover:_items[i-1].isCover,imgId: null});
                //alert(JSON.stringify(serverIds))
                if (i < len) {
                  upload();
                }else{
                    _this.trigger({showSave: true});
                    let newArr = serverIds.concat(arr);
                    // alert(JSON.stringify(newArr));
                    let a = 0;
                    for(let i=0,len=newArr.length;i<len;i++){
                        if(newArr[i].isCover == 'Y'){
                            a = i+1;
                        }
                    }
                    let url = backIp + '/hairdressing/bestie/share';
                    let data = {
                        pic1: newArr[0].imgUrl,
                        pic2: newArr[1].imgUrl,
                        pic3: newArr[2].imgUrl,
                        coverPic: 'pic'+a,
                        combName: combname,
                        declare: declarationId,
                        participantName: applyname,
                        participantPhone: applytel,
                        bestieName: honeyname,
                        bestiePhone: honeytel,
                        openId: oid,
                        combId: combId,
                        participantId: participantId,
                        bestieId: bestieId
                    }
                    $.post(url,data,function(res){
                        if(res.code==0){
                            wx.showAllNonBaseMenuItem();
                            _this.trigger({showSave:false, showshare: true,participantId: res.data.participantId,bestieId:res.data.bestieId,combId:res.data.combId});
                            let cid = res.data.combId;
                            let url = ip + '/honeyActivity/page/index.html?cname='+combname+'#/Guide';
                            let configData = {
                                title: '和我一起参加闺蜜行动吧！', // 分享标题
                                desc: '作为我的好闺蜜，当然要和我一起美美哒！', // 分享描述
                                link: url, // 分享链接
                                imgUrl: shareImg, // 分享图标
                                type: '', // 分享类型,music、video或link，不填默认为link
                                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                                success: function () { 
                                    // 用户确认分享后执行的回调函数
                                    let shareUrl = backIp + '/hairdressing/bestie/shareLink?combId='+cid;
                                    $.ajax({
                                        url: shareUrl,
                                        dataType: 'json',
                                        async: true,
                                        success: function(res){
                                            if(res.code==0){
                                                _this.trigger({showshare:false});
                                                let url = ip + '/honeyActivity/page/index.html#/Vote/'+oid+'/'+combId;
                                                //let url = '/honeyActivity/page/index.html#Vote/'+oid+'/'+combId;

                                                window.location.href = url; 
                                            }
                                        }
                                    })
                                    

                                },
                                cancel: function () { 
                                    // 用户取消分享后执行的回调函数
                                }
                            };
                            wxShareConfig(configData,oid);
                            _this.onGetInfo(oid,res.data.combId);
                            
                        }else{
                            if(res.code==1){
                                _this.trigger({showSave:false})
                                showToast('闺蜜已确认，无法修改');
                            }
                            if(res.code==-1){
                                _this.trigger({showSave:false})
                                showToast('您还未关注公众号，请按活动流程进行操作')
                            }
                            if(res.code==-2){
                                _this.trigger({showSave:false})
                                showToast('组合名称已存在，数据保存失败')
                            }
                        }
                    })
                }
                
              },
              fail: function (res) {
                showToast('图片上传失败，请上传不同的图片');
                _this.trigger({items: []});
              }
            });
          }
    },
    onConfirmBestie(oid,combId){
        let url = backIp + '/hairdressing/bestie/acceptInvitation?oid='+oid+'&combId='+combId;
        $.ajax({
            url: url,
            dataType: 'json',
            async: true,
            success: function(res){
                if(res.code==-1){
                    showToast('未关注公众号')
                }
                if(res.code==1){
                    showToast('邀请已过期')
                }
                if(res.code==2){
                    showToast('请转发给闺蜜，由闺蜜提交活动申请')
                }
                if(res.code==3){
                    showToast('自己无法接受自己的邀请')
                }
                if(res.code==5){
                    showToast('邀请已被接受，不允许重复接受邀请')
                }
                if(res.code==0){
                    showToast('资料已密送，赶紧看看小伙伴的投票数吧');
                    setTimeout(function(){
                        let url = ip + '/honeyActivity/page/index.html#/Vote/'+oid+'/'+combId;
                        window.location = url;
                    },3000);
                    
                }

            }.bind(this)
        })
    },
    onShareActivity(oid) {
        let configData = {
            title: '和我一起参加闺蜜行动吧！', // 分享标题
            desc: '赢取美容智能设备，还有更多惊喜大礼哦！', // 分享描述
            link: activityShare, // 分享链接
            imgUrl: shareImg, // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () { 
                // 用户确认分享后执行的回调函数
            },
            cancel: function () { 
                // 用户取消分享后执行的回调函数
            }
        };
        // alert(JSON.stringify(configData)+'***123');
        wxShareConfig(configData,oid);
    }
});