#!/bin/bash

# 启动工程开发环境批处理
# 可传参，也可不传，不传参时，将会引导选择
# 传参示例：start.cmd 1 beauty/myDevDir v1.0.1 yes
# 分别表示：产品线、开发目录、版本号、自动刷新

title=HeT

# 选择产品线流程
echo =============== 产品线 ====================
echo \   1. 美容
echo \   2. 家电
echo \   3. 睡眠
echo \   4. 健康
echo \   5. 酒店
echo \   0. 其它
echo ===========================================

while :
do
    if [ -z "$line" ] && [ "$1" \> "-1" ] && [ "$1" \< "9" ];then
        line=$1
    else
        read -p "请选择产品线: " line
    fi
    if [ "$line" \> "-1" ] && [ "$line" \< "9" ];then
        if [ $line == 1 ];then
            title=$title-美容
            base_dir=beauty
        elif [ $line == 2 ];then
            title=$title-家电
            base_dir=household
        elif [ $line == 3 ];then
            title=$title-睡眠
            base_dir=sleep
        elif [ $line == 4 ];then
            title=$title-健康
            base_dir=health
        elif [ $line == 5 ];then
            title=$title-健康城市
            base_dir=hotel
        elif [ $line == 0 ];then
            title=$title-其它
            base_dir=other
        else 
            echo 选择有误！
            continue
        fi
        break
    fi
done

# 选择设备流程
if [ -n "$2" ];then
    base_dir=$2
else
    echo ================ 设备 =====================
    for f in `ls ./$base_dir | grep -v common`;do
        let i=i+1
        echo \  $i $f
    done
    echo ===========================================
    while :
    do
        dev_path=_THIS_IS_A_NONEXISTENT_DIRECTORY_
        read -p "请选择设备: " device
        let j=0
        for f in `ls ./$base_dir | grep -v common`;do
            let j=j+1
            if [ "$j" == "$device" ];then
                dev_path=$f
                break
            fi
        done
        if [ "$dev_path" != "_THIS_IS_A_NONEXISTENT_DIRECTORY_" ];then
            break
        else
            echo 选择有误！
            continue
        fi
    done
    base_dir=$base_dir/$dev_path/
fi

# 输入版本号流程
if [ -z "$version" ] && [ -n "$3" ];then
    version=$3
else
    read -p "请输入版本号（默认v1.0.1）: " version
fi
if [ -z "$version" ];then
    version=v1.0.1
fi
clear

# 设置自动刷新
autorefresh=$4
if [ -z "$autorefresh" ];then
    autorefresh=yes
fi

# 选择工作模式流程
while :
do
    clear
    echo =============== 工作模式 ==================
    echo \   1. 运行开发环境（执行自动构建）
    echo \   2. 预发布本项目（打zip包）
    echo \   3. 初始化项目（新建或维护他人项目时，可用此功能初始化）
    echo \   4. 提交源码至SVN
    echo \   5. 预发布公共文件（打zip包）
    echo \   9. 构建公共文件（谨慎！）
    echo ===========================================
    read -p "请选择工作模式（默认1）: " work
    if [ -z "$work" ];then
        work=1
    fi

    if [ "$work" == "1" ];then
        echo 开始自动构建...
        bash ./runVirtualApp.sh
    elif [ "$work" == "2" ];then
        echo 开始预发布项目...
    elif [ "$work" == "3" ];then
        echo 开始初始化项目...
    elif [ "$work" == "4" ];then
        echo \  Sorry, 苹果、Linux系统需自行提交svn
        read -p "按回车键继续..." enterKey
        continue
    elif [ "$work" == "5" ];then
        echo 开始预发布公共文件...
    elif [ "$work" == "9" ];then
        read -p "确定要构建公共文件吗？yes/no:" surework
        if [ "$surework" == "yes" ];then
            echo 开始构建公共文件...
        else
            continue
        fi
    else
        continue
    fi
    gulp --work $work --path $base_dir --ver $version --autorefresh $autorefresh --title "$title"
    read -p "按回车键继续..." enterKey
done