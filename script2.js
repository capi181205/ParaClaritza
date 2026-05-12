// =========================================================
// CONFIGURACION
// =========================================================
const TOTAL_FOTOS = 43;

const captions = [
    "El día que mi suerte cambió para siempre 💕",
    "Con esas mascarillas hasta guapos quedamos 😂",
    "Spa en casa, nuestra versión premium 🧖‍♀️🧖‍♂️",
    "Juntos incluso para las tonterías más bonitas 😜",
    "Mi favorito siempre serás tú, siempre 🥰",
    "Abrazarte es mi lugar más seguro en el mundo 💞",
    "Siempre juntos, siempre nosotros ❤️",
    "El amor se nota hasta en las fotos 😍",
    "Mi cómplice, mi mejor amiga, mi vida 💑",
    "Sonriendo porque estamos juntos, así de simple 😁",
    "Levis y amor, la combinación perfecta 👌",
    "En la oscuridad, tú eres toda mi luz 🌟",
    "Incluso aquí te ves increíble... y yo no puedo dejar de verte 🥵",
    "Elegantes cuando queremos 💃🕺",
    "Esa sonrisa es mi debilidad, mi amor ✨",
    "Ese beso que me robaste y ya no te lo pedí de vuelta 😘",
    "Cubrebocas y todo, sigues siendo la más guapa 😷❤️",
    "Familia desde siempre, familia para siempre 👨‍👩‍👧",
    "De azul y con toda la actitud del mundo 😎",
    "Juntos hasta en los Testigos de Jehová 😂",
    "Tú y yo contra el mundo, y ganamos 🌍",
    "Esa sonrisa tuya me tiene completamente loco 😁💕",
    "El sol nos quedó chico ese día ☀️",
    "Recostados y felices, así quiero estar siempre contigo 😌",
    "Haciendo caras porque somos así de perfectos 🤪",
    "Otro día hermoso a tu lado 🌸",
    "Entrenando duro... pero yo solo pienso en lo que viene después del gym 🔥",
    "De noche todo es más romántico contigo 🌙",
    "Selfie mode: activado. Resultado: perfectos 📸",
    "Cuando te pones chistosa y te amo todavía más 😂💕",
    "Hasta al dentista te acompañé porque eso hacen los que aman 🦷😷",
    "Chivas en el corazón y tú también, para siempre 🔴⚪",
    "Mi equipo favorito siempre será el nuestro ❤️",
    "Paseando y enamorándome más de ti en cada paso 🚗💨",
    "Esa sonrisa me desarma siempre, sin excepción 😊",
    "En el parque, como si fuera nuestra primera cita 🌳",
    "Columpiándonos y sin una sola preocupación 🌙",
    "Con alas porque juntos podemos volar 🕊️",
    "Otro selfie porque nos vemos demasiado bien 😏",
    "Llevas vida dentro de ti, y te ves más hermosa que nunca 🤰💙",
    "Cuidándote en cada momento, porque eso hacen los que aman 💙",
    "Esa noche roja tan especial que no olvidaré 🔴✨",
    "Construyendo nuestro futuro juntos, ladrillo a ladrillo 💪🏋️",
];

const SEG_PRIMERA = 9;
const SEG_SEGUNDA = 78;
const FECHA_INICIO = new Date(2025, 4, 3, 0, 0, 0);
const FECHA_PARTO = new Date(2026, 6, 24, 0, 0, 0);
const PIXEL_TRANSPARENTE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

const MENSAJE = `Claritza:\n\nHace poco más de un año, el 3 de mayo de 2025, la vida me dio el mejor regalo que pudo haberme dado: conocerte.\n\nJamás imaginé que en tan poco tiempo construiríamos tanto juntos. Y aquí estamos.\n\nHoy me llenas de orgullo verte llevar a nuestro bebé con tanta valentía y amor. Eres la mujer más fuerte y hermosa que conozco.\n\nEduardo va a tener a la mejor mamá del mundo, y yo ya soy el hombre más afortunado porque ahora tengo a mi niño y a la mujer que más amo.\n\nGracias por elegirme. Gracias por quedarte. Gracias por todo lo que viene.\n\nTe amo, Claritza. Hoy y siempre.`;

