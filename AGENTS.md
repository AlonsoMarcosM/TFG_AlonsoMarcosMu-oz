# AGENTS.md

## Objetivo

Mantener el TFG ejecutable con backend R real en local y navegable como publicación estática de portfolio.

## Reglas

- La configuración `production` conserva el backend real; la configuración `demo` usa exclusivamente `demo.interceptor.ts`.
- La publicación no ejecuta R, no sube archivos y no persiste usuarios.
- Toda ruta HTTP nueva debe implementarse también en el interceptor o fallar explícitamente con 404.
- No introducir credenciales ni tokens en el repositorio.
- Actualizar `docs/portfolio_deployment.md` y `portfolio.json` cuando cambie la URL pública.

## Verificación mínima

```powershell
cd .\proyecto
npm ci
npm test -- --watch=false --browsers=ChromeHeadless
npm run build -- --configuration demo
```
