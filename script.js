const first151PokemonNames = ["bulbasaur","ivysaur","venusaur","charmander","charmeleon","charizard","squirtle","wartortle","blastoise","caterpie","metapod","butterfree","weedle","kakuna","beedrill","pidgey","pidgeotto","pidgeot","rattata","raticate","spearow","fearow","ekans","arbok","pikachu","raichu","sandshrew","sandslash","nidoran-f","nidorina","nidoqueen","nidoran-m","nidorino","nidoking","clefairy","clefable","vulpix","ninetales","jigglypuff","wigglytuff","zubat","golbat","oddish","gloom","vileplume","paras","parasect","venonat","venomoth","diglett","dugtrio","meowth","persian","psyduck","golduck","mankey","primeape","growlithe","arcanine","poliwag","poliwhirl","poliwrath","abra","kadabra","alakazam","machop","machoke","machamp","bellsprout","weepinbell","victreebel","tentacool","tentacruel","geodude","graveler","golem","ponyta","rapidash","slowpoke","slowbro","magnemite","magneton","farfetchd","doduo","dodrio","seel","dewgong","grimer","muk","shellder","cloyster","gastly","haunter","gengar","onix","drowzee","hypno","krabby","kingler","voltorb","electrode","exeggcute","exeggutor","cubone","marowak","hitmonlee","hitmonchan","lickitung","koffing","weezing","rhyhorn","rhydon","chansey","tangela","kangaskhan","horsea","seadra","goldeen","seaking","staryu","starmie","mr-mime","scyther","jynx","electabuzz","magmar","pinsir","tauros","magikarp","gyarados","lapras","ditto","eevee","vaporeon","jolteon","flareon","porygon","omanyte","omastar","kabuto","kabutops","aerodactyl","snorlax","articuno","zapdos","moltres","dratini","dragonair","dragonite","mewtwo","mew"];
let currentPokemon;


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

    document.getElementById('pokedexContainer').innerHTML += /*html*/`    
    <div id="pokemon${i}" class="pokedex">
    <h1 id="name${i}">${currentPokemon['name']}</h1>
    <img class="picture" src="${currentPokemon['sprites']['other']['home']['front_default']}" id="picture${i}" alt="">
    <span class="type" id="type1.${i}">${currentPokemon['types']['0']['type']['name']}</span>
    <span class="type" id="type2.${i}"></span>
    </div>
    `
        
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