function extFoto(i) {
    if (i <= 22) return 'jpeg';
    if (i <= 39) return 'jpg';
    return 'jpeg';
}

// =========================================================
// DOM & AUDIO
// =========================================================
const audioBano = document.getElementById('audioBano');
const audioJuanes = document.getElementById('audioJuanes');
const cursorEl = document.getElementById('cursor');
const preloader = document.getElementById('preloader');
const loaderFill = document.getElementById('loader-fill');
const loaderPercent = document.getElementById('loader-percent');

function prepararFallbacksImagenes() {
    const cover = document.querySelector('.player-cover');
    if (!cover) return;
    let coverLimpio = false;

    function limpiarCover() {
        if (coverLimpio) return;
        coverLimpio = true;
        const fallback = document.createElement('div');
        fallback.className = 'player-cover player-cover-fallback';
        fallback.textContent = '♪';
        cover.replaceWith(fallback);
    }

    cover.addEventListener('error', limpiarCover, { once: true });
    if (cover.complete && cover.naturalWidth === 0) limpiarCover();
}

// =========================================================
// MICROINTERACCIONES
// =========================================================
let audioCtx = null;
let orientacionActiva = false;

function vibrar(patron = 18) {
    if ('vibrate' in navigator) navigator.vibrate(patron);
}

function tonoSuave(freq = 660, duracion = 0.075, volumen = 0.035) {
    try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        if (!audioCtx) audioCtx = new Ctx();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(volumen, audioCtx.currentTime + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duracion);
        osc.connect(gain).connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duracion + 0.02);
    } catch (_) {
        // El navegador puede bloquear audio hasta que exista una interaccion.
    }
}

function feedbackCambio() {
    tonoSuave(740, 0.055, 0.022);
    vibrar(8);
}

function solicitarOrientacionSiHaceFalta() {
    if (orientacionActiva) return;
    orientacionActiva = true;

    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission().catch(() => {});
    }
}

// =========================================================
// PRELOADER
// =========================================================
function iniciarPreloader() {
    const recursos = ['portada2.jpg'];
    for (let i = 1; i <= TOTAL_FOTOS; i++) recursos.push(`foto${i}.${extFoto(i)}`);

    let cargados = 0;
    let cerrado = false;
    const inicio = performance.now();
    const minimo = 950;

    function pintar() {
        const pct = recursos.length ? Math.round((cargados / recursos.length) * 100) : 100;
        loaderFill.style.width = `${pct}%`;
        loaderPercent.textContent = `${pct}%`;
    }

    function cerrar() {
        if (cerrado) return;
        cerrado = true;
        const espera = Math.max(0, minimo - (performance.now() - inicio));
        setTimeout(() => preloader.classList.add('oculto'), espera);
    }

    function marcar() {
        cargados += 1;
        pintar();
        if (cargados >= recursos.length) cerrar();
    }

    recursos.forEach(src => {
        const img = new Image();
        img.onload = marcar;
        img.onerror = marcar;
        img.src = src;
    });

    pintar();
    setTimeout(cerrar, 5200);
}

// =========================================================
// CURSOR
// =========================================================
document.addEventListener('mousemove', e => {
    cursorEl.style.left = `${e.clientX}px`;
    cursorEl.style.top = `${e.clientY}px`;
});

// =========================================================
// PARTICULAS DE FONDO
// =========================================================
const emojisP = ['❤️','💕','✨','🌹','💫','🌸','💖'];
const particlesC = document.getElementById('particles');
let partInt;

function crearParticula() {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.textContent = emojisP[Math.floor(Math.random() * emojisP.length)];
    p.style.left = `${Math.random() * 100}vw`;
    p.style.fontSize = `${8 + Math.random() * 12}px`;
    const dur = 7 + Math.random() * 9;
    p.style.animationDuration = `${dur}s`;
    p.style.animationDelay = `${Math.random() * 4}s`;
    particlesC.appendChild(p);
    setTimeout(() => p.remove(), (dur + 4) * 1000);
}

