// fetch('txt.json').then((response) => {
// 	return response.json()
// }).then((data) => {

// 	let element = document.getElementById('timeline');

// 	function speaker(people){
// 		if(people == undefined) return ""
// 		else return `
// 			<p><i class="fa fa-microphone"></i> By <span>${people.join(', ')}</span></p>
// 		`
// 	}

// 	function description(desc){
// 		if(desc == undefined) return ""
// 		else return `
// 			<p class="desc">${desc}</p>
// 		`
// 	}

// 	function slot(venue, slots) {
// 		let result="";
// 		for (let i = 0; i < slots.length; i++) {
// 			result += `
// 				<div class="miniSchedule">
// 					<div class="timing">
// 						<p><i class="fa fa-clock-o"></i> ${slots[i].startTime} - ${slots[i].endTime}</p>
// 						<p><i class="fa fa-map-marker"></i> ${venue}</p>
// 						${speaker(slots[i].speakers)}
// 					</div>
// 					<div class="title">
// 						<h3>${slots[i].event}</h3>
// 						${description(slots[i].description)}
// 					</div>
// 				</div>
// 				<hr style="border: 1px dashed #dedede;">
//   		`
// 		}

// 		return result
// 	}

// 	function template(data) {
// 		return `
// 			<div class="banner">
// 				<div class="day">
// 					<div class="dayNum">
// 						<div class="divide">
// 							<h3>DAY ${data.dayId}</h3>
// 							<h4>${data.date}</h4>
// 						</div>
// 					</div>
// 					<div class="arrow-right"></div>
// 				</div>
// 				<div class="date">
// 					${slot(data.venue, data.slots)}
// 				</div>
// 			</div>
// 		`
// 	}

// 	element.innerHTML = `
// 		<div class="heading">
// 			<h5>SCHEDULE<br>DETAILS</h5>
// 		</div>
// 		<p>${data.map(template).join('')}</p>    
//   	`

// })


function description(plusId) {
	let descId = 'desc' + plusId[plusId.length - 1]
	let element = document.getElementById(descId).style;
	let plus = document.getElementById(plusId).style;
	if (element.display == 'block') {
		element.display = "none";
		plus.transform = "rotate(0)";
		plus.color = "black"
	}
	else {
		element.display = "block";
		plus.transform = "rotate(45deg)";
		plus.color = "#ec4963"
	}
}

function contactForm() {
	let form = document.getElementById("contact").style
	if (form.display == 'block') {
		form.display = "none";
		document.getElementsByClassName('speaker').style.filter = "brightness(100%)"
	}
	else {
		form.display = "block";
		document.getElementsByClassName('speaker').style.filter = "brightness(60%)"
		// form.filter = "brightness(100%)"
	}
}

function closeForm(){
	let form = document.getElementById("contact").style
	form.display = "none"
	// document.getElementById('body').style.filter = "brightness(100%)"
}

function clearError(id) {
	var error = document.getElementsByClassName("formerror")
	for (item of error) {
		item.innerHTML = ""
	}
}

function setError(id, error) {
	var element = document.getElementById(id)
	element.getElementsByClassName("formerror")[0].innerHTML = `
		<br><p>${error}</p>
	`
}

function validateForm() {
	var validation = true
	clearError()

	var name = document.forms["myForm"]["fname"].value;
	if (name.length == 0) {
		setError("name", "*Name cannot be blank.")
		validation = false
	}
	if (name.length < 5) {
		setError("name", "*Name too short.")
		validation = false
	}
	if (name.length > 40) {
		setError("name", "*Name too long.")
		validation = false
	}

	let mail = document.forms["myForm"]["femail"].value;
	if (mail.length < 10) {
		setError("email", "*Email too short.")
		validation = false
	}
	
	if (!mail.includes('@')) {
		setError("email", "*Email invalid.")
		validation = false
	}

	let phone = document.forms["myForm"]["fphone"].value;
	if (phone.length != 10) {
		setError("phone", "*Phone number invalid.")
		validation = false
	}
	
	let ticket = document.forms["myForm"]["fticket"].value;

	if (validation == true) {
		window.localStorage.setItem('name', name);
		window.localStorage.setItem('mail', mail);
		window.localStorage.setItem('phone', phone);
		window.localStorage.setItem('ticket', ticket);
		
		emailjs.send("service_gkmw1s4", "template_02wwrjr", {
			to_name: name,
			mail_name: mail,
			phone: phone,
			ticket: ticket,
		}).then(message => {
			alert('mail send successfully!');
			location.reload();
		});
	}

	return false;
}