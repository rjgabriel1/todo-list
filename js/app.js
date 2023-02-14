// object of tasks
var data = (localStorage.getItem('todoList'))? JSON.parse(localStorage.getItem('todoList')):{
    todo: [],
    completed:[]
};


const removeSVG = '<svg version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
const completeSVG = '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px"><path class="fill" d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z"/></svg>';

renderTodoList();



const btnAdd = document.getElementById('add');
btnAdd.addEventListener("click", () => {
    var value = document.getElementById('item').value;
    if (value) {
        addItem(value);
    } 
});

document.getElementById("item").addEventListener('keydown', function(e){
    var value = this.value;

    if (e.code === "Enter" && value) {
        addItem(value);
    }
})


function addItem(value) {
    addItemToDom(value);
    document.getElementById('item').value = '';
    data.todo.push(value);
    dataObjectUpated();
}
//render data
function renderTodoList() {
    if (!data.todo.length && !data.completed.length) return;

    for (let i = 0; i < data.todo.length; i++){ 
        var value = data.todo[i];
        addItemToDom(value);
    }
    
    for (let j = 0; j < data.completed.length; j++){
        var value = data.completed[j];
        addItemToDom(value, true);
    }
}
//add data to localStorage
function dataObjectUpated() {
   localStorage.setItem('todoList',JSON.stringify(data))
}

//  Remove item from the list
function removeItem() {
    var item = this.parentNode.parentNode
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;
    if (id =="todo") {
        data.todo.splice(data.todo.indexOf(value), 1);
        
    } else {
        data.completed.splice(data.todo.indexOf(value), 1); 
    }
    dataObjectUpated();

    
    parent.removeChild(item);  
}

function completeTask() {
    var item = this.parentNode.parentNode
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText
   
if (id =="todo") {
    data.todo.splice(data.todo.indexOf(value), 1);
    data.completed.push(value);
} else {
    data.completed.splice(data.todo.indexOf(value), 1);
    data.todo.push(value);
}
dataObjectUpated();
// check if the task should be added to the completed list or to re-added to the todo list.
    var target = (id === "todo") ? document.getElementById("completed") : document.getElementById("todo");
    parent.removeChild(item); 
    target.insertBefore(item, target.childNodes[0]);
}

//Add item to the list
function addItemToDom(value,completed) {
    const list = (completed)?document.getElementById("completed"):document.getElementById("todo");
    const item = document.createElement("li");
    item.innerText = value


    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    const remove = document.createElement("button");
    remove.classList.add("remove");
    remove.innerHTML = removeSVG;
// Add eventListener to the remove button
    remove.addEventListener("click",removeItem)
    
    const complete = document.createElement("button");
    complete.classList.add("complete");
    complete.innerHTML = completeSVG;

    //Add eventListener to the complete button
    complete.addEventListener("click",completeTask)
    buttons.appendChild(remove);
    buttons.appendChild(complete);

    item.appendChild(buttons)
    list.insertBefore(item, list.childNodes[0]);
}