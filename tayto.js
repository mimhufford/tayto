// Initialise local storage
window.localStorage.tayto = window.localStorage.tayto || JSON.stringify({ 'clients': {} });
const tayto = JSON.parse(window.localStorage.tayto);

refresh_client_list();
open_client(tayto.activeClient);

function add_new_line() {
    tayto.clients[tayto.activeClient].push({
        description : "",
        person : "",
        monday: 0,
    });
    save();
    refresh_lines();
}

function delete_line(index) {
    tayto.clients[tayto.activeClient].splice(index, 1);
    save();
    refresh_lines();
}

function refresh_lines() {
    const linesDiv = document.getElementById("lines");
    linesDiv.innerHTML = ``;

    for (const [i, line] of tayto.clients[tayto.activeClient].entries()) {
        linesDiv.innerHTML += `
        <div>
          <input type="text"   value="${line.description}" oninput="update_lines()" />
          <input type="text"   value="${line.person}"      oninput="update_lines()" />
          <input type="number" value="${line.monday}"      oninput="update_lines()" />
          <button onclick="delete_line(${i})">X</button>
        </div>
      `;
    }
}

function update_lines() {
    const linesDiv = document.getElementById("lines");
    for (let index = 0; index < linesDiv.children.length; index++) {
        const line = linesDiv.children[index];
        tayto.clients[tayto.activeClient][index].description = line.children[0].value;
        tayto.clients[tayto.activeClient][index].person      = line.children[1].value;
        tayto.clients[tayto.activeClient][index].monday      = line.children[2].value;
    }
    save();
}

function open_client(id) {
    document.getElementById("selected_client").innerText = id;
    tayto.activeClient = id;
    save();
    refresh_client_list();
    refresh_lines();
}

function refresh_client_list() {
    const clientsDiv = document.getElementById("client_list");

    clientsDiv.innerHTML = ``;

    for (const client in tayto.clients) {
        active = tayto.activeClient == client ? "active" : "";
        clientsDiv.innerHTML += `<div onclick="open_client('${client}')" class="client_list_client ${active}">${client}</div>`;
    }

    clientsDiv.innerHTML += `<div class="client_list_client" onclick="open_add_new_client_window()"><i class="gg-add"></i></div>`;
}

function open_add_new_client_window() {
    const newClientWindow = document.getElementById("new_client_container");
    newClientWindow.style.display = "flex";
}

function close_add_new_client_window() {
    const newClientWindow = document.getElementById("new_client_container");
    newClientWindow.style.display = "none";
}

function add_new_client() {
    const input = document.getElementById("new_client");
    const newClient = input.value.trim();
    input.value = "";
    if (newClient in tayto.clients == false) tayto.clients[newClient] = [];
    open_client(newClient);
    save();
    refresh_client_list();
    close_add_new_client_window();
}

function remove_client(id) {
    delete tayto.clients[id];
    save();
    refresh_client_list();
}

function save() {
    window.localStorage.tayto = JSON.stringify(tayto);
}