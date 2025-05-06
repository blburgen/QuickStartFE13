import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { deleteState,postStates,fetchAllStates } from "./api"

export type StateType = {
    id: number
    title: string
  }

let stateList: StateType[] = [];

const stateContainer = document.getElementById("states-container") as HTMLDivElement;
const stateName = document.getElementById("stateName") as HTMLInputElement;

document.getElementById("save-button")!.addEventListener("click", OnStateClick);

// Render a list of States
function renderStateList() {
    // Clear out state
    stateContainer!.innerHTML = "";

    // If there are no states, shows message indicating it is empty
    if(stateList.length === 0){
        stateContainer!.innerHTML = "No States yet"
    }

    // for each state, map it to span that append to the container
    stateList.map(renderState).forEach(span => stateContainer!.appendChild(span));
}

// render each item

function renderState(state: StateType){
    const stateSpan = document.createElement("span");
    // spacing of each state
    stateSpan.className = "col-lg-3 col-md-4"
    //formate of each state with a delete button
    stateSpan.innerHTML = `
        ${state.title}
        <button id="delete-button" class="btn btn-sm btn-outline-danger">Delete</button>
    `
    //actions of the delete button
    stateSpan.querySelector("#delete-button")!.addEventListener("click", async () =>
    {
        await deleteState(state.id);

        const indexToDelete = stateList.indexOf(state);
        stateList.splice(indexToDelete, 1)

        renderStateList()
    })

    return stateSpan;
}

// When save button is clicked

async function OnStateClick(event: Event) {
    event.preventDefault();
    const stateData = {
        title: stateName.value
    };
    const createdState = await postStates(stateData);

    stateList.push(createdState);

    renderStateList();
    stateName.value = "";
}

// Start up

async function startUp() {
    renderStateList();
    stateList = await fetchAllStates()
    renderStateList();
}

startUp();