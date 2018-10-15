function addClass(id, cl) {
	var e = document.getElementById(id);
	e.className += " " + cl;
}

function removeClass(id, cl) {
	var e = document.getElementById(id);
	e.classList.remove(cl);
}

Element.prototype.addClass = function(cl) {
	this.className += " " + cl;
}

Element.prototype.removeClass = function(cl) {
	this.classList.remove(cl);
}

function Project(ttl, img, flv, dsc, cl, lk, tgs) {
	this.title = ttl;
	this.image = img;
	this.flavor = flv;
	this.description = dsc;
	this.color = cl;
	this.link = lk;
	this.tagList = tgs;
}

/*var dojovote = new Project("DojoVote","/","a polling platform that allows you to generate and share polls all around the world", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown prr since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown pr", "#4158a9", "link",["HTML/CSS","JavaScript","mySQL","PHP"]);*/

var projectList =[];

//console.log(JSON.stringify("projectList.JSON"));

function loadJSON(callback) {   

	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', 'projects.JSON', false); // Replace 'my_data' with the path to your file
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
			callback(xobj.responseText);
		}
	};
	xobj.send(null);  
}

function displayProjects() {
	for (var i = 0; i < projectList.length; i++) {
		var proj = projectList[i];
		var pCard = document.createElement("div");
		pCard.id = proj.id;
		pCard.className = "projectCard";
		//pCard.onclick = function() {expand(this);};
		//title
		var header = document.createElement("h2");
		header.className = "projectTitle";
		header.innerHTML = proj.title;
		header.style.backgroundColor = proj.color;
		pCard.appendChild(header);
		//flavor
		var flavor = document.createElement("p");
		flavor.className = "projectFlavor";
		flavor.innerHTML = proj.flavor;
		flavor.style.backgroundColor = proj.color;
		pCard.appendChild(flavor);

		//description
		var description = document.createElement("p");
		description.className = "projectDescription";
		description.innerHTML = proj.description;
		pCard.appendChild(description);
		//img
		var imgDiv = document.createElement("div");
		imgDiv.className = "projectImage";
		var image = document.createElement("img");
		image.src = proj.image;
		imgDiv.appendChild(image);
		pCard.appendChild(imgDiv);
		//link
		var link = document.createElement("a");
		link.className = "projectLink"
		link.href = proj.link;
		link.innerHTML = "VIEW PROJECT";
		link.target = "_blank";
		link.style.backgroundColor = proj.color;
		pCard.appendChild(link);
		//tags
		var tagDiv = document.createElement("div");
		tagDiv.className = "tagList";
		for (var j = 0; j < proj.tagList.length; j++) {
			var tag = document.createElement("span");
			tag.className = "tag";
			tag.innerHTML = proj.tagList[j];
			tagDiv.appendChild(tag);
		}
		pCard.appendChild(tagDiv);

		document.body.appendChild(pCard);
	}
}

window.onload = function() {
	loadJSON(function(response) {
		projectList = JSON.parse(response);
		console.log(projectList);
	});
	console.log(projectList);
	displayProjects();
}