partInt = setInterval(crearParticula, 900);
for (let i = 0; i < 8; i++) crearParticula();

// =========================================================
// SISTEMA DE SECCIONES
// =========================================================
const IDS_SECCIONES = ['s0','s1','s2','s3','s4','s5','s6','s7','s8'];
let seccionActual = 0;
let cambiando = false;
let inicializadas = { s1:false, s2:false, s3:false, s4:false, s5:false, s6:false, s7:false };

function prepararSeccionInicial() {
    const s0 = document.getElementById('s0');
    s0.style.display = 'flex';
    s0.style.opacity = '1';
    s0.style.transform = 'translateY(0)';
    s0.classList.add('activa');
    actualizarFlechas();
    actualizarContadorAmor();
    setInterval(actualizarContadorAmor, 60000);
}

function mostrarSeccion(nuevo, direccion = 'abajo') {
    if (cambiando || nuevo === seccionActual) return;
    if (nuevo < 0 || nuevo >= IDS_SECCIONES.length) return;
    cambiando = true;

    const actual = document.getElementById(IDS_SECCIONES[seccionActual]);
    const destino = document.getElementById(IDS_SECCIONES[nuevo]);
    const clsSalida = direccion === 'abajo' ? 'saliendo-arriba' : 'saliendo-abajo';

    gestionarAudioAlCambiar(IDS_SECCIONES[nuevo]);
    actual.classList.add(clsSalida);

    setTimeout(() => {
        actual.classList.remove('activa', clsSalida);
        actual.style.display = 'none';

        if (IDS_SECCIONES[nuevo] === 's4') {
            document.body.classList.remove('scroll-activo');
            document.body.classList.add('carta-activa');
            document.body.style.overflow = 'hidden';
            destino.style.position = '';
            destino.style.minHeight = '';
            destino.scrollTop = 0;
            actualizarProgresoCarta();
        } else {
            document.body.classList.remove('scroll-activo');
            document.body.classList.remove('carta-activa');
            document.body.style.overflow = 'hidden';
            destino.style.position = '';
        }

        destino.style.display = 'flex';
        destino.style.opacity = '0';
        destino.style.transform = direccion === 'abajo' ? 'translateY(30px)' : 'translateY(-30px)';

        requestAnimationFrame(() => requestAnimationFrame(() => {
            destino.style.transition = 'opacity 0.75s ease, transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94)';
            destino.style.opacity = '1';
            destino.style.transform = 'translateY(0)';
            destino.classList.add('activa');

            seccionActual = nuevo;
            actualizarNavDots();
            actualizarFlechas();
            feedbackCambio();
            cambiando = false;
            onEntrarSeccion(IDS_SECCIONES[nuevo]);
        }));
    }, 600);
}

function gestionarAudioAlCambiar(idDestino) {
    if (idDestino !== 's1') audioBano.pause();
    if (idDestino !== 's2' && idDestino !== 's8') audioJuanes.pause();
}

function onEntrarSeccion(id) {
    if (id === 's1' && !inicializadas.s1) { inicializadas.s1 = true; iniciarBroma(); }
    if (id === 's2' && !inicializadas.s2) { inicializadas.s2 = true; iniciarSlideshow(); }
    if (id === 's3' && !inicializadas.s3) { inicializadas.s3 = true; iniciarBebe(); vibrar([20, 35, 20]); }
    if (id === 's4' && !inicializadas.s4) { inicializadas.s4 = true; iniciarCarta(); }
    if (id === 's5' && !inicializadas.s5) { inicializadas.s5 = true; iniciarCuenta(); }
    if (id === 's6' && !inicializadas.s6) { inicializadas.s6 = true; vibrar([12, 25, 12]); tonoSuave(880, 0.1, 0.028); }
    if (id === 's7' && !inicializadas.s7) { inicializadas.s7 = true; iniciarCelebracion(); }
    if (id === 's8') iniciarFinal();
}

function actualizarNavDots() {
    document.querySelectorAll('.nav-dot').forEach((d, i) => {
        d.classList.toggle('active', i === seccionActual);
    });
}

