// ================================
// RISQUE GUILD ROSTER
// VERSION 1
// STEP 1
// ================================

let players = [];

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

async function loadPlayersFromGoogle() {

    try {

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxnepH5bglAVBTaeUBddyb-U8ptc7s3PpurUYRLRFGUG3jNfC2druVqQ--9wt0vqtaPpg/exec"
        );

        const data = await response.json();

        players = data.map(player => ({

            id: crypto.randomUUID(),

            ign: player.ign,

            class: player.class,

            role: player.role

        }));

       async function loadPlayersFromGoogle() {

    try {

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxnepH5bglAVBTaeUBddyb-U8ptc7s3PpurUYRLRFGUG3jNfC2druVqQ--9wt0vqtaPpg/exec"
        );


        const data = await response.json();


        players = data.map(player => ({

            id: createID(),

            ign: player.ign,

            class: player.class,

            role: player.role

        }));


        renderPlayers();


    }

    catch(error){

        console.error(error);

        alert("Unable to load Google Sheet.");

    }


    }

    catch(error){

        console.error(error);

        alert("Unable to load Google Sheet.");

    }

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

    .filter(player=>

        player.ign
        .toLowerCase()
        .includes(filter.toLowerCase())

    )

    .forEach(player=>{

        const card=document.createElement("div");

        card.className="player";

        card.dataset.id=player.id;

        card.innerHTML=`

            <div class="player-name">

                ${player.ign}

            </div>

            <div class="player-actions">

                <button
                class="edit-btn">

                ✏

                </button>

                <button
                class="delete-btn">

                🗑

                </button>

            </div>

        `;

        card.querySelector(".edit-btn").onclick=()=>editPlayer(player.id);

        card.querySelector(".delete-btn").onclick=()=>deletePlayer(player.id);

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

loadPlayersFromGoogle();

// ================================
// RAID GENERATOR
// ================================

const rosterContainer = document.getElementById("rosters");

const raids = [
    {
        name: "Raid 1",
        teams: 6
    },
    {
        name: "Raid 2",
        teams: 2
    },
    {
        name: "Raid 3",
        teams: 2
    },
    {
        name: "Roaming Party",
        teams: 2
    }
];

function generateRaids(){

    rosterContainer.innerHTML="";

    raids.forEach(raid=>{

        const raidBox=document.createElement("div");

        raidBox.className="raid";

        raidBox.innerHTML=`<h2>${raid.name}</h2>`;

        const grid=document.createElement("div");

        grid.className="teamGrid";

        for(let i=1;i<=raid.teams;i++){

            const team=document.createElement("div");

            team.className="team";

            team.innerHTML=`

                <h3>

                    Team ${i}

                    <span class="count">(0/5)</span>

                </h3>

                <div class="teamPlayers"></div>

            `;

            grid.appendChild(team);

        }

        raidBox.appendChild(grid);

        rosterContainer.appendChild(raidBox);

    });

}

generateRaids();

// =======================
// DRAG & DROP
// =======================

new Sortable(playersContainer,{

    group:"players",

    animation:150,

    sort:false

});

document.querySelectorAll(".teamPlayers").forEach(team=>{

    new Sortable(team,{

        group:"players",

        animation:150

    });

});
