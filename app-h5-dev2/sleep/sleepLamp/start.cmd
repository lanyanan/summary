@echo off
rem   sleep
rem ============== ��Ŀ���� ===================
rem �汾��
set version=v1.0.1
rem �Զ�ˢ���������yes/no��
set autorefresh=yes
rem ===========================================
set pa=%cd%
cd ../../
:redo
cmd /c start.cmd 3 %pa% %version% %autorefresh%
pause
goto redo
