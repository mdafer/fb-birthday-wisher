@ECHO OFF
ECHO Deleting old Docs
rmdir Docs /s /q
ECHO Generating Docs for Models
CALL jsdoc README.md models controllers
ren out Docs
ECHO Done
PAUSE