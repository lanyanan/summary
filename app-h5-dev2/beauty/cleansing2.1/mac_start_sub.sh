
path="$(pwd)"
OLD_IFS="$IFS" 
IFS="/" 
arr=($path) 
#IFS="$OLD_IFS" 
len=${#arr[@]}
a=0



cd ../../
#初始化版本号，现在没有使用，但是依然要传入
version=v1.0.1


#这里是为了取出 子设备名
let a=len-1
subType=${arr[$a]}

#这里是为了取出 主设备名
let a=a-1
mainType=${arr[$a]}

echo "subType:"$subType
echo "mainType:"$mainType
./mac_start.sh -m $mainType -s $subType -v version -a 