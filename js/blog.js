function buttondealer(event){
    event.preventDefault();
    if(event.target.id === "game-btn")
    {
        let dialog = document.getElementById("dialog");
        let name = document.getElementById("name");
        let year = document.getElementById("year");
        let summary = document.getElementById("summary");

        name.value = "";
        year.value = "";
        summary.value = "";
        dialog.open = true;
    }
    else if(event.target.id === "submit-btn")
    {
        submit(event);
    }
    else if(event.target.id === "cancel-btn")
    {
        let dialog = document.getElementById("dialog");
        dialog.open = false;
    }
    else if(event.target.id.toString().charAt(0) === "e")
    {
        edit_game(event);
    }
    else if(event.target.id.toString().charAt(0) === "d")
    {
        delete_game(event);
    }
}

function submit(event)
{
    let gameName = document.getElementById("name");
    let gameYear = document.getElementById("year");
    let gameSummary = document.getElementById("summary");

    let dialog = document.getElementById("dialog");

    gameName = filter(gameName.value);
    gameYear = filter(gameYear.value);
    gameSummary = filter(gameSummary.value);
    let gameData = {
        id: `${gameName}`,
        name: `${gameName}`,
        Year: `${gameYear}`,
        summary: `${gameSummary}`,
    };

    let gameList = localStorage.getItem("gameList");
    gameList = JSON.parse(gameList);
    if(gameList === null){
        gameList = [];
    }
    

    if(event.target.innerHTML.includes("Submit"))
    {
        gameList.push(gameData);
        add_game(gameList[gameList.length - 1]);
        localStorage.setItem("gameList", JSON.stringify(gameList));
    } else if(event.target.innerHTML.includes("Save")){
        updateGame(gameData, prevGameIdx);
    }
    dialog.open = false;

}

function add_game(gameData)
{
    let gameList = document.getElementById("game-list");
    let block = document.createElement("div");
    block.id = gameData.name;
    let gameName = gameData.name;
    let gameSummary = gameData.summary;
    let gameYear = gameData.Year;

    block.innerHTML = `
        <h2>${gameName}</h2>
        <div>Published year: ${gameYear}</div>
        <p>${gameSummary}</p>
    `;
    

    let editBtn = document.createElement("button");
    editBtn.innerHTML = "&#9997Edit";
    editBtn.id = "edit:" + gameName;
    editBtn.addEventListener("click", edit_game);
    

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "&#128465Delete";
    deleteBtn.id = "delete:" + gameName;
    deleteBtn.addEventListener("click", delete_game);
    
    block.appendChild(editBtn);
    block.appendChild(deleteBtn);
    gameList.appendChild(block);
    
}

let prevGameIdx = -1;
function edit_game(event)
{
    event.preventDefault();
    let dialog = document.getElementById("dialog");
    let name = document.getElementById("name");
    let year = document.getElementById("year");
    let summary = document.getElementById("summary");

    
    name.value = "";
    year.value = "";
    summary.value = "";
    dialog.open = true;

    let saveBtn = document.getElementById("submit-btn");
    saveBtn.innerHTML = "&#10004;Save";
    let gameName = event.target.parentNode.id;
    let gameList = localStorage.getItem("gameList");
    gameList = JSON.parse(gameList);
    let gameYear, gameSummary, i;
    for(i = 0; i < gameList.length; i++)
    {
        if(gameList[i].id === gameName)
            break;
    }
    gameYear = gameList[i].Year;
    gameSummary = gameList[i].summary;
    prevGameIdx = i;

    document.getElementById("name").value = gameName;
    document.getElementById("year").value = gameYear;
    document.getElementById("summary").value = gameSummary;
}

function updateGame(gameData, prevGameIdx)
{
    let storageGame = localStorage.getItem("gameList");
    storageGame = JSON.parse(storageGame);
    let gameID = storageGame[prevGameIdx].id;
    let block = document.getElementById(gameID);
    let editBtn = document.getElementById(`edit:${gameID}`);
    let deleteBtn = document.getElementById(`delete:${gameID}`);

    block.id = gameData.name;
    editBtn.id = `edit:${gameData.name}`;
    deleteBtn.id = `delete:${gameData.name}`;

    block.children[0].innerHTML = `${gameData.name}`;
    block.children[1].innerHTML = `${gameData.Year}`;
    block.children[2].innerHTML = `${gameData.summary}`;

    storageGame[prevGameIdx].id = gameData.name;
    storageGame[prevGameIdx].name = gameData.name;
    storageGame[prevGameIdx].Year = gameData.Year;
    storageGame[prevGameIdx].summary = gameData.summary;

    localStorage.setItem("gameList", JSON.stringify(storageGame));
}

function delete_game(event)
{
    event.preventDefault();
    let gameName = event.target.parentNode.id;
    let block = document.getElementById(gameName);
    let editBtn = document.getElementById(`edit:${gameName}`);
    let deleteBtn = document.getElementById(`delete:${gameName}`);

    block.remove();
    editBtn.remove();
    deleteBtn.remove();

    let storageGame = localStorage.getItem("gameList");
    storageGame = JSON.parse(storageGame);
    for(let i = 0; i < storageGame.length; i++)
    {
        if(storageGame[i].id === gameName)
        {
            gameIndex = i;
            break;
        }
    }

    storageGame.splice(gameIndex, 1);
    localStorage.setItem("gameList", JSON.stringify(storageGame));
}

function refresh_render()
{
    let gameList = localStorage.getItem("gameList");
    gameList = JSON.parse(gameList);

    if(gameList != null)
        for(game of gameList)
            add_game(game);
}


function filter(string)
{
    let para = document.createElement("p");
    DOMPurify.sanitize(string);
    para.textContent = string;
    return para.innerHTML;
}

window.addEventListener("click", buttondealer);
window.addEventListener("DOMContentLoaded", refresh_render);
