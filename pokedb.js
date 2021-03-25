var pokeHistory = []
function pokeInfo(search, replaceSearchbox, ignoreHistory) {
	if (!ignoreHistory){
		history.pushState({}, "", "")
		pokeHistory.push($('#pokemon-name').html())
	}

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

	$('#pokemon-img').attr("src", pokedata[sint - 1]["art_url"])

	$('#pokemon-name').html(pokedata[sint - 1]["name"])
	var types = "";
	for (var i = pokedata[sint-1]["types"].length - 1; i >= 0; i--) {
		types += pokedata[sint-1]["types"][i].toUpperCase() + " "
	}
	$('#pokemon-type').html(types)
	$('#pokemon-desc').html(pokedata[sint-1]["description"])
 	$('#pokemon-pkdx-id').html("PKDX ID: " + sint)

 	$('#evo-table').html("")
 	var evo_table = ""
 	for (var i = pokedata[sint-1]["evolutions"].length - 1; i >= 0; i--) {
 		var pkmid = pokedex[pokedata[sint-1]["evolutions"][i]["to"]]
 		var pkmname = pokedata[sint-1]["evolutions"][i]["to"].toUpperCase()
 		evo_table += '<tr><td><a href="#" id="evo-option" onclick="pokeInfo('+pkmid+', true, false)">'+pkmname+"</a></td></tr>"
 	}
 	$('#evo-table').html(evo_table)
}

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}


var pokedata = []
var pokedex = []
$.getJSON("pokedata.json", function(json) {
	pokedata = json;
	console.log(json)
})
$.getJSON("pokedex.json", function(json) {
	pokedex = json;
	console.log(json)
})


$(".searchbox").on('keyup', function (e) {
	pokeInfo($("#searchbox").val(), false, false)
})

window.onpopstate = function(event) {
	pokeInfo(pokeHistory.pop(), true, true)
}