@echo off 
cls 
color 0F
title ������������ϵͳ
rem @author Yanan @datetime 2017-2-27
:WORK
cls 
echo.
echo ����������������������ϵͳ��������������
echo.
echo   1 �Զ���⹹��
echo.
echo   2 ����Ԥ�����ļ�
echo.
echo ����������������������ϵͳ��������������
echo.
set /p work=��ѡ����ģʽ��Ĭ��1��: 
if "%work%"=="" set work=1

rem ִ�й�����
if %work%==1 (
    echo �Զ���⹹��...
    gulp watch
    echo �Զ���⹹���ɹ�.....
) else if %work%==2 (
    echo ��ʼԤ������Ŀ...
    gulp release
    echo Ԥ�����ɹ�
    goto END
    pause
)else (
    echo �������
    goto select_work
)
:END
pause
goto select_work