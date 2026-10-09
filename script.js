
/* =========================
   CURSOR PERSONALIZADO
========================= */

const cursor = document.querySelector(".cursor");

if (cursor) {
    document.addEventListener("mousemove", function (event) {
        cursor.style.left = event.clientX + "px";
        cursor.style.top = event.clientY + "px";
    });
}


/* =========================
   TEXTO DIGITANDO
========================= */

const texto = "Estudante de Tecnologia da Informação";
const textoDigitando = document.querySelector("#textoDigitando");

let indice = 0;

function escreverTexto() {
    if (!textoDigitando) return;

    if (indice < texto.length) {
        textoDigitando.textContent += texto.charAt(indice);
        indice++;

        setTimeout(escreverTexto, 60);
    }
}

escreverTexto();


/* =========================
   MENU HAMBÚRGUER
========================= */

const botaoMenu = document.querySelector("#botaoMenu");
const menuNavegacao = document.querySelector("#menuNavegacao");

function fecharMenu() {
    if (!botaoMenu || !menuNavegacao) return;

    menuNavegacao.classList.remove("aberto");
    botaoMenu.classList.remove("ativo");

    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu");
}

function alternarMenu() {
    if (!botaoMenu || !menuNavegacao) return;

    const estaAberto = menuNavegacao.classList.toggle("aberto");

    botaoMenu.classList.toggle("ativo", estaAberto);
    botaoMenu.setAttribute("aria-expanded", String(estaAberto));

    botaoMenu.setAttribute(
        "aria-label",
        estaAberto ? "Fechar menu" : "Abrir menu"
    );
}


/* ABRIR E FECHAR PELO BOTÃO */

if (botaoMenu && menuNavegacao) {
    botaoMenu.addEventListener("click", alternarMenu);

    /* Fechar ao selecionar uma opção */

    menuNavegacao.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", fecharMenu);
    });

    /* Fechar ao clicar fora do menu */

    document.addEventListener("click", function (event) {
        if (
            !menuNavegacao.contains(event.target) &&
            !botaoMenu.contains(event.target)
        ) {
            fecharMenu();
        }
    });

    /* Fechar ao apertar ESC */

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            fecharMenu();
            botaoMenu.focus();
        }
    });
}


/* =========================
   ANIMAÇÃO DAS SEÇÕES
========================= */

const secoesRevelar = document.querySelectorAll("[data-revelar]");

if (
    secoesRevelar.length > 0 &&
    "IntersectionObserver" in window
) {
    document.body.classList.add("revelar-ativo");

    const observador = new IntersectionObserver(
        function (entradas, observer) {
            entradas.forEach(function (entrada) {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visivel");

                    observer.unobserve(entrada.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    secoesRevelar.forEach(function (secao) {
        observador.observe(secao);
    });
} else {
    secoesRevelar.forEach(function (secao) {
        secao.classList.add("visivel");
    });
}


/* ===== PARTE 3: TEMA, FORMULÁRIO E MODAL ===== */

/* ALTERNAR TEMA CLARO E ESCURO */

const botaoTema = document.querySelector("#botaoTema");

function atualizarBotaoTema() {
    if (!botaoTema) return;

    const modoClaro = document.body.classList.contains("modo-claro");

    botaoTema.textContent = modoClaro ? "☾" : "☀";
    botaoTema.setAttribute(
        "aria-label",
        modoClaro ? "Ativar modo escuro" : "Ativar modo claro"
    );
    botaoTema.setAttribute(
        "title",
        modoClaro ? "Ativar modo escuro" : "Ativar modo claro"
    );
}

const temaSalvo = localStorage.getItem("temaPortfolio");

if (temaSalvo === "claro") {
    document.body.classList.add("modo-claro");
}

atualizarBotaoTema();

if (botaoTema) {
    botaoTema.addEventListener("click", function () {
        document.body.classList.toggle("modo-claro");

        const temaAtual = document.body.classList.contains("modo-claro")
            ? "claro"
            : "escuro";

        localStorage.setItem("temaPortfolio", temaAtual);
        atualizarBotaoTema();
    });
}

/* MÁSCARA DE TELEFONE */

const telefoneContato = document.querySelector("#telefoneContato");

if (telefoneContato) {
    telefoneContato.addEventListener("input", function () {
        let numero = telefoneContato.value.replace(/\D/g, "");

        numero = numero.slice(0, 11);

        if (numero.length > 10) {
            numero = numero.replace(
                /^(\d{2})(\d{5})(\d{0,4}).*/,
                "($1) $2-$3"
            );
        } else if (numero.length > 6) {
            numero = numero.replace(
                /^(\d{2})(\d{4})(\d{0,4}).*/,
                "($1) $2-$3"
            );
        } else if (numero.length > 2) {
            numero = numero.replace(/^(\d{2})(\d+)/, "($1) $2");
        } else if (numero.length > 0) {
            numero = numero.replace(/^(\d*)/, "($1");
        }

        telefoneContato.value = numero;
    });
}

/* FORMULÁRIO E MODAL DE SUCESSO */

const formularioContato = document.querySelector("#formularioContato");
const modalSucesso = document.querySelector("#modalSucesso");
const fecharModal = document.querySelector("#fecharModal");

if (formularioContato) {
    formularioContato.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!formularioContato.checkValidity()) {
            formularioContato.reportValidity();
            return;
        }

        if (modalSucesso && typeof modalSucesso.showModal === "function") {
            modalSucesso.showModal();
        } else {
            window.alert(
                "Formulário validado! Esta demonstração não envia mensagens por e-mail."
            );
        }

        formularioContato.reset();
    });
}

if (fecharModal && modalSucesso) {
    fecharModal.addEventListener("click", function () {
        modalSucesso.close();
    });
}

if (modalSucesso) {
    modalSucesso.addEventListener("click", function (event) {
        if (event.target === modalSucesso) {
            modalSucesso.close();
        }
    });
}

/* ===== FIM DO JAVASCRIPT DA PARTE 3 ===== */