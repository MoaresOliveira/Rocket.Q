import Modal from './modal.js'

const modal = Modal()

const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector(".modal p")
const modalButton = document.querySelector('.modal button')


//Pegar todos os botões que existem com a classe check
const checkButtons = document.querySelectorAll(".actions a.check")

checkButtons.forEach(button => {
    //adicionar a escuta
    button.addEventListener("click", handleClick);
})

//Pegar todos os botões que existem com a classe delete
const deleteButtons = document.querySelectorAll(".actions a.delete");

deleteButtons.forEach((button) => {
    //adicionar a escuta
    button.addEventListener("click", (event) => handleClick(event, false));
});

function handleClick(event, check = true){

    event.preventDefault()
    const text = check? "Marcar como lida ": "Excluir ";    
    const slug = check ? "check" : "delete"
    const roomId = document.querySelector("#room-id").dataset.id
    const questionId = event.target.dataset.id

    const form = document.querySelector('.modal form')
    form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`)
    
    modalTitle.innerHTML = `${text} esta pergunta`
    modalDescription.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`
    modalButton.innerHTML = `Sim, ${text.toLowerCase()}`
    check? modalButton.classList.remove('red') : modalButton.classList.add('red')
    //Abrir Modal
    modal.open()
}

// Copiar o ID da sala clicando no botão
const roomIdButton = document.getElementById("room-id");

roomIdButton.addEventListener("click", () => {
    let content = document.querySelector("#room-id span").innerHTML;
    navigator.clipboard.writeText(content);
});