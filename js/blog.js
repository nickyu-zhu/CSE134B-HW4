window.addEventListener("click", buttondealer);
window.addEventListener("DOMContentLoaded", refresh_render);

function buttondealer(event){
    event.preventDefault();
    if(event.target.id === "game-btn")
    {
        dialog_show();
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
    else if(event.target.id.toString().substring(0, 4) === "edit")
    {
        edit_game(event);
    }
    else if(event.target.id.toString().substring(0, 6) === "delete")
    {
        delete_game(event);
    }
}

function dialog_show()
{
    let dialog = document.getElementById("dialog");
    let name = document.getElementById("name");
    let year = document.getElementById("year");
    let summary = document.getElementById("summary");
    let submitBtn = document.getElementById("submit-btn");
    let cancelBtn = document.getElementById("cancel-btn");

    
    name.value = "";
    year.value = "";
    summary.value = "";
    dialog.open = true;
}

function submit(event)
{
    let form = document.getElementById("game-form");
    let gameName = document.getElementById("name");
    let gameYear = document.getElementById("year");
    let gameSummary = document.getElementById("summary");

    if(form.checkValidity())
    {
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
    

        if(event.target.innerHTML === "Submit")
        {
            gameList.push(gameData);
            add_game(gameList[gameList.length - 1]);
            localStorage.setItem("gameList", JSON.stringify(gameList));
        } else if(event.target.innerHTML === "Save"){
            updateGame(gameData, prevGameIdx);
        }
        dialog.open = false;
    }
    else
        form.reportValidity();

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

let prevGameIdx;
function edit_game(event)
{
    event.preventDefault();
    dialog_show();

    let saveBtn = document.getElementById("submit-btn");
    saveBtn.innerHTML = "Save";
    let gameName = event.target.parentNode.id;
    let gameList = localStorage.getItem("gameList");
    gameList = JSON.parse(gameList);
    let gameYear = gameList.find((game) => game.id === gameName);
    gameYear = gameYear.Year;
    let gameSummary = gameList.find((game) => game.id === gameName);
    gameSummary = gameSummary.summary;
    prevGameIdx = gameList.map((game) => game.id).indexOf(event.target.parentNode.id);

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
    let gameIndex = storageGame.map((game) => game.id).indexOf(gameName);

    storageGame.splice(gameIndex, 1);
    localStorage.setItem("gameList", JSON.stringify(storageGame));
}

function refresh_render(event)
{
    event.preventDefault();
    let gameList = localStorage.getItem("gameList");
    gameList = JSON.parse(gameList);

    if(gameList != null)
    {
        console.log(gameList);
        for(game of gameList)
        {
            add_game(game);
        }
        
    }
    
}


function filter(string)
{
    let para = document.createElement("p");
    DOMPurify.sanitize(string);
    para.textContent = string;
    return para.innerHTML;
}