const navLabel = document.getElementById('nav-label');
let navLabelTimer = null;

function mostrarNavLabel(texto) {
    navLabel.textContent = texto;
    navLabel.classList.add('visible');
    clearTimeout(navLabelTimer);
    navLabelTimer = setTimeout(() => navLabel.classList.remove('visible'), 1200);
}

document.querySelectorAll('.nav-dot').forEach(d => {
    d.addEventListener('mouseenter', () => mostrarNavLabel(d.dataset.label));
    d.addEventListener('focus', () => mostrarNavLabel(d.dataset.label));
    d.addEventListener('click', () => {
        const idx = +d.dataset.seccion;
        mostrarNavLabel(d.dataset.label);
        mostrarSeccion(idx, idx > seccionActual ? 'abajo' : 'arriba');
    });
});

const btnUp = document.getElementById('nav-up');
const btnDown = document.getElementById('nav-down');

btnUp.addEventListener('click', () => mostrarSeccion(seccionActual - 1, 'arriba'));
btnDown.addEventListener('click', () => mostrarSeccion(seccionActual + 1, 'abajo'));

function actualizarFlechas() {
    btnUp.classList.toggle('oculta', seccionActual === 0);
    btnDown.classList.toggle('oculta', seccionActual === IDS_SECCIONES.length - 1);
}

let touchInicioY = 0;
document.addEventListener('touchstart', e => {
    touchInicioY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', e => {
    const diff = touchInicioY - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 55) {
        if (seccionActual === 2 || seccionActual === 4) return;
        mostrarSeccion(seccionActual + (diff > 0 ? 1 : -1), diff > 0 ? 'abajo' : 'arriba');
    }
}, { passive: true });

document.addEventListener('keydown', e => {
    if (seccionActual === 4 && ['ArrowDown','ArrowUp','PageDown','PageUp'].includes(e.key)) {
        const carta = document.getElementById('s4');
        const sentido = e.key === 'ArrowDown' || e.key === 'PageDown' ? 1 : -1;
        const salto = e.key.startsWith('Page') ? carta.clientHeight * 0.7 : 82;
        carta.scrollBy({ top: sentido * salto, behavior: 'smooth' });
        return;
    }
    if (e.key === 'ArrowDown' || e.key === 'PageDown') mostrarSeccion(seccionActual + 1, 'abajo');
    if (e.key === 'ArrowUp' || e.key === 'PageUp') mostrarSeccion(seccionActual - 1, 'arriba');
});

document.getElementById('btn-s0').addEventListener('click', () => {
    clearInterval(partInt);
    solicitarOrientacionSiHaceFalta();
    tonoSuave(660, 0.08, 0.03);
    mostrarSeccion(1, 'abajo');
});

document.getElementById('btn-s2').addEventListener('click', () => {
    audioJuanes.pause();
    mostrarSeccion(3, 'abajo');
});

// =========================================================
// S0 CONTADOR Y EASTER EGG
// =========================================================
function actualizarContadorAmor() {
    const el = document.getElementById('contador-amor');
    const diff = Math.max(0, Date.now() - FECHA_INICIO.getTime());
    const dias = Math.floor(diff / 86400000);
    const horas = Math.floor((diff % 86400000) / 3600000);
    el.textContent = `Llevamos ${dias} días y ${horas} horas juntos`;
}

let tapsCorazon = 0;
let tapsTimer = null;
document.getElementById('corazon-secreto').addEventListener('click', () => {
    tapsCorazon += 1;
    vibrar(10);
    tonoSuave(520 + tapsCorazon * 45, 0.055, 0.02);
    clearTimeout(tapsTimer);
    tapsTimer = setTimeout(() => { tapsCorazon = 0; }, 1600);

    if (tapsCorazon >= 5) {
        tapsCorazon = 0;
        const nota = document.getElementById('secret-note');
        nota.classList.remove('oculto');
        nota.classList.add('visible');
        lanzarConfeti(18);
        vibrar([18, 40, 18, 40, 18]);
    }
});

