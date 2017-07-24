@echo off 
cls 
color 0F
title 开放平台专用
rem @author Yanan @datetime 2017-12-5
:select_work
cls 
echo.
echo ┎———————开放平台—————————┒
echo.
echo   1 自动构建打包
echo.
echo   2 自动发布版本
echo.
echo ┖———————开放平台—————————┚
echo.
set /p work=请选择工作模式（默认1）: 
if "%work%"=="" set work=1

rem 执行工作流
if %work%==1 (
    echo 开始自动构建...
    gulp default
) else if %work%==2 (
    echo 开始预发布项目...
    gulp release
    echo 预发布成功
    goto END
    pause
) else (
    echo 输入错误
    goto select_work
)
