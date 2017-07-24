@echo off
rem   household
rem ============== ��Ŀ���� ===================
rem �汾��
set version=v1.5.8
rem �Զ�ˢ����������yes/no��
set autorefresh=yes
rem ===========================================
set pa=%cd%
cd ../../
:redo
cmd /c start.cmd 2 %pa% %version% %autorefresh%
pause
goto redo
