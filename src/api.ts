
// Fetching

export async function fetchAllStates() {
  const response = await fetch("http://localhost:3005/state");
  return response.json();
}

export async function postStates(newStateData:{title:String}) {
  const response = await fetch("http://localhost:3005/state", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newStateData)
  });
  return response.json();
}

export async function deleteState(idToDelete:number) {
  await fetch("http://localhost:3005/state/" + idToDelete, {
      method: "DELETE"
  })
}