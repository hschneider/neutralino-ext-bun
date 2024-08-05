@echo off
set BUN_INSTALL=%1\extensions\bun\_runtime

if exist "%1\extensions\bun\main.js" (
    "%BUN_INSTALL%\bin\bun.exe" run "%1\extensions\bun\main.js"
) else (
    "%1\extensions\bun\main-app.exe"
)
