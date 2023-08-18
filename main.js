/* Outline:
User's POV/Frontend:
Website with a blank and submit button
Input username
->
Backend:
Search for the cheese page of that player - if not valid username, stop
Collect every entry of cheese - move between pages by taking the next page link. while loop?
Sort by lowest block count
Display x many
->
Frontend:
Displayed page of lowest cheese count with all original things. Perhaps a different aesthetic though.

Extend:
- other cheese modes
- can choose max time/number displayed
*/

//https://jstris.jezevec10.com/cheese?display=5&user=justdumpedafatone&lines=100L

const { JSDOM } = require( "jsdom" ); 

const { window } = new JSDOM("", { 
	url: "https://jstris.jezevec10.com/u/justdumpedafatone", 
}); 
const $ = require( "jquery" )( window ); 
 
const runs = [];

const toRemove = /\s+|\n/g;

function stripText(jqueryObj) {
    return jqueryObj.text().replace(toRemove, '');
}

$.get("https://jstris.jezevec10.com/cheese?display=5&user=justdumpedafatone", function(html) { 
    // get list of all 100L cheese runs
	const cheeseRunsList = $(html).find("tr").filter(function() {
        return this.tagName.toLowerCase() === "tr"; // Filter only <tr> elements
    }); 

	cheeseRunsList.each(function( i ) { 
		const row = $(cheeseRunsList[i]);
		// 8 attributes: #	Name	Time	Blocks	PPS	Finesse	Date	Replay
		const runAttributes = row.find("td");
		
		if (typeof runAttributes[0] === "undefined") {
			
		} else {
			const run = { 
				number: stripText($(runAttributes[0])),
				name: stripText($(runAttributes[1])),
				time: stripText($(runAttributes[2])), 
				blocks: stripText($(runAttributes[3])),
				pps: stripText($(runAttributes[4])),
				finesse: stripText($(runAttributes[5])),
				date: stripText($(runAttributes[6])),
				replay: $(runAttributes[7]).find("a").attr("href")
			}; 

			runs.push(run); 
		}

	}); 

	console.log(JSON.stringify(runs)); 
});
