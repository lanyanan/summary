#!/bin/bash

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
    read -p "请选择产品线: " line
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

# echo $base_dir

while :
do
    read -p "请输入产品名称（用做目录名）: " projName
    if [ -z $projName ];then
        continue
    elif [ -e ./$base_dir/$projName ];then
        echo err: 产品名称冲突，请重新输入
        continue
    else
        break
    fi
done

# echo $base_dir/$projName

echo 正在创建产品 %projName% ...

path=./$base_dir/$projName
mkdir $path
cp -r _public/_template/* $path

# 生成start快捷方式
linkFile=$path/start.sh
echo '#!/bin/bash'>>$linkFile
echo '# ============== 项目配置 ==================='>>$linkFile
echo '# 版本号'>>$linkFile
echo 'version=v1.0.1'>>$linkFile
echo '# 自动刷新浏览器（yes/no）'>>$linkFile
echo 'autorefresh=yes'>>$linkFile
echo '# =========================================='>>$linkFile
echo 'pa=$PWD/'>>$linkFile
echo 'cd ../../'>>$linkFile
echo './start.sh '$line' $pa $version $autorefresh'>>$linkFile
chmod 0755 $linkFile

# 生成虚拟app配置文件
echo '{"host":"200.200.200.50","ready":{},"configData":{},"runningData":[{"hello":"\u5F53\u4F60\u770B\u5230\u8FD9\u6761\u4FE1\u606F\uFF0C\u8868\u660E\u79CD\u5B50\u9879\u76EE\u5DF2\u6210\u529F\u8FD0\u884C\uFF01"}]}'>./virtualApp/apps/$projName.json

echo ===========================================
echo \  $projName 创建成功！
echo \  路径：$path
echo \  注意：开始开发前，请先初始化项目（工作模式选3）
echo ===========================================