// =========================================================
// S1 BROMA
// =========================================================
function iniciarBroma() {
    const label = document.getElementById('broma-label');
    const foto = document.getElementById('foto-broma');
    const reaccion = document.getElementById('reaccion');
    const fill = document.getElementById('barra-bano-fill');
    const thumb = document.getElementById('barra-bano-thumb');
    const wrap = document.getElementById('barra-bano-wrap');
    const hint = document.getElementById('broma-hint');
    const tiempoEl = document.getElementById('audio-tiempo');
    const durEl = document.getElementById('audio-duracion');
    const btnPP = document.getElementById('audio-playpause');

    audioBano.currentTime = SEG_PRIMERA;
    audioBano.play().catch(() => {
        hint.textContent = 'Toca play si el navegador pausó el audio';
        btnPP.innerHTML = '<i class="fas fa-play"></i>';
    });

    let segundaYa = false;
    let arrastrando = false;
    let fallbackUsado = false;

    foto.addEventListener('error', () => {
        foto.src = PIXEL_TRANSPARENTE;
        foto.alt = '';
        foto.classList.add('foto-fallback');
    }, { once: true });

    function fmt(s) {
        return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
    }

    function actualizarBarra() {
        if (arrastrando) return;
        const dur = audioBano.duration || 1;
        const pct = (audioBano.currentTime / dur) * 100;
        fill.style.width = `${pct}%`;
        thumb.style.left = `${pct}%`;
        tiempoEl.textContent = fmt(audioBano.currentTime);
        if (audioBano.duration) durEl.textContent = fmt(audioBano.duration);
        if (audioBano.currentTime >= SEG_SEGUNDA && !segundaYa) {
            segundaYa = true;
            mostrarSegundaFrase();
        }
    }

    function fallbackAudio() {
        if (fallbackUsado || segundaYa) return;
        fallbackUsado = true;
        hint.textContent = 'Audio pendiente, continuo con la sorpresa';
        setTimeout(() => {
            if (!segundaYa) {
                segundaYa = true;
                mostrarSegundaFrase();
            }
        }, 2600);
    }

    audioBano.addEventListener('timeupdate', actualizarBarra);
    audioBano.addEventListener('error', fallbackAudio, { once: true });
    const watchdogAudio = setTimeout(() => {
        if (!audioBano.duration && audioBano.readyState === 0) fallbackAudio();
    }, 6500);

    function getPct(e) {
        const r = wrap.getBoundingClientRect();
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        return Math.max(0, Math.min(1, (x - r.left) / r.width));
    }

    function seekTo(pct) {
        if (!audioBano.duration) return;
        audioBano.currentTime = pct * audioBano.duration;
        fill.style.width = `${pct * 100}%`;
        thumb.style.left = `${pct * 100}%`;
        tiempoEl.textContent = fmt(audioBano.currentTime);
    }

    wrap.addEventListener('mousedown', e => { arrastrando = true; seekTo(getPct(e)); });
    wrap.addEventListener('touchstart', e => { arrastrando = true; seekTo(getPct(e)); }, { passive: true });
    document.addEventListener('mousemove', e => { if (arrastrando) seekTo(getPct(e)); });
    document.addEventListener('touchmove', e => { if (arrastrando) seekTo(getPct(e)); }, { passive: true });
    document.addEventListener('mouseup', () => { arrastrando = false; });
    document.addEventListener('touchend', () => { arrastrando = false; });

    btnPP.addEventListener('click', () => {
        if (audioBano.paused) {
            audioBano.play().then(() => {
                btnPP.innerHTML = '<i class="fas fa-pause"></i>';
            }).catch(() => {});
        } else {
            audioBano.pause();
            btnPP.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    setTimeout(() => {
        foto.classList.add('shake');
        reaccion.textContent = '😍';
        reaccion.classList.add('visible');
        label.textContent = 'Cuando yo te vi...';
        hint.textContent = '🎵 "se me paró el corazón"';
        tonoSuave(720, 0.08, 0.03);
        vibrar([15, 25, 15]);
        setTimeout(() => foto.classList.remove('shake'), 600);
    }, 1500);

    function mostrarSegundaFrase() {
        label.textContent = '...y si te vuelvo a ver';
        hint.textContent = '🎵 "se me vuelve a parar el corazón"';
        reaccion.textContent = '😵‍💫';
        foto.classList.add('shake');
        tonoSuave(880, 0.1, 0.03);
        vibrar([25, 45, 25]);
        setTimeout(() => foto.classList.remove('shake'), 600);

        setTimeout(() => {
            clearTimeout(watchdogAudio);
            audioBano.pause();
            audioBano.removeEventListener('timeupdate', actualizarBarra);
            label.textContent = '¡Ahora en serio, te amo! 💕';
            hint.textContent = '';
            setTimeout(() => mostrarSeccion(2, 'abajo'), 1800);
        }, 4000);
    }
}

// =========================================================
// S2 SLIDESHOW
// =========================================================
let slideActual = 0;
let transicionando = false;

function iniciarSlideshow() {
    const track = document.getElementById('slides-track');

    for (let i = 1; i <= TOTAL_FOTOS; i++) {
        const src = `foto${i}.${extFoto(i)}`;
        const slide = document.createElement('div');
        slide.classList.add('slide');
        slide.dataset.foto = src;
        if (i === 1) slide.classList.add('activa');

        const img = document.createElement('img');
        img.src = src;
        img.alt = `Foto ${i}`;
        img.loading = 'lazy';
        img.addEventListener('error', () => {
            img.style.display = 'none';
            slide.classList.add('slide-fallback');
        }, { once: true });

        const cap = document.createElement('div');
        cap.classList.add('slide-caption');
        cap.textContent = captions[i - 1] || '';

        slide.appendChild(img);
        slide.appendChild(cap);
        track.appendChild(slide);
    }

    actualizarContador();
    actualizarFondoSlide();
    audioJuanes.play().catch(() => {});

    const progWrap = document.getElementById('player-progress-wrap');
    const progBar = document.getElementById('barraJuanes');

    audioJuanes.addEventListener('timeupdate', () => {
        if (audioJuanes.duration) {
            progBar.style.width = `${(audioJuanes.currentTime / audioJuanes.duration) * 100}%`;
        }
    });

    audioJuanes.addEventListener('error', () => {
        document.querySelector('.player-artist').textContent = 'Copia juanes.mp3 para escucharla';
        document.getElementById('btnJuanes').innerHTML = '<i class="fas fa-play"></i>';
    }, { once: true });

    progWrap.addEventListener('click', e => {
        const r = progWrap.getBoundingClientRect();
        if (audioJuanes.duration) audioJuanes.currentTime = ((e.clientX - r.left) / r.width) * audioJuanes.duration;
    });

    document.getElementById('btn-prev').addEventListener('click', () => irASlide(slideActual - 1));
    document.getElementById('btn-next').addEventListener('click', () => irASlide(slideActual + 1));

    let tx = 0;
    track.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = tx - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) irASlide(slideActual + (diff > 0 ? 1 : -1));
    });

    track.addEventListener('mousemove', e => {
        const r = track.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * -14;
        const y = ((e.clientY - r.top) / r.height - 0.5) * -14;
        aplicarParallax(x, y);
    });

    track.addEventListener('mouseleave', () => aplicarParallax(0, 0));

    window.addEventListener('deviceorientation', e => {
        if (seccionActual !== 2) return;
        const x = Math.max(-12, Math.min(12, (e.gamma || 0) * -0.35));
        const y = Math.max(-12, Math.min(12, (e.beta || 0) * -0.18));
        aplicarParallax(x, y);
    });
}

