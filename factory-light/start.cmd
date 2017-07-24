@echo off 
cls 
color 0F
title 工厂照明管理系统
rem @author Yanan @datetime 2017-2-27
:WORK
cls 
echo.
echo ┎————工厂照明管理系统——————┒
echo.
echo   1 自动监测构建
echo.
echo   2 构建预发布文件
echo.
echo ┖————工厂照明管理系统——————┚
echo.
set /p work=请选择工作模式（默认1）: 
if "%work%"=="" set work=1

rem 执行工作流
if %work%==1 (
    echo 自动监测构建...
    gulp watch
    echo 自动监测构建成功.....
) else if %work%==2 (
    echo 开始预发布项目...
    gulp release
    echo 预发布成功
    goto END
    pause
)else (
    echo 输入错误
    goto select_work
)
:END
pause
goto select_work