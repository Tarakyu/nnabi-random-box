const startButton = document.querySelector("#startButton")
const container = document.querySelector(".container")


const total = 100
const first = 1
const second = 3
const third = 10
const fourth = 26
const fail = total - first - second - third - fourth
let results = [
    ...Array(first).fill("1등"),
    ...Array(second).fill("2등"),
    ...Array(third).fill("3등"),
    ...Array(fourth).fill("4등"),
    ...Array(fail).fill("꽝"),
]
startButton.addEventListener('click', startGame)

function selectItem(e) {
    const selectedItem = e.target
    selectedItem.classList.add('item--clicked')
    selectedItem.classList.add("r" + results[selectedItem.innerText-1])
    selectedItem.innerText = results[selectedItem.innerText-1]
    selectedItem.removeEventListener('click', selectItem)
}


function startGame() {
    container.innerHTML = ""
    results.sort(() => Math.random() - 0.5)
    for (var i = 0; i < total; i++){
        const item = document.createElement('button')
        item.innerText = i+1
        item.classList.add('item')
        item.addEventListener('click', selectItem)
        container.appendChild(item)
    }
}

startGame()