const camposDosFormularios = document.querySelectorAll("[required]");
const formulario = document.querySelector('[data-formulario]');

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const listaRespostas = {
    "nome": e.target.elements["nome"].value,
    "email": e.target.elements["email"].value,
    "assunto": e.target.elements["assunto"].value,
    "area": e.target.elements["area"].value,
  }

  // Verifica se o formulário é válido antes de prosseguir
  if (formulario.checkValidity()) {
    localStorage.setItem("cadastro", JSON.stringify(listaRespostas));
    window.location.href = ""; // Coloque a URL para redirecionar após o envio do formulário
  } else {
    // Se o formulário não for válido, exiba as mensagens de erro nos campos inválidos
    camposDosFormularios.forEach((campo) => verificaCampo(campo));
  }
});

camposDosFormularios.forEach((campo) => {
  campo.addEventListener("input", () => verificaCampo(campo)); // Use "input" em vez de "blur" para fornecer feedback instantâneo
  campo.addEventListener("invalid", (evento) => evento.preventDefault());
});

const tiposDeErro = ["valueMissing", "typeMismatch", "tooShort"];

const mensagens = {
  nome: {
    valueMissing: "O campo de nome não pode estar vazio.",
    patternMismatch: "Por favor, preencha um nome válido.",
    tooShort: "Por favor, preencha um nome com pelo menos 3 caracteres.",
  },
  email: {
    valueMissing: "O campo de e-mail não pode estar vazio.",
    typeMismatch: "Por favor, preencha um email válido.",
    tooShort: "Por favor, preencha um e-mail válido.",
  },
  assunto: {
    valueMissing: "O campo assunto não pode estar vazio.",
    tooShort: "O campo assunto não tem caracteres suficientes.",
  },
  area: {
    valueMissing: "O campo área não pode estar vazio.",
    tooShort: "O campo área não tem caracteres suficientes.",
  },
};

function verificaCampo(campo) {
  let mensagem = "";
  campo.setCustomValidity('');

  tiposDeErro.forEach((erro) => {
    if (campo.validity[erro]) {
      mensagem = mensagens[campo.name][erro];
      console.log(mensagem);
    }
  });

  const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
  const validadorDeInput = campo.checkValidity();

  if (!validadorDeInput) {
    campo.classList.add("invalido"); // Adiciona uma classe para destacar os campos inválidos no CSS
    mensagemErro.textContent = mensagem;
  } else {
    campo.classList.remove("invalido");
    mensagemErro.textContent = "";
  }
}