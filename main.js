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
				number: $(runAttributes[0]).text(),
				name: $(runAttributes[1]).text(),
				time: $(runAttributes[2]).text(), 
				blocks: $(runAttributes[3]).text(),
				pps: $(runAttributes[4]).text(),
				finesse: $(runAttributes[5]).text(),
				date: $(runAttributes[6]).text(),
				replay: $(runAttributes[7]).attr("href")
			}; 

			runs.push(run); 
		}

	}); 

	console.log(JSON.stringify(runs)); 
});
