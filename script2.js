const first151Pokemon = 152;
let loadedPokemon = [];
let loadedPokemonNames = [];
let currentPokemon;
let currentIndex;
let statsNames = [];
let statsValues = [];
let moveNames = [];
let myChart;


async function loadPokemon() {
    document.getElementById('loadingSpinner').classList.add('lds-hourglass')
    for (let i = 1; i < first151Pokemon; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();

        if (currentPokemon) {
            await loadedPokemon.push(currentPokemon)
            await loadedPokemonNames.push(currentPokemon['name'])
        } else {
            console.log(currentPokemon);
        }
    }
    document.getElementById('loadingSpinner').classList.remove('lds-hourglass')
    await renderPokedex();
}


 function renderPokedex() {
    for (let i = 0; i < loadedPokemon.length; i++) {

        document.getElementById('pokedexContainer').innerHTML += htmlTemplate(i);

        document.getElementById('pictureOverlay').src = `${currentPokemon['sprites']['other']['home']['front_default']}`;

        if (currentPokemon['types']['1']) {
            document.getElementById(`type2.${i}`).innerHTML =  currentPokemon['types']['1']['type']['name'];
        }
        setBackground(i);
    }
}


function setBackground(i) {
    let type1 = document.getElementById(`type1.${i}`).innerHTML;
    let type2 = document.getElementById(`type2.${i}`).innerHTML;

    document.getElementById(`type1.${i}`).classList.add(type1 + 'BG');

    if (document.getElementById(`type2.${i}`).innerHTML != '') {
        document.getElementById(`type2.${i}`).classList.add(type2 + 'BG');
    }

    document.getElementById(`pokemon${i}`).classList.add(type1);
}


async function openOverlay(i) {
    toggle('overlay', 'remove');
    show();
    currentIndex = i;

    overlayTemplate(i);
}


async function overlayPrevious(i) {
    statsValues = [];
    moveNames = [];
    show();
    destroyChart();

    let previousPokemon = +currentIndex + i;

    if (previousPokemon < 0) {
    } else {
        overlayTemplate(previousPokemon);
        currentIndex = previousPokemon;
    }
}


async function overlayNext(i) {
    statsValues = [];
    moveNames = [];
    show();
    destroyChart();

    let nextPokemon = +currentIndex + i;

    if (nextPokemon >= first151Pokemon.length) {

    } else {
        overlayTemplate(nextPokemon);
        currentIndex = nextPokemon;
    }
}


function toggle(id, i) {
    document.getElementById(id).classList[i]('d-none');
}

function hide() {
    toggle('overlay', 'add');
    toggle('overlayHeightWeight', 'remove');
    toggle('chart', 'add');

    destroyChart();
}

function show() {
    toggle('chart', 'add');
    toggle('moves', 'add');
    toggle('overlayHeightWeight', 'remove');
}


function formatNumberWithComma(number) {
    const numberAsString = number.toString();
    const lastIndex = numberAsString.length - 1;

    if (lastIndex === 0) {
        return `0,${numberAsString}`;
    }

    const formattedNumber = numberAsString.slice(0, lastIndex) + ',' + numberAsString[lastIndex];
    return formattedNumber;
}


function draw() {
    const ctx = document.getElementById('myChart');

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: statsNames,
            datasets: [{
                label: 'Stats',
                data: statsValues,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function renderMoves() {
    document.getElementById('moves').innerHTML = '';

    for (let i = 0; i < moveNames.length; i++) {
        const move = moveNames[i];

        document.getElementById('moves').innerHTML += /*html*/`
        <div class="move">${move}</div>
    `
    }
}

function pushStats(overlayPokemon) {
    for (let i = 0; i < overlayPokemon['stats'].length; i++) {
        const name = overlayPokemon['stats'][i]['stat'];
        statsNames.push(name['name']);

        const value = overlayPokemon['stats'][i]['base_stat'];
        statsValues.push(value);
    }
}

function pushMoves(overlayPokemon) {
    for (let i = 0; i < overlayPokemon['moves'].length; i++) {
        const move = overlayPokemon['moves'][i]['move']['name'];
        moveNames.push(move);
    }
}

function destroyChart() {
    if (myChart) {
        myChart.destroy();
        statsValues = [];
        statsNames = [];
    }
}


function findPokemon() {
    let search = document.getElementById('search').value
    search = search.toLowerCase();

    const filteredPokemonNames = loadedPokemonNames.filter((pokemonName) => {
        return pokemonName.includes(search);
    });

    document.getElementById('pokedexContainer').innerHTML = '';

    if (search == '') {
        document.getElementById('search').disabled =true
        renderPokedex()
        document.getElementById('search').disabled =false
    } 
    else {
        for (let i = 0; i < filteredPokemonNames.length; i++) {
            const pokemonName = filteredPokemonNames[i];
            let element = loadedPokemonNames.indexOf(pokemonName);
            renderSearch(element++);
        }
    }
};


async function renderSearch(i) {
    document.getElementById('pokedexContainer').innerHTML += htmlTemplate(i);

    document.getElementById('pictureOverlay').src = `${currentPokemon['sprites']['other']['home']['front_default']}`;

    if (currentPokemon['types']['1']) {
        document.getElementById(`type2.${i}`).innerHTML = await currentPokemon['types']['1']['type']['name'];
    }
    setBackground(i);
}


function htmlTemplate(i) {
    return /*html*/`    
    <div id="pokemon${i}" class="pokedex" onclick="openOverlay('${i}')">
    <h1 id="name${i}">${loadedPokemon[i]['name']}</h1>
    <img  class="picture" src="${loadedPokemon[i]['sprites']['other']['home']['front_default']}" id="picture${i}" alt="">
    <span class="type" id="type1.${i}">${loadedPokemon[i]['types']['0']['type']['name']}</span>
    <span class="type" id="type2.${i}"></span>
    </div>`
}


function overlayTemplate(i) {
    let overlayPokemon = loadedPokemon[i]
    let overlayPokemonType = loadedPokemon[i]['types'][0]['type']['name'];

    document.getElementById('overlayCentre').className = '';
    document.getElementById('nameOverlay').innerHTML = overlayPokemon['name'];
    document.getElementById('pictureOverlay').src =
        overlayPokemon['sprites']['other']['home']['front_default'];
    document.getElementById('height').innerHTML =
        formatNumberWithComma(overlayPokemon['height']) + 'm';
    document.getElementById('weight').innerHTML =
        formatNumberWithComma(overlayPokemon['weight']) + 'kg';

    document.getElementById('overlayCentre').classList.add(overlayPokemonType, 'overlayCentre');

    pushStats(overlayPokemon)
    pushMoves(overlayPokemon)

    draw()
    renderMoves()
}


function showStats() {
    toggle('overlayHeightWeight', 'add');
    toggle('chart', 'remove');
    toggle('moves', 'add');
}

function showMoves() {
    toggle('overlayHeightWeight', 'add');
    toggle('chart', 'add');
    toggle('moves', 'remove');
}

function showHW() {
    toggle('overlayHeightWeight', 'remove');
    toggle('chart', 'add');
    toggle('moves', 'add');
}

function innerClick(event) {
    event.stopPropagation(); 
  }