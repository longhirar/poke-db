var pokeHistory = []

function evoButton(name, id) {

	let disabled = !pokedex[capitalize(name.toLowerCase())]

	return `<button ${disabled ? "disabled" : ""} type="button" class="btn btn-primary" onclick="pokeInfo('${id}', true, false)">${name}</button>`;
}

function pokeInfo(search, replaceSearchbox, ignoreHistory) {
	var sint = parseInt(search)

	if(sint > 0){	
    	//Get pokemon data from pokedex id (line number)
    	console.log(sint)
 		
    } else {
    	//Find wether or not it is a valid pokemon name, get his pokedex id, then get data about it.
    	sint = pokedex[capitalize(search.toLowerCase())];
    	if(sint > 151 || sint < 1){
    		return; // Checking boundaries for 1st generation pokedex
    	}
    }

    // if replaceSearchbox is set, then replace the search box with current pokemon name
    if(replaceSearchbox){$('#searchbox').val(pokedata[sint - 1]["name"])}

	let img_url = `https://corsproxy.io/?${encodeURIComponent(pokedata[sint - 1]["art_url"])}`;
	$('#pokemon-img').attr("src", img_url);

	$('#pokemon-name').html(pokedata[sint - 1]["name"])
	var types = "";
	for (var i = pokedata[sint-1]["types"].length - 1; i >= 0; i--) {
		types += `<span class="badge text-bg-primary">${pokedata[sint-1]["types"][i].toUpperCase()}</span>`
	}
	$('#pokemon-type').html(types)
	$('#pokemon-desc').html(pokedata[sint-1]["description"])
 	$('#pokemon-pkdx-id').html("PKDX ID: " + sint)

 	$('#pokemon-evos-buttons').empty();
 	
	console.log('evos');
	pokedata[sint-1]["evolutions"].forEach(evo => {
		$('#pokemon-evos-buttons')[0].innerHTML += evoButton(evo["to"], evo["to"]);
		console.log($('#pokemon-evos-buttons')[0].innerHTML);
	});
 	// for (var i = pokedata[sint-1]["evolutions"].length - 1; i >= 0; i--) {
 	// 	var pkmid = pokedex[pokedata[sint-1]["evolutions"][i]["to"]]
 	// 	var pkmname = pokedata[sint-1]["evolutions"][i]["to"].toUpperCase()
 	// 	evo_table += 
 	// }
	// console.log(evo_table);
	console.log('pos-evos');
 	$('#pokemon-evos-buttons').html(evo_table)
}

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}


var pokedata = []
var pokedex = []
$.getJSON("static/pokedata.json", function(_pokedata) {
	$.getJSON("static/pokedex.json", function(_pokedex) {
		pokedata = _pokedata;
		pokedex = _pokedex;
		pokeInfo(`${Math.floor(Math.random() * Object.keys(pokedex).length) + 1}`, true, false);

	})
})


$("#searchbox").on('keyup', function (e) {
	pokeInfo($("#searchbox").val(), false, false)
})

window.onpopstate = function(event) {
	pokeInfo(pokeHistory.pop(), true, true)
}
