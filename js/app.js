// Select Elements 
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const clear = document.querySelector(".clear");

// Class names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "lineThrough";

// Variables 
let LIST, id;

// getting item from localstorage
let data = localStorage.getItem("TODO");

// if data is not empty
if(data){
	LIST = JSON.parse(data);
	// set the id to the last one in the list
	id = LIST.length;
	// load the list to the UI
	loadList(LIST);
} else {
	// if data is empty.
	LIST = [];
	id = 0;
}

// load items to the UI
function loadList(array){
	array.forEach(function(item){
		addToDo(item.name, item.id, item.done, item.trash);
	});
}

// clear the local storage
clear.addEventListener("click", function(){
	localStorage.clear();
	location.reload();
});


// display today's date.
const options = {weekday:"long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to-do function
function addToDo(toDo, id, done, trash) {
	if(trash){ return; }
	const DONE = done ? CHECK : UNCHECK;
	const LINE = done ? LINE_THROUGH : "";

	const text = `<li class="item">
					<i class="far ${DONE} co" job="complete" id="${id}"></i>
					<p class="text ${LINE}"> ${toDo} </p>
					<i class="de fa fa-trash" job="delete" id="${id}"></i>
				</li>`;
	const position = "beforeend";

	list.insertAdjacentHTML(position, text)
}

// add an item to the list
document.addEventListener("keyup", function(even) {
	if(event.keyCode == 13 ){
		const toDo = input.value;

		// if the input isn't empty
		if(toDo) {
			addToDo(toDo);
			LIST.push({
				name : toDo,
				id : id,
				done : false,
				trash : false,
			});

			// add item to local storage
			localStorage.setItem("TODO", JSON.stringify(LIST));

			id++;
		}
		input.value = "";
	}
});

// complete to do
function completeToDo(element){
	element.classList.toggle(CHECK);
	element.classList.toggle(UNCHECK);
	element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

	LIST[element.id].done = LIST[element.id].done ? false : true;

}

// remove to do
function removeToDo(element){
	element.parentNode.parentNode.removeChild(element.parentNode);
	LIST[element.id].trash = true;
}

// target the items created dynamically
list.addEventListener("click", function(event){
	const element = event.target;
	const elementJob = element.attributes.job.value;

	if(elementJob == "complete"){
		completeToDo(element);
	} else if(elementJob == "delete"){
		removeToDo(element);
	}

	// add item to local storage
	localStorage.setItem("TODO", JSON.stringify(LIST));
});