function aplicarParallax(x, y) {
    const track = document.getElementById('slides-track');
    if (!track) return;
    track.style.setProperty('--px', `${x}px`);
    track.style.setProperty('--py', `${y}px`);
}

document.getElementById('btnJuanes').addEventListener('click', () => {
    const btn = document.getElementById('btnJuanes');
    if (audioJuanes.paused) {
        audioJuanes.play().then(() => {
            btn.innerHTML = '<i class="fas fa-pause"></i>';
        }).catch(() => {});
    } else {
        audioJuanes.pause();
        btn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

function irASlide(nuevo) {
    if (transicionando || nuevo < 0 || nuevo >= TOTAL_FOTOS) return;
    transicionando = true;
    aplicarParallax(0, 0);

    const slides = document.querySelectorAll('.slide');
    slides[slideActual].classList.remove('activa');
    slides[slideActual].classList.add('saliendo');

    setTimeout(() => {
        slides[slideActual].classList.remove('saliendo');
        slideActual = nuevo;
        slides[slideActual].classList.add('activa');
        actualizarContador();
        actualizarFondoSlide();
        transicionando = false;
        tonoSuave(620, 0.045, 0.018);
    }, 550);
}

function actualizarContador() {
    document.getElementById('slide-counter').textContent = `${slideActual + 1} / ${TOTAL_FOTOS}`;
    const pct = ((slideActual + 1) / TOTAL_FOTOS) * 100;
    document.getElementById('slide-progress-bar').style.width = `${pct}%`;
}

function actualizarFondoSlide() {
    const bg = document.getElementById('slide-blur-bg');
    const src = `foto${slideActual + 1}.${extFoto(slideActual + 1)}`;
    bg.style.backgroundImage = `linear-gradient(rgba(3,2,5,0.25), rgba(3,2,5,0.25)), url("${src}")`;
}

// =========================================================
// S3 BEBE
// =========================================================
const EMOJIS_BEBE = ['👶','💙','🍼','👣','🧸','⚽','🥊','🌟','💪','🏋️','🎀','🐻','🚼','👼','🌈'];

function iniciarBebe() {
    const cont = document.getElementById('bebe-emojis-fondo');

    function crearEmojiBebe() {
        const e = document.createElement('div');
        e.classList.add('bebe-emoji-flotante');
        e.textContent = EMOJIS_BEBE[Math.floor(Math.random() * EMOJIS_BEBE.length)];
        e.style.left = `${Math.random() * 100}vw`;
        e.style.fontSize = `${16 + Math.random() * 22}px`;
        const dur = 6 + Math.random() * 8;
        e.style.animationDuration = `${dur}s`;
        e.style.animationDelay = `${Math.random() * 3}s`;
        cont.appendChild(e);
        setTimeout(() => e.remove(), (dur + 3) * 1000);
    }

    for (let i = 0; i < 20; i++) crearEmojiBebe();
    setInterval(crearEmojiBebe, 600);
}

// =========================================================
// S4 CARTA
// =========================================================
function actualizarProgresoCarta() {
    const carta = document.getElementById('s4');
    const barra = document.getElementById('carta-scroll-progress');
    if (!carta || !barra) return;
    const max = carta.scrollHeight - carta.clientHeight;
    const pct = max > 0 ? (carta.scrollTop / max) * 100 : 0;
    barra.style.width = `${Math.max(0, Math.min(100, pct))}%`;
}

function iniciarCarta() {
    escribir(MENSAJE, 0, document.getElementById('maquina'), () => {
        const btn = document.getElementById('btn-s4');
        btn.classList.remove('oculto');
        btn.classList.add('visible');
        actualizarProgresoCarta();
    });
}

function escribir(texto, i, el, cb) {
    if (i < texto.length) {
        el.innerHTML += texto.charAt(i) === '\n' ? '<br>' : texto.charAt(i);
        if (i % 12 === 0) actualizarProgresoCarta();
        setTimeout(() => escribir(texto, i + 1, el, cb), 33);
    } else if (cb) {
        cb();
    }
}

document.getElementById('s4').addEventListener('scroll', actualizarProgresoCarta, { passive: true });
document.getElementById('btn-s4-prev').addEventListener('click', () => mostrarSeccion(3, 'arriba'));
document.getElementById('btn-s4').addEventListener('click', () => mostrarSeccion(5, 'abajo'));

// =========================================================
// S5 CUENTA REGRESIVA
// =========================================================
function iniciarCuenta() {
    function actualizar() {
        const diff = FECHA_PARTO - new Date();
        if (diff <= 0) {
            ['cnt-dias','cnt-horas','cnt-mins','cnt-segs'].forEach(id => {
                document.getElementById(id).textContent = '00';
            });
            return;
        }
        document.getElementById('cnt-dias').textContent = String(Math.floor(diff / 86400000)).padStart(2, '0');
        document.getElementById('cnt-horas').textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
        document.getElementById('cnt-mins').textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
        document.getElementById('cnt-segs').textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    }

    actualizar();
    setInterval(actualizar, 1000);
}

// =========================================================
// S7 CELEBRACION
// =========================================================
function iniciarCelebracion() {
    const cont = document.getElementById('celebracion-emojis');

    function crearCelEmoji() {
        const e = document.createElement('div');
        e.classList.add('cel-emoji');
        e.textContent = EMOJIS_BEBE[Math.floor(Math.random() * EMOJIS_BEBE.length)];
        e.style.left = `${Math.random() * 100}vw`;
        e.style.fontSize = `${14 + Math.random() * 20}px`;
        const dur = 5 + Math.random() * 7;
        e.style.animationDuration = `${dur}s`;
        e.style.animationDelay = `${Math.random() * 2}s`;
        cont.appendChild(e);
        setTimeout(() => e.remove(), (dur + 2) * 1000);
    }

    for (let i = 0; i < 25; i++) crearCelEmoji();
    setInterval(crearCelEmoji, 500);
}

// =========================================================
// S8 FINAL
// =========================================================
const CONF_EMOJIS = ['🌹','💕','✨','💖','🎊','👶','💍','🌸','⭐','💙','🥊','👣','🍼'];
let finalIniciado = false;
let confetiFinalInt = null;

function lanzarConfeti(cantidad = 55) {
    const c = document.getElementById('confetti-container');
    for (let i = 0; i < cantidad; i++) {
        setTimeout(() => {
            const p = document.createElement('div');
            p.classList.add('confetti-piece');
            p.textContent = CONF_EMOJIS[Math.floor(Math.random() * CONF_EMOJIS.length)];
            p.style.left = `${Math.random() * 100}vw`;
            p.style.fontSize = `${10 + Math.random() * 18}px`;
            const dur = 2.5 + Math.random() * 2.5;
            p.style.animationDuration = `${dur}s`;
            c.appendChild(p);
            setTimeout(() => p.remove(), dur * 1000 + 400);
        }, i * 55);
    }
}

function iniciarFinal() {
    if (finalIniciado) return;
    finalIniciado = true;

    audioJuanes.currentTime = 0;
    audioJuanes.play().catch(() => {});

    const ids = ['final-titulo','final-sub','final-linea','final-fecha','final-frase','final-firma','btn-share'];
    ids.forEach((id, idx) => {
        setTimeout(() => mostrarEl(id), 350 + idx * 650);
    });

    setTimeout(() => {
        lanzarConfeti();
        vibrar([30, 60, 30, 60, 50]);
        tonoSuave(960, 0.12, 0.035);
        confetiFinalInt = setInterval(() => lanzarConfeti(40), 5000);
    }, 350 + ids.length * 650);
}

function mostrarEl(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('oculto');
    el.classList.add('visible');
}

document.getElementById('btn-share').addEventListener('click', async () => {
    const btn = document.getElementById('btn-share');
    const textoOriginal = btn.innerHTML;
    const data = {
        title: 'Para Claritza',
        text: 'Un recuerdo hecho con todo el amor del mundo.',
        url: window.location.href
    };

    try {
        if (navigator.share) {
            await navigator.share(data);
        } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(window.location.href);
            btn.innerHTML = '<i class="fas fa-check"></i><span>Link copiado</span>';
            setTimeout(() => { btn.innerHTML = textoOriginal; }, 1800);
        }
    } catch (_) {
        btn.innerHTML = '<i class="fas fa-heart"></i><span>Listo</span>';
        setTimeout(() => { btn.innerHTML = textoOriginal; }, 1400);
    }
});

window.addEventListener('pagehide', () => {
    if (confetiFinalInt) clearInterval(confetiFinalInt);
});

// =========================================================
// INICIO
// =========================================================
prepararSeccionInicial();
prepararFallbacksImagenes();
iniciarPreloader();
