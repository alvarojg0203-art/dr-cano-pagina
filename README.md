# Instituto de Cirugía Dr. Luis Manuel Cano — Sitio web

Sitio informativo de una sola página (HTML + CSS + JavaScript, sin dependencias ni compilación).

## Ver el sitio

Abre `index.html` en el navegador, o sírvelo localmente:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

Se puede publicar tal cual en GitHub Pages, Netlify o Vercel.

## Secciones

- Barra superior con teléfono, horario y aviso de urgencias 24/7
- Menú fijo con versión móvil (hamburguesa)
- Portada con tarjeta del doctor, beneficios y cifras animadas
- Franja de respaldo/convenios en movimiento
- Sobre el doctor: semblanza, cita y trayectoria
- Misión, visión y 6 objetivos del instituto
- Especialidades con filtro por categoría y ventana de detalle para cada procedimiento
- Por qué elegirnos
- Equipo de 5 profesionales (anestesiología, cirugía, medicina interna, nutrición y enfermería)
- Proceso del paciente en 4 pasos
- Instalaciones (galería)
- Testimonios en carrusel (automático, flechas, puntos y deslizamiento táctil)
- Preguntas frecuentes (acordeón)
- Contacto con formulario que envía la solicitud por WhatsApp
- Botón flotante de WhatsApp y botón para volver arriba

## Datos que hay que reemplazar antes de publicar

Todo lo siguiente es **contenido de ejemplo** y debe confirmarse con el doctor:

| Dato | Dónde |
|------|-------|
| Teléfono `(000) 000 0000` / `tel:+520000000000` | `index.html` (barra superior, contacto, footer) |
| Número de WhatsApp `520000000000` | `index.html` (botones) y `js/main.js` (`WHATSAPP`) |
| Dirección, correo y horarios | `index.html` (sección contacto y footer) |
| Cédulas profesionales `0000000` | `index.html` (footer) |
| Años de experiencia, número de cirugías, % de satisfacción | `index.html` (atributos `data-count`) |
| Formación, certificaciones y especialidades | `index.html` (sección "Conoce al doctor" y "Especialidades") |
| Misión, visión y objetivos | `index.html` (sección `#mision`) — redacción propuesta, validar con el doctor |
| Equipo (nombres, cargos, descripciones) | `index.html` (sección `#equipo`) — **nombres inventados**; sustituir por el personal real. Para fotos, cambiar `<span class="member__initials">` por `<img>` |
| Testimonios | `index.html` — son textos de muestra; sustituir por opiniones reales con autorización de los pacientes |
| Fotografía del doctor | Reemplazar la ilustración en `.doctor-card__photo` por `<img src="assets/doctor.jpg" alt="Dr. Luis Manuel Cano">` |
| Fotos de instalaciones | Sustituir los fondos `.gallery__art` por imágenes reales |
| Mapa | Reemplazar el bloque `.map` por el `<iframe>` de Google Maps del consultorio |
| Redes sociales | Enlaces `href="#"` del footer |

## Estructura

```
index.html        Página principal
css/styles.css    Estilos (paleta azul marino / turquesa / dorado)
js/main.js        Menú, animaciones, filtros, modal, carrusel y formulario
assets/favicon.svg
```
