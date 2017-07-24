@echo off
setlocal enabledelayedexpansion
set titl=HeT
title %titl%

rem 启动工程开发环境批处理
rem 可传参，也可不传，不传参时，将会引导选择
rem 传参示例：start.cmd 1 beauty/myDevDir v1.0.1 yes
rem 分别表示：产品线、开发目录、版本号、自动刷新

rem 选择产品线流程
echo =============== 产品线 ====================
echo    1. 美容
echo    2. 家电
echo    3. 睡眠
echo    4. 健康
echo    5. 酒店
echo    0. 其它
echo ===========================================
if not "%1"=="" (
    set line=%1
    goto select_line2
)
:select_line
set /p line=请选择产品线: 
:select_line2
if "%line%"=="" goto :select_line
if %line%==1 (
    set titl=%titl% - 美容
    set base_dir=beauty
) else if %line%==2 (
    set titl=%titl% - 家电
    set base_dir=household
) else if %line%==3 (
    set titl=%titl% - 睡眠
    set base_dir=sleep
) else if %line%==4 (
    set titl=%titl% - 健康
    set base_dir=health
) else if %line%==5 (
    set titl=%titl% - 健康城市
    set base_dir=hotel
) else if %line%==0 (
    set titl=%titl% - 其它
    set base_dir=other
) else (
    echo 选择有误！
    goto select_line
)

title %titl%

rem 选择设备流程
echo ================ 设备 =====================
set /a i=0
for /d %%d in (%base_dir%/*) do if not %%d==common (
    set /a i=i+1
    echo    !i! %%d
)
echo ===========================================
if not "%2"=="" (
    set base_dir=%2/
    set titl=%titl% @ %2
    goto select_device2
)
:select_device
set /p device=请选择设备: 
if "%device%"=="" goto :select_device
set dev_path=null
set /a i=0
for /d %%d in (%base_dir%/*) do if not %%d==common (
    set /a i=i+1
    if !i!==%device% (
        set dev_path=%%d
        set titl=%titl% / %%d
    )
)
if "%dev_path%"=="null" (
    echo 选择有误！
    goto :select_device
)
set base_dir=%base_dir%/%dev_path%/
:select_device2
title %titl%

rem 输入版本号流程
if not "%3"=="" (
    set version=%3
) else (
    set /p version=请输入版本号（默认v1.0.1）: 
)
if "%version%"=="" set version=v1.0.1
set titl=%titl% - version: %version%
title %titl%
cls

:select_work
rem 选择工作模式流程
echo =============== 工作模式 ==================
echo    1. 运行开发环境（执行自动构建）
echo    2. 预发布本项目（打zip包）
echo    3. 初始化项目（新建或维护他人项目时，可用此功能初始化）
echo    4. 提交源码至SVN
echo    5. 预发布公共文件（打zip包）
echo    9. 构建公共文件（谨慎！）
echo ===========================================
set /p work=请选择工作模式（默认1）: 
if "%work%"=="" set work=1

rem 设置自动刷新
set autorefresh=%4
if "%autorefresh%"=="" set autorefresh=yes

rem 执行工作流
if %work%==1 (
    echo 开始自动构建...
    start runVirtualApp
) else if %work%==2 (
    echo 开始预发布项目...
) else if %work%==3 (
    echo 开始初始化项目...
    rem set pa=%cd%
    rem cd %base_dir%
    rem TortoiseProc /command:add /path:"./"
    rem TortoiseProc /command:ignore /path:"static*vm"
    rem cd %pa%
) else if %work%==4 (
    echo 正在提交源码...
    TortoiseProc /command:commit /path:"%base_dir%"
    goto END
) else if %work%==5 (
    echo 开始预发布公共文件...
) else if %work%==9 (
    set /p surework=确定要构建公共文件吗？yes/no: 
    if !surework!==yes (
        echo 开始构建公共文件...
    ) else (
        goto END
    )
)
gulp --work %work% --path %base_dir% --ver %version% --autorefresh %autorefresh% --title "%titl%"

:END
rem 无条件跳转至选择工作模式流程
goto select_work

pause