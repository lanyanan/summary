@echo off
setlocal enabledelayedexpansion
set titl=HeT
title %titl%

rem �������̿�������������
rem �ɴ��Σ�Ҳ�ɲ�����������ʱ����������ѡ��
rem ����ʾ����start.cmd 1 beauty/myDevDir v1.0.1 yes
rem �ֱ��ʾ����Ʒ�ߡ�����Ŀ¼���汾�š��Զ�ˢ��

rem ѡ���Ʒ������
echo =============== ��Ʒ�� ====================
echo    1. ����
echo    2. �ҵ�
echo    3. ˯��
echo    4. ����
echo    5. �Ƶ�
echo    0. ����
echo ===========================================
if not "%1"=="" (
    set line=%1
    goto select_line2
)
:select_line
set /p line=��ѡ���Ʒ��: 
:select_line2
if "%line%"=="" goto :select_line
if %line%==1 (
    set titl=%titl% - ����
    set base_dir=beauty
) else if %line%==2 (
    set titl=%titl% - �ҵ�
    set base_dir=household
) else if %line%==3 (
    set titl=%titl% - ˯��
    set base_dir=sleep
) else if %line%==4 (
    set titl=%titl% - ����
    set base_dir=health
) else if %line%==5 (
    set titl=%titl% - ��������
    set base_dir=hotel
) else if %line%==0 (
    set titl=%titl% - ����
    set base_dir=other
) else (
    echo ѡ������
    goto select_line
)

title %titl%

rem ѡ���豸����
echo ================ �豸 =====================
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
set /p device=��ѡ���豸: 
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
    echo ѡ������
    goto :select_device
)
set base_dir=%base_dir%/%dev_path%/
:select_device2
title %titl%

rem ����汾������
if not "%3"=="" (
    set version=%3
) else (
    set /p version=������汾�ţ�Ĭ��v1.0.1��: 
)
if "%version%"=="" set version=v1.0.1
set titl=%titl% - version: %version%
title %titl%
cls

:select_work
rem ѡ����ģʽ����
echo =============== ����ģʽ ==================
echo    1. ���п���������ִ���Զ�������
echo    2. Ԥ��������Ŀ����zip����
echo    3. ��ʼ����Ŀ���½���ά��������Ŀʱ�����ô˹��ܳ�ʼ����
echo    4. �ύԴ����SVN
echo    5. Ԥ���������ļ�����zip����
echo    9. ���������ļ�����������
echo ===========================================
set /p work=��ѡ����ģʽ��Ĭ��1��: 
if "%work%"=="" set work=1

rem �����Զ�ˢ��
set autorefresh=%4
if "%autorefresh%"=="" set autorefresh=yes

rem ִ�й�����
if %work%==1 (
    echo ��ʼ�Զ�����...
    start runVirtualApp
) else if %work%==2 (
    echo ��ʼԤ������Ŀ...
) else if %work%==3 (
    echo ��ʼ��ʼ����Ŀ...
    rem set pa=%cd%
    rem cd %base_dir%
    rem TortoiseProc /command:add /path:"./"
    rem TortoiseProc /command:ignore /path:"static*vm"
    rem cd %pa%
) else if %work%==4 (
    echo �����ύԴ��...
    TortoiseProc /command:commit /path:"%base_dir%"
    goto END
) else if %work%==5 (
    echo ��ʼԤ���������ļ�...
) else if %work%==9 (
    set /p surework=ȷ��Ҫ���������ļ���yes/no: 
    if !surework!==yes (
        echo ��ʼ���������ļ�...
    ) else (
        goto END
    )
)
gulp --work %work% --path %base_dir% --ver %version% --autorefresh %autorefresh% --title "%titl%"

:END
rem ��������ת��ѡ����ģʽ����
goto select_work

pause