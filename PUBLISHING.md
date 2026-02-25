# 🚀 Guía de Publicación y Deploy

Este documento detalla el proceso paso a paso para versionar y publicar nuevas actualizaciones de **VTEX Landing Generator** en GitHub Pages.

---

## 📋 Requisitos previos

Para poder publicar una nueva versión necesitas:
1. Permisos de escritura en el repositorio.
2. Tener tu rama local sincronizada con `main` (o la rama principal de release).
3. Asegurarte de que el proyecto compila correctamente en local (`npm run build`).

---

## 🔄 Flujo de Versionado (SemVer)

El proyecto utiliza el estándar de **Semantic Versioning** (SemVer: `Mayor.Menor.Parche`). Tenemos scripts configurados en el `package.json` para facilitar la creación de tags y la actualización del número de versión.

### 1. Parche (Patch) - `v1.0.x`
Usa este comando cuando realizaste **correcciones de errores** (bug fixes) que no rompen la compatibilidad hacia atrás.
```bash
npm run version:patch
```

### 2. Menor (Minor) - `v1.x.0`
Usa este comando cuando agregaste **nuevas funcionalidades** (features) de manera retrocompatible.
```bash
npm run version:minor
```

### 3. Mayor (Major) - `vX.0.0`
Usa este comando cuando realizaste **cambios mayores** que rompen la compatibilidad (breaking changes) o rediseños profundos de la arquitectura.
```bash
npm run version:major
```

> **📌 Nota:** Al ejecutar cualquiera de estos scripts, npm automáticamente:
> 1. Actualiza la versión en `package.json`.
> 2. Crea un _commit_ de versión (ej: `1.1.2`).
> 3. Crea un _tag_ local en git con esa versión.

---

## 🚀 Publicación y Deploy a GitHub Pages

Una vez que has generado la nueva versión localmente, el siguiente paso es subir los cambios y los tags a GitHub. El deploy a GitHub Pages suele estar automatizado mediante **GitHub Actions** al pushear a la rama principal, o bien configurado para leer directamente desde la rama y generar el build allí.

Sigue estos pasos para publicar:

### Paso 1: Subir los commits a la rama principal (main)
Asegúrate de estar en tu rama principal y ejecuta:
```bash
git push origin main
```
*(Si usas otra rama principal, reemplaza `main` por el nombre correspondiente).*

### Paso 2: Subir los Tags de versión a GitHub
Este es el paso más importante. Sin los tags, GitHub no registrará oficialmente el "Release" en la interfaz. El _script_ ejecutado anteriormente ya creó el tag en tu máquina, ahora debes empujarlo al servidor:
```bash
git push --tags
```

### Paso 3: (Opcional) Crear el Release oficial en GitHub
Si quieres dejar un _Changelog_ claro para los usuarios:
1. Ve a la pestaña **Tags** o **Releases** en tu repositorio de GitHub.
2. Busca el tag que acabas de subir (ej. `v1.1.2`).
3. Haz clic en **"Create release from tag"**.
4. Agrega un título (ej: `Release v1.1.2: Soporte para nuevos banners`).
5. Puedes hacer clic en **"Generate release notes"** para que GitHub arme un resumen automático de los Pull Requests mergeados.
6. Publica el Release.

---

## 🌐 Verificando el Deploy

Si el repositorio está configurado con GitHub Pages, los cambios deberían reflejarse automáticamente en cuestión de minutos.

1. Ve a la pestaña **Actions** en GitHub. Deberías ver un _workflow_ ejecutándose llamado "pages-build-deployment" (o el nombre de tu action personalizada).
2. Espera a que termine con un check verde ✅.
3. Visita la URL de producción: `https://emanueleelias.github.io/vtex-landing-generator/`
4. Refresca la página en tu navegador (usa `Ctrl + F5` o `Cmd + Shift + R` para limpiar la caché y asegurarte de ver la última versión).

---

## 🚨 Troubleshooting rápido

- **Ejecuté el script de versión pero me da error de "Git working directory not clean"**: 
  NPM requiere que no haya archivos sin comitear antes de correr un comando de versión. Haz `git commit` de tus cambios antes de correr `npm run version:patch/minor/major`.
  
- **Pusheé a main pero los cambios no se ven en GitHub Pages**:
  Revisa la pestaña "Actions". Puede que el build fallara por un error de sintaxis en el código original que no notaste en desarrollo o que no enviaste los tags (`git push --tags`).
