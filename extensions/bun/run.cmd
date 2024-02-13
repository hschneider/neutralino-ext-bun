set BUN_INSTALL="%1\extensions\bun\_runtime"

if exist "%1\extensions\bun\main.js" (
    %BUN_INSTALL%\bin\bun run --inspect "%1\extensions\bun\main.js" %2=%3 %4=%5 %5=%6
) else (
    "%1\extensions\bun\main-app.exe" %2=%3 %4=%5 %5=%6
)
