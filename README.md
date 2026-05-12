# AeroPlan — DJI Mission Planner

Planificador web de misiones fotogramétricas para drones DJI.  
Exporta KMZ compatible con **DJI Fly** sin necesidad de API Key de Google Maps.

### Drones soportados
- DJI Air 3S (12MP / 50MP)
- DJI Air 3 (12MP / 48MP)
- DJI Mini 4 Pro / Mini 3 Pro
- DJI Mavic 3 Pro (Hasselblad)
- DJI Mavic 4 Pro (Hasselblad / Tele 168mm)
- Cualquier drone (modo manual)

### Modos de misión
- **Foto por WP** — disparo en waypoint
- **Ruta + Intervalo** — timed shot, recomendado para Air 3S
- **Perimetral** — inspección de borde

### Características
- Mapa satelital Google Maps sin API Key (Leaflet + tiles XYZ)
- Trayectoria recta (`useStraightLine=1`) — elimina curvas del Air 3S
- Subdivisión de tramos y punto de vuelta
- Exportación KMZ/WPMZ compatible FlightHub 2
- Importación KML/KMZ/GeoJSON
- Guardado de misiones en archivo `.AEP`
- Instalable como PWA (sin App Store)

---

## 🚀 Publicar en GitHub Pages (5 minutos)

### Paso 1 — Crear repositorio en GitHub

1. Ve a [github.com](https://github.com) e inicia sesión (crea cuenta si no tienes).
2. Clic en **"New repository"**.
3. Nombre: `aeroplan` (o el que prefieras).
4. Selecciona **Public**.
5. Clic en **"Create repository"**.

### Paso 2 — Subir los archivos

En la página del repositorio recién creado, clic en **"uploading an existing file"** y sube estos archivos **manteniendo la estructura de carpetas**:

```
index.html          ← archivo principal
manifest.json       ← configuración PWA
sw.js               ← service worker
icons/
  icon-192.png      ← ícono de la app
  icon-512.png      ← ícono de la app
```

Clic en **"Commit changes"**.

### Paso 3 — Activar GitHub Pages

1. En el repositorio, ve a **Settings** → **Pages** (menú izquierdo).
2. En **"Source"**, selecciona **"Deploy from a branch"**.
3. Branch: **main** / Folder: **/ (root)**.
4. Clic en **Save**.
5. Espera ~2 minutos.

Tu URL será: **`https://TU_USUARIO.github.io/aeroplan/`**

---

## 📱 Instalar como app (PWA)

### En Android (Chrome)
1. Abre la URL en Chrome.
2. Toca el menú ⋮ → **"Instalar app"** o **"Agregar a pantalla de inicio"**.
3. Confirma — aparece el ícono en el escritorio.

### En iOS (Safari)
1. Abre la URL en Safari.
2. Toca el botón compartir □↑ → **"Agregar a pantalla de inicio"**.
3. Confirma.

### En Windows/Mac (Chrome o Edge)
1. Abre la URL.
2. En la barra de direcciones aparece un ícono de instalar ⊕.
3. Clic → **"Instalar"**.
4. La app abre en su propia ventana sin barra del navegador.

---

## 🔄 Actualizar la app

Solo sube el nuevo `index.html` al repositorio (arrastra y suelta → Commit).  
GitHub Pages publica en ~1 minuto. Los usuarios ven la versión nueva en su próxima visita.

---

## Dominio personalizado (opcional)

Si tienes un dominio propio (ej. `aeroplan.tuempresa.com`):

1. En el repositorio → **Settings** → **Pages** → **Custom domain**.
2. Escribe tu dominio y guarda.
3. En tu proveedor DNS agrega un registro CNAME:
   - Nombre: `aeroplan`
   - Apunta a: `tu_usuario.github.io`

GitHub agrega HTTPS automáticamente (Let's Encrypt).

---

## Alternativa: Netlify (aún más simple)

1. Ve a [netlify.com](https://netlify.com) → Sign up gratis.
2. Arrastra la carpeta completa del proyecto al área de deploy.
3. Obtienes URL tipo `aeroplan-abc123.netlify.app` en 30 segundos.
4. Puedes personalizar el subdominio a `aeroplan.netlify.app` en Settings.
