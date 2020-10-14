
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener("DOMContentLoaded", () => {
    fetchTrainers()
})

function fetchTrainers() {
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(trainers => trainers.forEach(trainer => {renderTrainer(trainer)}))
}

function renderTrainer(trainer) {
   
    const addStuff = document.getElementById("add-stuff")
    const card = document.createElement("div")
    card.className = "card"
    
    // name stuff
    let name = document.createElement("h2")
    name.innerText = trainer.name
    //button stuff
    let button = document.createElement("button")
    button.innerText = "Add Pokemon"
    button.addEventListener("click", () => newPokemon(trainer))
    
    //pokemon stuff
    let ul = document.createElement("ul")
    ul.className = "ul"
    ul.id = `trainer-${trainer.id}`
    trainer.pokemons.map(p => {
        let li = document.createElement("li")
        li.className = "li"
        li.innerText = `${p.nickname}, (${p.species})`
        ul.appendChild(li)
})
    
    //appendStuff
    addStuff.append(card)
    card.append(name, button, ul)
}

function newPokemon(trainer) {


   
    obj = {
        trainer_id: trainer.id
    }

    fetch(POKEMONS_URL, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(obj)
    })
    .then(res => res.json())
    .then(appendPokemon)
}

// create a new li with name and species and append that to the trainer with id
function appendPokemon(pokemon) {
   
    let li = document.createElement("li")
   let ul = document.querySelector(`#trainer-${pokemon.trainer_id}`)
   console.log(ul)
    li.innerText = `${pokemon.nickname}, (${pokemon.species})`

    ul.appendChild(li)
    
}