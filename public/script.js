// ================================
// RISQUE GUILD ROSTER
// VERSION 1
// STEP 1
// ================================

let players = JSON.parse(localStorage.getItem("players")) || [];

let editingPlayerId = null;

const playersContainer = document.getElementById("players");

const ignInput = document.getElementById("playerIGN");
const classInput = document.getElementById("playerClass");
const roleInput = document.getElementById("playerRole");

const addButton = document.getElementById("addPlayerBtn");
const searchInput = document.getElementById("searchPlayer");



// ================================
// SAVE
// ================================

function savePlayers(){

    localStorage.setItem(
        "players",
        JSON.stringify(players)
    );

}



// ================================
// CREATE ID
// ================================

function createID(){

    return Date.now().toString() +
           Math.random().toString(36).substring(2,7);

}



// ================================
// RENDER
// ================================

function renderPlayers(filter=""){

    playersContainer.innerHTML="";

    players

    .filter(player=>{

        return player.ign
        .toLowerCase()
        .includes(filter.toLowerCase());

    })

    .forEach(player=>{

        const card=document.createElement("div");

        card.className="player";

        card.innerHTML=`

            <div class="player-name">

                ${player.ign}

            </div>

            <div class="player-actions">

                <button
                    class="edit-btn"
                    onclick="editPlayer('${player.id}')">

                    ✏

                </button>

                <button
                    class="delete-btn"
                    onclick="deletePlayer('${player.id}')">

                    🗑

                </button>

            </div>

        `;

        playersContainer.appendChild(card);

    });

}



// ================================
// ADD PLAYER
// ================================

addButton.onclick=()=>{

    const ign=ignInput.value.trim();

    if(ign===""){

        alert("Enter IGN");

        return;

    }

    if(editingPlayerId){

        const player=players.find(p=>p.id===editingPlayerId);

        player.ign=ign;
        player.class=classInput.value;
        player.role=roleInput.value;

        editingPlayerId=null;

        addButton.innerText="+ Add Player";

    }

    else{

        players.push({

            id:createID(),

            ign:ign,

            class:classInput.value,

            role:roleInput.value

        });

    }

    ignInput.value="";

    classInput.selectedIndex=0;

    roleInput.selectedIndex=0;

    savePlayers();

    renderPlayers();

};



// ================================
// EDIT
// ================================

function editPlayer(id){

    const player=players.find(p=>p.id===id);

    editingPlayerId=id;

    ignInput.value=player.ign;

    classInput.value=player.class;

    roleInput.value=player.role;

    addButton.innerText="Save Changes";

}



// ================================
// DELETE
// ================================

function deletePlayer(id){

    if(!confirm("Delete player?")) return;

    players=players.filter(p=>p.id!==id);

    savePlayers();

    renderPlayers();

}



// ================================
// SEARCH
// ================================

searchInput.onkeyup=()=>{

    renderPlayers(searchInput.value);

};



// ================================
// START
// ================================

renderPlayers();
