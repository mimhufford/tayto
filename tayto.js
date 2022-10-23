// Initialise local storage
window.localStorage.tayto = window.localStorage.tayto || JSON.stringify({ 'clients': {} });
const tayto = JSON.parse(window.localStorage.tayto);

open_client(tayto.activeClient);

function refresh() {
    refresh_client_list();
    refresh_lines();
}

function add_new_line() {
    tayto.clients[tayto.activeClient].push({
        description: "",
        person: "",
        hours: [0, 0, 0, 0, 0, 0, 0],
    });
    save();
    refresh();
}

function delete_line(index) {
    tayto.clients[tayto.activeClient].splice(index, 1);
    save();
    refresh();
}

function refresh_lines() {
    const linesDiv = document.getElementById("lines");
    linesDiv.innerHTML = ``;

    for (const [i, line] of tayto.clients[tayto.activeClient].entries()) {
        linesDiv.innerHTML += `
        <div class="line">
          <input class="line_description"  type="text"   value="${line.description}" placeholder="Description of work" oninput="update_lines()" />
          <input class="line_person"       type="text"   value="${line.person}"      placeholder="Who did the work?"   oninput="update_lines()" />
          <input class="line_hours"        type="number" value="${line.hours[0]}"    onClick="this.select()" oninput="update_lines()" />
          <input class="line_hours"        type="number" value="${line.hours[1]}"    onClick="this.select()" oninput="update_lines()" />
          <input class="line_hours"        type="number" value="${line.hours[2]}"    onClick="this.select()" oninput="update_lines()" />
          <input class="line_hours"        type="number" value="${line.hours[3]}"    onClick="this.select()" oninput="update_lines()" />
          <input class="line_hours"        type="number" value="${line.hours[4]}"    onClick="this.select()" oninput="update_lines()" />
          <input class="line_hours"        type="number" value="${line.hours[5]}"    onClick="this.select()" oninput="update_lines()" />
          <input class="line_hours"        type="number" value="${line.hours[6]}"    onClick="this.select()" oninput="update_lines()" />
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
        tayto.clients[tayto.activeClient][index].person = line.children[1].value;
        tayto.clients[tayto.activeClient][index].hours[0] = line.children[2].value;
        tayto.clients[tayto.activeClient][index].hours[1] = line.children[3].value;
        tayto.clients[tayto.activeClient][index].hours[2] = line.children[4].value;
        tayto.clients[tayto.activeClient][index].hours[3] = line.children[5].value;
        tayto.clients[tayto.activeClient][index].hours[4] = line.children[6].value;
        tayto.clients[tayto.activeClient][index].hours[5] = line.children[7].value;
        tayto.clients[tayto.activeClient][index].hours[6] = line.children[8].value;
    }
    save();
}

function open_client(id) {
    document.getElementById("selected_client").innerText = id;
    tayto.activeClient = id;
    save();
    refresh();
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
    close_add_new_client_window();
    refresh();
}

function remove_client(id) {
    delete tayto.clients[id];
    save();
    refresh();
}

function save() {
    window.localStorage.tayto = JSON.stringify(tayto);
}