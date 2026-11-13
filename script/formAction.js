document.addEventListener("DOMContentLoaded", function () {
    // Recupera os parâmetros enviados pelo formulário que aparecem depois do ? na URL.
    const parametros = new URLSearchParams(window.location.search);
    // Localiza o elemento HTML onde a mensagem de resultado será apresentada.
    const mensagem = document.getElementById("mensagem-resultado");
    // Localiza a área HTML onde os dados recebidos serão apresentados.
    const resultado = document.getElementById("resultado-dados");
    // Define os nomes dos campos esperados e os títulos que aparecerão na página.
    const campos = [
        { nome: "nome", rotulo: "Nome" },
        { nome: "email", rotulo: "E-mail" },
        { nome: "titulo", rotulo: "Título da notícia" },
        { nome: "categoria", rotulo: "Categoria ESG" },
        { nome: "link", rotulo: "Link da notícia" },
        { nome: "descricao", rotulo: "Descrição" }
    ];
    // Transforma os valores internos das categorias em textos mais amigáveis.
    const categorias = {
        ambiental: "Meio ambiente",
        social: "Impacto social",
        governanca: "Governança"
    };
    // Verifica se pelo menos um campo esperado foi recebido e possui conteúdo.
    const recebeuDados = campos.some(function (campo) {
        const valor = parametros.get(campo.nome);
        // Retorna verdadeiro quando o parâmetro existe e não está vazio.
        return valor !== null && valor.trim() !== "";
    });
    // Verifica se a página foi aberta diretamente, sem dados do formulário.
    if (!recebeuDados) {
        // Informa ao visitante que não existem informações recebidas.
        mensagem.textContent =
            "Nenhum dado foi recebido. Volte ao formulário para enviar uma sugestão.";
        // Encerra a função para não tentar apresentar campos inexistentes.
        return;
    }
    // Informa que os dados foram recuperados com sucesso.
    mensagem.textContent =
        "Sua sugestão foi recebida pelo formulário! Confira os dados abaixo.";
    // Percorre a lista de campos para apresentar cada informação recebida.
    campos.forEach(function (campo) {
        // Recupera o valor correspondente ao atributo name do formulário.
        const valorOriginal = parametros.get(campo.nome);
        // Ignora campos que não foram encontrados na URL ou estão vazios.
        if (valorOriginal === null || valorOriginal.trim() === "") {
            return;
        }
        // Traduz o valor da categoria; os demais campos mantêm o texto original.
        const valorExibido = campo.nome === "categoria"
            ? categorias[valorOriginal] || valorOriginal
            : valorOriginal;
        // Cria uma caixa individual para organizar cada informação recebida.
        const item = document.createElement("article");
        // Adiciona uma classe CSS para estilizar a caixa criada.
        item.classList.add("item-dado");
        // Cria um título para identificar o tipo de informação.
        const titulo = document.createElement("h2");
        // Insere o nome amigável do campo como texto, sem interpretar HTML.
        titulo.textContent = campo.rotulo;
        // Cria um parágrafo para apresentar o conteúdo recebido.
        const conteudo = document.createElement("p");
        // Utiliza textContent para exibir o conteúdo com segurança, sem executar HTML enviado pelo usuário.
        conteudo.textContent = valorExibido;
        // Coloca o título dentro da caixa de informação.
        item.appendChild(titulo);
        // Coloca o valor recebido logo abaixo do título.
        item.appendChild(conteudo);
        // Adiciona a caixa completa à área de resultados da página.
        resultado.appendChild(item);
    });

});
