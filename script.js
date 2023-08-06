const first151PokemonNames = ["bulbasaur","ivysaur","venusaur","charmander","charmeleon","charizard","squirtle","wartortle","blastoise","caterpie","metapod","butterfree","weedle","kakuna","beedrill","pidgey","pidgeotto","pidgeot","rattata","raticate","spearow","fearow","ekans","arbok","pikachu","raichu","sandshrew","sandslash","nidoran-f","nidorina","nidoqueen","nidoran-m","nidorino","nidoking","clefairy","clefable","vulpix","ninetales","jigglypuff","wigglytuff","zubat","golbat","oddish","gloom","vileplume","paras","parasect","venonat","venomoth","diglett","dugtrio","meowth","persian","psyduck","golduck","mankey","primeape","growlithe","arcanine","poliwag","poliwhirl","poliwrath","abra","kadabra","alakazam","machop","machoke","machamp","bellsprout","weepinbell","victreebel","tentacool","tentacruel","geodude","graveler","golem","ponyta","rapidash","slowpoke","slowbro","magnemite","magneton","farfetchd","doduo","dodrio","seel","dewgong","grimer","muk","shellder","cloyster","gastly","haunter","gengar","onix","drowzee","hypno","krabby","kingler","voltorb","electrode","exeggcute","exeggutor","cubone","marowak","hitmonlee","hitmonchan","lickitung","koffing","weezing","rhyhorn","rhydon","chansey","tangela","kangaskhan","horsea","seadra","goldeen","seaking","staryu","starmie","mr-mime","scyther","jynx","electabuzz","magmar","pinsir","tauros","magikarp","gyarados","lapras","ditto","eevee","vaporeon","jolteon","flareon","porygon","omanyte","omastar","kabuto","kabutops","aerodactyl","snorlax","articuno","zapdos","moltres","dratini","dragonair","dragonite","mewtwo","mew"];
let currentPokemon;
let currentIndex;
let statsNames =[];
let statsValues =[];
let moveNames =[];
let myChart;


async function loadPokemon(){
    for (let i = 0; i < first151PokemonNames.length; i++) {
        const element = first151PokemonNames[i];

        let url = `https://pokeapi.co/api/v2/pokemon/${element}`;
        let response = await fetch(url);
        currentPokemon = await response.json();

        if (currentPokemon) {
            renderPokedex(i)
        }else{
            console.log(currentPokemon)
        }   
    }
}

async function renderPokedex(i){
    document.getElementById('pokedexContainer').innerHTML += htmlTemplate(i)

    document.getElementById('pictureOverlay').src =`${currentPokemon['sprites']['other']['home']['front_default']}`
        
    if (currentPokemon['types']['1']) {
        document.getElementById(`type2.${i}`).innerHTML =  await currentPokemon['types']['1']['type']['name']
    }
    setBackground(i)
}

 function setBackground(i){
    let type1 = document.getElementById(`type1.${i}`).innerHTML
    let type2 = document.getElementById(`type2.${i}`).innerHTML

    document.getElementById(`type1.${i}`).classList.add(type1+'BG')

    if (document.getElementById(`type2.${i}`).innerHTML != '') {
         document.getElementById(`type2.${i}`).classList.add(type2+'BG')
    } 

    document.getElementById(`pokemon${i}`).classList.add(type1)
}

async function openOverlay(i){
    toggle('overlay','remove')
    currentIndex = i;

    let url = `https://pokeapi.co/api/v2/pokemon/${first151PokemonNames[i]}`;
    overlayTemplate(url)

    destroyChart()
}

async function overlayPrevious(i){
    statsValues =[];
    moveNames =[];
    show();
    destroyChart();

    let previousPokemon = +currentIndex+i

    if (previousPokemon < 0) {
    } else {
        let url = `https://pokeapi.co/api/v2/pokemon/${first151PokemonNames[previousPokemon]}`;
        overlayTemplate(url)
        currentIndex = previousPokemon 
    }
}


async function overlayNext(i){
    statsValues =[];
    moveNames =[];
    show()
    destroyChart();

    let nextPokemon = +currentIndex+i

    if (nextPokemon >= first151PokemonNames.length) {
        
    } else {
    let url = `https://pokeapi.co/api/v2/pokemon/${first151PokemonNames[nextPokemon]}`;
    overlayTemplate(url)
    currentIndex = nextPokemon
    }
}

function toggle(id, i){
    document.getElementById(id).classList[i]('d-none')
}

function hide(){
    toggle('overlay','add')
    toggle('overlayHeightWeight','remove')
    toggle('chart','add')
}

function show(){
    toggle('chart','add')
    toggle('moves','add')
    toggle('overlayHeightWeight','remove')
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

function draw(){
    const ctx = document.getElementById('myChart');

    myChart= new Chart(ctx, {
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

function renderMoves(){
    document.getElementById('moves').innerHTML ='';

    for (let i = 0; i < moveNames.length; i++) {
        const move = moveNames[i];

        document.getElementById('moves').innerHTML += /*html*/`
        <div class="move">${move}</div>
    `
    }
}

function pushStats(overlayPokemon){
    for (let i = 0; i < overlayPokemon['stats'].length; i++) {
        const name = overlayPokemon['stats'][i]['stat'];
        statsNames.push(name['name'])

        const value = overlayPokemon['stats'][i]['base_stat']
        statsValues.push(value)
    }
}

function pushMoves(overlayPokemon){
    for (let i = 0; i < overlayPokemon['moves'].length; i++) {
        const move = overlayPokemon['moves'][i]['move']['name'];
        moveNames.push(move)
    }
}

function destroyChart(){
    if (myChart) {
        myChart.destroy();
        statsValues = [];
        statsNames = [];
    }
}

function htmlTemplate(i){
    return /*html*/`    
    <div id="pokemon${i}" class="pokedex" onclick="openOverlay('${i}')">
    <h1 id="name${i}">${currentPokemon['name']}</h1>
    <img class="picture" src="${currentPokemon['sprites']['other']['home']['front_default']}" id="picture${i}" alt="">
    <span class="type" id="type1.${i}">${currentPokemon['types']['0']['type']['name']}</span>
    <span class="type" id="type2.${i}"></span>
    </div>`
}

function overlayTemplate(url) {
    fetch(url)
      .then((response) => response.json())
      .then((overlayPokemon) => {
        const overlayPokemonType = overlayPokemon['types'][0]['type']['name'];
  
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
      })
      .catch((error) => {
        console.error('Fehler bei der Verarbeitung des Pokémon-Overlays:', error);
      });
  }
  

  function showStats(){
    toggle('overlayHeightWeight','add')
    toggle('chart','remove')
    toggle('moves','add')
  }

function showMoves(){
    toggle('overlayHeightWeight','add')
    toggle('chart','add')
    toggle('moves','remove')
}  