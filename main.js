let botones = document.querySelectorAll('button')
let tiempoRestante = document.querySelector('#t-restante')
let mostrarMovimientos = document.getElementById('movimientos')
let mostrarAciertos = document.getElementById('aciertos')

let numerosRandom = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]
numerosRandom = numerosRandom.sort(() => Math.random() - 0.5) // ordena el vector en forma aleatoria
// console.log('valores posiciones: ',numerosRandom)

let temporizador = false
let timer = 40
let tarjetasDestapadas = 0
let tarjeta1 = null
let tarjeta2 = null
let primerResultado = null
let segundoResultado = null
let movimientos = 0
let aciertos = 0

for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener('click', () => destapar(botones[i].id)) //destapar(i)
}

tiempoRestante.textContent = `Tiempo: ${timer} seg.`

function contarTiempo(){
        iniciado = window.setInterval(() => {
        timer--
        tiempoRestante.textContent = `Tiempo: ${timer} seg.`

        if(timer == 0){
            window.clearInterval(iniciado)
            bloquearTarjetas()
            tiempoRestante.textContent = `Se ha terminado el tiempo... 😪`
        }
    }, 1000);
}

function bloquearTarjetas(){
    for (let i = 0; i < botones.length; i++) {
        let tarjetaBloqueada = document.getElementById(i)
        tarjetaBloqueada.textContent = numerosRandom[i]
        tarjetaBloqueada.disabled = true
    }
}

function destapar(idBoton) {
    if (temporizador == false){
        contarTiempo() // solo se ejecuta una vez
        temporizador = true
    }

    tarjetasDestapadas++

    // mostrar primer numero
    if (tarjetasDestapadas == 1) {
        tarjeta1 = document.getElementById(idBoton)
        primerResultado = numerosRandom[idBoton]
        tarjeta1.textContent = primerResultado
        tarjeta1.disabled = true //deshabilito el boton, para que no se pueda volver a pulsar y no aumente el contador
    } else if (tarjetasDestapadas == 2) {
        // mostrar segundo numero
        tarjeta2 = document.getElementById(idBoton)
        segundoResultado = numerosRandom[idBoton]
        tarjeta2.textContent = segundoResultado
        tarjeta2.disabled = true

        movimientos++ //Incremento de movimientos (solo al destapar dos tarjetas)
        mostrarMovimientos.textContent = `Movimientos: ${movimientos}`

        if (primerResultado == segundoResultado) {
            tarjetasDestapadas = 0
            aciertos++
            mostrarAciertos.textContent = `Aciertos: ${aciertos}`

            // verificar victoria
            if (aciertos == 8) {
                window.clearInterval(iniciado)
                mostrarAciertos.textContent = `Aciertos: ${aciertos} 🤩`
                mostrarMovimientos.textContent = `Movimientos: ${movimientos} 😎😎😎`
                tiempoRestante.textContent = `Ganaste!!! 🎉🎉 Solo demoraste: ${30 - timer} segundos.`
                confetti({
                    particleCount: 1000,
                    startVelocity: 30,
                    spread: 1000,
                    origin: {
                    //   x: Math.random(),
                      y: Math.random() - 0.2
                    }
                  });
                confetti()
            }
        } else {
            // mostrar numeros momentaneamente y volver a tapar
                setTimeout(() => {
                tarjeta1.textContent = ''
                tarjeta2.textContent = ''
                tarjeta1.disabled = false
                tarjeta2.disabled = false
                tarjetasDestapadas = 0
            }, 700);
        }
    }
}