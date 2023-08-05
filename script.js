const first151PokemonNames = ["bulbasaur","ivysaur","venusaur","charmander","charmeleon","charizard","squirtle","wartortle","blastoise","caterpie","metapod","butterfree","weedle","kakuna","beedrill","pidgey","pidgeotto","pidgeot","rattata","raticate","spearow","fearow","ekans","arbok","pikachu","raichu","sandshrew","sandslash","nidoran-f","nidorina","nidoqueen","nidoran-m","nidorino","nidoking","clefairy","clefable","vulpix","ninetales","jigglypuff","wigglytuff","zubat","golbat","oddish","gloom","vileplume","paras","parasect","venonat","venomoth","diglett","dugtrio","meowth","persian","psyduck","golduck","mankey","primeape","growlithe","arcanine","poliwag","poliwhirl","poliwrath","abra","kadabra","alakazam","machop","machoke","machamp","bellsprout","weepinbell","victreebel","tentacool","tentacruel","geodude","graveler","golem","ponyta","rapidash","slowpoke","slowbro","magnemite","magneton","farfetchd","doduo","dodrio","seel","dewgong","grimer","muk","shellder","cloyster","gastly","haunter","gengar","onix","drowzee","hypno","krabby","kingler","voltorb","electrode","exeggcute","exeggutor","cubone","marowak","hitmonlee","hitmonchan","lickitung","koffing","weezing","rhyhorn","rhydon","chansey","tangela","kangaskhan","horsea","seadra","goldeen","seaking","staryu","starmie","mr-mime","scyther","jynx","electabuzz","magmar","pinsir","tauros","magikarp","gyarados","lapras","ditto","eevee","vaporeon","jolteon","flareon","porygon","omanyte","omastar","kabuto","kabutops","aerodactyl","snorlax","articuno","zapdos","moltres","dratini","dragonair","dragonite","mewtwo","mew"];
let currentPokemon;
let currentIndex;


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

    /*let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let response = await fetch(url);
    currentPokemon = await response.json();

    console.log(currentPokemon)
    renderPokedex()*/
}

async function renderPokedex(i){
    //let nameVar = first151PokemonNames[`${i}`];

    document.getElementById('pokedexContainer').innerHTML += /*html*/`    
    <div id="pokemon${i}" class="pokedex" onclick="openOverlay('${i}')">
    <h1 id="name${i}">${currentPokemon['name']}</h1>
    <img class="picture" src="${currentPokemon['sprites']['other']['home']['front_default']}" id="picture${i}" alt="">
    <span class="type" id="type1.${i}">${currentPokemon['types']['0']['type']['name']}</span>
    <span class="type" id="type2.${i}"></span>
    </div>
    `

    //Overlaytest
    document.getElementById('pictureOverlay').src =`${currentPokemon['sprites']['other']['home']['front_default']}`
        
    if (currentPokemon['types']['1']) {
        document.getElementById(`type2.${i}`).innerHTML =  await currentPokemon['types']['1']['type']['name']
    }

    setBackground(i)





 //   document.getElementById('name').innerHTML = currentPokemon['name'];
   // document.getElementById('picture').src = currentPokemon['sprites']['other']['home']['front_default']
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
    toggle('remove')
    currentIndex = i;

    let url = `https://pokeapi.co/api/v2/pokemon/${first151PokemonNames[i]}`;
    let response = await fetch(url);
    let overlayPokemon = await response.json();
    let overlayPokemonType = overlayPokemon['types']['0']['type']['name'];

    document.getElementById('overlayCentre').className = '';
    
    document.getElementById('nameOverlay').innerHTML = overlayPokemon['name'];
    document.getElementById('pictureOverlay').src = overlayPokemon['sprites']['other']['home']['front_default'];

    document.getElementById('height').innerHTML = formatNumberWithComma(overlayPokemon['height'])+'m'
    document.getElementById('weight').innerHTML = formatNumberWithComma(overlayPokemon['weight'])+'kg'

    document.getElementById('overlayCentre').classList.add(overlayPokemonType, 'overlayCentre')
}

async function overlayPrevious(i){
    let previousPokemon = +currentIndex+i

    if (previousPokemon < 0) {
        
    } else {
        let url = `https://pokeapi.co/api/v2/pokemon/${first151PokemonNames[previousPokemon]}`;
        let response = await fetch(url);
        let overlayPokemon = await response.json();
        let overlayPokemonType = overlayPokemon['types']['0']['type']['name'];
    
        document.getElementById('overlayCentre').className = '';
        
        document.getElementById('nameOverlay').innerHTML = overlayPokemon['name'];
        document.getElementById('pictureOverlay').src = overlayPokemon['sprites']['other']['home']['front_default'];

        document.getElementById('height').innerHTML = formatNumberWithComma(overlayPokemon['height'])+'m'
        document.getElementById('weight').innerHTML = formatNumberWithComma(overlayPokemon['weight'])+'kg'
    
        document.getElementById('overlayCentre').classList.add(overlayPokemonType, 'overlayCentre')
    
        currentIndex = previousPokemon 
    }
}


async function overlayNext(i){
    let nextPokemon = +currentIndex+i

    if (nextPokemon >= first151PokemonNames.length) {
        //document.getElementById('next').disabled = true
    } else {
    let url = `https://pokeapi.co/api/v2/pokemon/${first151PokemonNames[nextPokemon]}`;
    let response = await fetch(url);
    let overlayPokemon = await response.json();
    let overlayPokemonType = overlayPokemon['types']['0']['type']['name'];

    document.getElementById('overlayCentre').className = '';
    
    document.getElementById('nameOverlay').innerHTML = overlayPokemon['name'];
    document.getElementById('pictureOverlay').src = overlayPokemon['sprites']['other']['home']['front_default'];

    document.getElementById('height').innerHTML = formatNumberWithComma(overlayPokemon['height'])+'m'
    document.getElementById('weight').innerHTML = formatNumberWithComma(overlayPokemon['weight'])+'kg'

    document.getElementById('overlayCentre').classList.add(overlayPokemonType, 'overlayCentre')

    currentIndex = nextPokemon
    }

}

function toggle(i){
    document.getElementById('overlay').classList[i]('d-none')
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