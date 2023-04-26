
function generarcasillas() {
    const cuadrito= [];
    for (let i = 1; i <= 15; i++) {
        const cuadrito2 = document.createElement('div');
        cuadrito2.classList.add('cuadrito2');
        cuadrito2.textContent = i;
        cuadrito2.addEventListener('click', movercuadrito);
        cuadrito.push(cuadrito2);
    }
    cuadrito.push(null);
    return cuadrito;
}

function hacersopa(cuadrito) {
    for (let i = cuadrito.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cuadrito[i], cuadrito[j]] = [cuadrito[j], cuadrito[i]];
    }
    return cuadrito;
}
const juego= document.getElementById('cuadros');
function casilla(cuadrito) {
    juego.innerHTML = '';
    cuadrito.forEach(cuadrito2 => {
        if (cuadrito2) {
            juego.appendChild(cuadrito2);
        } else {
            juego.appendChild(document.createElement('div'));
        }
    });
}


function ganaste(cuadrito) {
    for (let i = 0; i < cuadrito.length - 1; i++) {
        if (cuadrito[i] === null || parseInt(cuadrito[i].textContent) !== i + 1) {
            return false;
        }
    }
    return true;
}

let mov = 0;
let iniciartiempo;
let reloj=0;
const conta = document.getElementById('movs');
function movercuadrito(e) {
    const cuadrito2 = e.target;
    const index = [...juego.children].indexOf(cuadrito2);
    const emptyIndex = cuadrito.indexOf(null);

    const [tileRow, tileCol] = [Math.floor(index / 4), index % 4];
    const [emptyRow, emptyCol] = [Math.floor(emptyIndex / 4), emptyIndex % 4];

    const distance = Math.abs(tileRow - emptyRow) + Math.abs(tileCol - emptyCol);

    if (distance === 1) {
        mov += 1;
        conta.textContent = mov;
        [cuadrito[index], cuadrito[emptyIndex]] = [cuadrito[emptyIndex], cuadrito[index]];
        casilla(cuadrito);

        if (ganaste(cuadrito)) {
            clearInterval(reloj);
            alert(`¡Ganaste!`);
        }
    }
}



const segundos = document.getElementById('segs');
function relojinit() {
    iniciartiempo = Date.now();
    reloj = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - iniciartiempo) / 1000);
        segundos.textContent = elapsedTime;
    }, 1000);
}

function volver() {
    mov = 0;
    conta.textContent = mov;
    clearInterval(reloj);
    relojinit();
    cuadrito = hacersopa(cuadrito);
    casilla(cuadrito);
}
const btn = document.getElementById('initboton');
let cuadrito = generarcasillas();
cuadrito = hacersopa(cuadrito);
casilla(cuadrito);
btn.addEventListener('click', volver);
relojinit();