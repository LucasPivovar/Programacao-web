// Validação em JavaScript de TODOS os campos do formulário de sugestão.
document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector(".formulario-sugestao");

    // Cada campo tem uma função que devolve a mensagem de erro (ou "" se estiver válido).
    const regras = {
        nome: function (valor) {
            if (valor === "") return "Informe seu nome.";
            if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{3,60}$/.test(valor)) return "Use de 3 a 60 letras, sem números.";
            return "";
        },
        email: function (valor) {
            if (valor === "") return "Informe seu e-mail.";
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor)) return "Digite um e-mail válido (ex.: nome@email.com).";
            return "";
        },
        titulo: function (valor) {
            if (valor.length < 5 || valor.length > 100) return "O título precisa ter entre 5 e 100 caracteres.";
            return "";
        },
        categoria: function (valor) {
            if (valor === "") return "Selecione uma categoria.";
            return "";
        },
        link: function (valor) {
            if (!/^https?:\/\/[^\s.]+\.[^\s]+$/.test(valor)) return "Digite um link que comece com http:// ou https://.";
            return "";
        },
        descricao: function (valor) {
            if (valor.length < 20 || valor.length > 500) return "A descrição precisa ter entre 20 e 500 caracteres.";
            return "";
        }
    };

    // Mostra ou limpa a mensagem de erro logo abaixo do campo.
    function validarCampo(nomeCampo) {
        const campo = document.getElementById(nomeCampo);
        const erro = regras[nomeCampo](campo.value.trim());
        let aviso = campo.parentElement.querySelector(".erro-campo");

        if (!aviso) {
            aviso = document.createElement("small");
            aviso.classList.add("erro-campo");
            campo.parentElement.appendChild(aviso);
        }
        aviso.textContent = erro;
        campo.classList.toggle("campo-invalido", erro !== "");
        return erro === "";
    }

    // Valida enquanto o usuário digita ou sai do campo.
    Object.keys(regras).forEach(function (nomeCampo) {
        const campo = document.getElementById(nomeCampo);
        campo.addEventListener("blur", function () { validarCampo(nomeCampo); });
        campo.addEventListener("input", function () {
            if (campo.classList.contains("campo-invalido")) validarCampo(nomeCampo);
        });
    });

    // Contador de caracteres da descrição.
    const descricao = document.getElementById("descricao");
    const ajuda = descricao.parentElement.querySelector(".ajuda-campo");
    descricao.addEventListener("input", function () {
        ajuda.textContent = descricao.value.length + " / 500 caracteres (mínimo 20).";
    });

    // Bloqueia o envio se algum campo estiver inválido.
    formulario.addEventListener("submit", function (evento) {
        let tudoValido = true;
        Object.keys(regras).forEach(function (nomeCampo) {
            if (!validarCampo(nomeCampo)) tudoValido = false;
        });
        if (!tudoValido) {
            evento.preventDefault();
            formulario.querySelector(".campo-invalido").focus();
        }
    });

    // Ao limpar o formulário, remove também as mensagens de erro.
    formulario.addEventListener("reset", function () {
        formulario.querySelectorAll(".erro-campo").forEach(function (aviso) { aviso.textContent = ""; });
        formulario.querySelectorAll(".campo-invalido").forEach(function (campo) { campo.classList.remove("campo-invalido"); });
        ajuda.textContent = "Escreva entre 20 e 500 caracteres.";
    });
});
