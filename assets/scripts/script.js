let ulElement = document.querySelector('#app ul');
let inputElement = document.querySelector('#app input');
let buttonElement = document.querySelector('#app button');

let tasks = JSON.parse(localStorage.getItem("@taskList",)) || [];

function renderTasks() {
    ulElement.innerHTML= "";

    tasks.map((todo) => {
        // Criação do elemento li e vinculando seu texto, que no caso seria a tarefa
        let liElement = document.createElement("li");
        let taskText = document.createTextNode(todo);
        liElement.appendChild(taskText);

        // Criação do elemento a, que vai ser o link para excluir a tarefa
        let linkElement = document.createElement("a");
        linkElement.setAttribute("href", "#");

        // Adicionando a palavra "Excluir" ao link
        let linkText = document.createTextNode("Excluir");
        linkElement.appendChild(linkText);

        // Adicionando o atributo onclick no link, para deletar a task
        // A variável position é referente a posição no array da tarefa que será excluída 
        let position = tasks.indexOf(todo);
        linkElement.setAttribute("onclick", `deleteTask(${position})`);

        // Vinculando o link a li
        liElement.appendChild(linkElement);

        // Vinculando a li a ul
        ulElement.appendChild(liElement);
    });
}

function addTask() {
    if(inputElement.value === '') {
        alert("Digite a tarefa");
        return false;
    } else {
        let newTask = inputElement.value;

        tasks.push(newTask);
        inputElement.value = '';

        renderTasks();
        saveData();
    }
}

function deleteTask(position) {
    tasks.splice(position, 1);
    renderTasks();
    saveData();
}

// Salvar a lista de tarefas localmente
function saveData() {
    localStorage.setItem("@taskList", JSON.stringify(tasks));
}

buttonElement.onclick = addTask;
renderTasks();