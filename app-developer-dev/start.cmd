@echo off 
cls 
color 0F
title ����ƽ̨ר��
rem @author Yanan @datetime 2017-12-5
:select_work
cls 
echo.
echo ��������������������ƽ̨��������������������
echo.
echo   1 �Զ��������
echo.
echo   2 �Զ������汾
echo.
echo ��������������������ƽ̨��������������������
echo.
set /p work=��ѡ����ģʽ��Ĭ��1��: 
if "%work%"=="" set work=1

rem ִ�й�����
if %work%==1 (
    echo ��ʼ�Զ�����...
    gulp default
) else if %work%==2 (
    echo ��ʼԤ������Ŀ...
    gulp release
    echo Ԥ�����ɹ�
    goto END
    pause
) else (
    echo �������
    goto select_work
)
