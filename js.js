const startButton = document.querySelector("#startButton")
const container = document.querySelector(".container")
const labels = document.querySelectorAll(".labels")
const settings = document.querySelectorAll(".settings")
const counters = document.querySelectorAll(".counters")


let total = 100
let first = 0
let second = 0
let third = 0
let fourth = 0
let fifth = 0
let fail = total - first - second - third - fourth - fifth
let results = []
let initialSetting = [100, 0, 0, 0, 0, 0, 100]
let names = ["전체", "1등", "2등", "3등", "4등", "5등", "꽝"]
let counts = [100, 0, 0, 0, 0, 0, 100]

startButton.addEventListener('click', startGame)
settings.forEach(input => {
    input.addEventListener('input', calcFail)
})

function selectItem(e) {
    const selectedItem = e.target
    const result = selectedItem.dataset.result
    selectedItem.classList.add('item--clicked')
    selectedItem.classList.add("r" + result +"등")
    selectedItem.innerText = names[result]
    selectedItem.removeEventListener('click', selectItem)
    counts[result] -= 1
    setCounters()
}


function startGame() {
    if (settings[6].innerText == "?") {
        alert("입력값 오류")
        return
    }
    startButton.disabled = true
    container.classList.remove("container--default")
    for (i = 1; i < 6; i++){
        names[i] = labels[i].value
    }
    for (i = 0; i < 6; i++){
        initialSetting[i] = parseInt(settings[i].value)
    }
    initialSetting[6] = parseInt(settings[i].innerText)
    for (i = 1; i < 7; i++){
        counts[i] = initialSetting[i]
    }
    setCounters()
    results = [
        ...Array(initialSetting[1]).fill(1),
        ...Array(initialSetting[2]).fill(2),
        ...Array(initialSetting[3]).fill(3),
        ...Array(initialSetting[4]).fill(4),
        ...Array(initialSetting[5]).fill(5),
        ...Array(initialSetting[6]).fill(6)
    ]
    container.innerHTML = ""
    results.sort(() => Math.random() - 0.5)
    for (var i = 0; i < initialSetting[0]; i++){
        const item = document.createElement('button')
        item.innerText = i+1
        item.classList.add('item')
        item.addEventListener('click', selectItem)
        item.dataset.result = results[i]
        container.appendChild(item)
    }
}

function calcFail(e) {
    for (i = 0; i < 6; i++){
        initialSetting[i] = parseInt(settings[i].value)
    }
    settings[6].innerText = initialSetting[0] - initialSetting[1] - initialSetting[2] - initialSetting[3] - initialSetting[4] - initialSetting[5]
    if (parseInt(settings[6].innerText) < 0 || settings[6].innerText == "NaN") {
        settings[6].innerText = "?"
    }
}

function setCounters() {
    for (i = 1; i < 7; i++){
        counters[i].innerText = counts[i]
    }
}

