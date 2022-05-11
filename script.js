fetch('txt.json').then((response) => {
	return response.json()
}).then((data) => {

	let element = document.getElementById('timeline');

	function speaker(people){
		if(people == undefined) return ""
		else return `
			<p><i class="fa fa-microphone"></i> By <span>${people.join(', ')}</span></p>
		`
	}
	
	function description(desc){
		if(desc == undefined) return ""
		else return `
			<p class="desc">${desc}</p>
		`
	}

	function slot(venue, slots) {
		let result="";
		for (let i = 0; i < slots.length; i++) {
			result += `
				<div class="miniSchedule">
					<div class="timing">
						<p><i class="fa fa-clock-o"></i> ${slots[i].startTime} - ${slots[i].endTime}</p>
						<p><i class="fa fa-map-marker"></i> ${venue}</p>
						${speaker(slots[i].speakers)}
					</div>
					<div class="title">
						<h3>${slots[i].event}</h3>
						${description(slots[i].description)}
					</div>
				</div>
				<hr style="border: 1px dashed #dedede;">
  		`
		}

		return result
	}

	function template(data) {
		return `
			<div class="banner">
				<div class="day">
					<div class="dayNum">
						<div class="divide">
							<h3>DAY ${data.dayId}</h3>
							<h4>${data.date}</h4>
						</div>
					</div>
					<div class="arrow-right"></div>
				</div>
				<div class="date">
					${slot(data.venue, data.slots)}
				</div>
			</div>
		`
	}

	element.innerHTML = `
		<div class="heading">
			<h5>SCHEDULE<br>DETAILS</h5>
		</div>
		<p>${data.map(template).join('')}</p>    
  	`

})