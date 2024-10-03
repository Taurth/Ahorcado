const ahorcado = {
    palabraSecreta: '',
    intentosMaximos: 6,
    letrasCorrectas: [],
    letrasIncorrectas: [],
    intentosRestantes: 6,

    iniciarJuego: function(palabra) {
        this.palabraSecreta = palabra.toLowerCase();
        this.letrasCorrectas = Array(palabra.length).fill('_');
        this.letrasIncorrectas = [];
        this.intentosRestantes = this.intentosMaximos;
        this.mostrarProgreso();
        document.getElementById('resultado').textContent = '';
        document.getElementById('reiniciarBtn').style.display = 'none';
    },

    mostrarProgreso: function() {
        document.getElementById('palabra').textContent = this.letrasCorrectas.join(' ');
        document.getElementById('letrasIncorrectas').textContent = this.letrasIncorrectas.join(', ');
        document.getElementById('intentosRestantes').textContent = this.intentosRestantes;
    },

    adivinarLetra: function(letra) {
        letra = letra.toLowerCase();
        if (this.letrasCorrectas.includes(letra) || this.letrasIncorrectas.includes(letra)) {
            alert(`Ya has adivinado la letra "${letra}".`);
            return;
        }

        if (this.palabraSecreta.includes(letra)) {
            for (let i = 0; i < this.palabraSecreta.length; i++) {
                if (this.palabraSecreta[i] === letra) {
                    this.letrasCorrectas[i] = letra;
                }
            }
        } else {
            this.letrasIncorrectas.push(letra);
            this.intentosRestantes--;
        }

        this.mostrarProgreso();
        this.verificarEstado();
    },

    verificarEstado: function() {
        if (this.letrasCorrectas.join('') === this.palabraSecreta) {
            document.getElementById('resultado').textContent = "¡Felicidades! Has adivinado la palabra.";
            document.getElementById('reiniciarBtn').style.display = 'block';
        } else if (this.intentosRestantes === 0) {
            document.getElementById('resultado').textContent = `¡Has perdido! La palabra era "${this.palabraSecreta}".`;
            document.getElementById('reiniciarBtn').style.display = 'block';
        }
    }
};

const palabras = ['javascript', 'programacion', 'computadora', 'ahorcado'];

function palabraAleatoria() {
    return palabras[Math.floor(Math.random() * palabras.length)];
}

function configurarJuego() {
    let palabra = palabraAleatoria();
    ahorcado.iniciarJuego(palabra);
}

document.getElementById('adivinarBtn').addEventListener('click', function() {
    let letra = document.getElementById('letraInput').value;
    if (letra && letra.length === 1 && /[a-z]/i.test(letra)) {
        ahorcado.adivinarLetra(letra);
        document.getElementById('letraInput').value = '';
    } else {
        alert("Introduce una letra válida.");
    }
});

document.getElementById('reiniciarBtn').addEventListener('click', function() {
    configurarJuego();
});

configurarJuego();