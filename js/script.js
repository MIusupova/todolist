'use strict';

//forEach
//const newNums = [5, 6, 54, 12, 1, 10]
//nums.forEach(num => console.log(num))

//map
//старый подход
//const newNums = []
//for(let num of nums){
//    newNums.push(num*2)
//}
//console.log(newNums);

//новый подход
//const newNums = nums.map(num => num*2)  
//console.log(newNums);

//если много действии
//const newNums = nums.map(num => {console.log('работает!');
//return num*2 //return возвращаем выражение
//})  
//console.log(newNums);

//часто пользуются map и filter

//filter
//старый подход
//const even = []
//for(let num of numsss){
//    if(num % 2 === 0){
//        even.push(num)
//    }
//}
//console.log(even);

//новый подход
//const even = numsss.filter(num => num % 2 === 0) // true или false, вернет только true
//JSON.stringify - преобразует обьект в строку
//JSON.parse - преобразует JSON в javascript

const input = document.querySelector('input');
const button = document.querySelector('button');
const todoItems = document.querySelector('ul');
const select = document.querySelector('.todo__options')

let arrTaskObjects = 
    localStorage.getItem('arrTaskObjects') !== null 
        ? JSON.parse(localStorage.getItem('arrTaskObjects')) 
        : [];
let taskId = 
    localStorage.getItem('id') !== null ? +localStorage.getItem('id') : 0;

const renderTasks = (arrTaskObjects) => {
    todoItems.innerHTML = '';

    localStorage.setItem('id', taskId)
    localStorage.setItem('todoItems', JSON.stringify(arrTaskObjects));

    for(let taskObject of arrTaskObjects) {
        const task = document.createElement('li')
        task.classList.add(
            'todo__item', 
            taskObject.completed ? 'completed' : 'active'
        );
        todoItems.append(task)
        const taskText = document.createElement('span')
        taskText.classList.add('todo__task')
        task.append(taskText);
        taskText.innerText = taskObject.value;
        task.dataset.id = taskObject.id;
        task.innerHTML += `
            <div class = 'todo__date'> ${taskObject.date}</div>
            <span class= 'todo__action todo__action_complete'></span>`;
        const deleteBtn = document.createElement('span');
        deleteBtn.classList.add('todo__action', 'todo__action_delete');
        task.append(deleteBtn);
    };
};
const getInputValue = (event) => {
    event.preventDefault();
    select.value = 'all';
    if(input.value.trim() !== ''){
        localStorage.setItem('id', taskId);
        localStorage.setItem('arrTaskObjects', JSON.stringify(arrTaskObjects))
        const taskObject = {
            value: input.value,
            date: new Date().toLocaleDateString().slice(0, -3),
            completed: false,
            id: taskId,
        };
        arrTaskObjects.push(taskObject)
        renderTasks(arrTaskObjects)
        taskId++;
        input.value = '';
    }
};
const deleteTask = (task) => {
    arrTaskObjects = arrTaskObjects.filter
        (taskObj => taskObj.id !== +task.dataset.id 
    );
    renderTasks(arrTaskObjects)
};
const completeTask = (task) => {
    arrTaskObjects = arrTaskObjects.map((taskObject) => 
        taskObject.id === +task.dataset.id
            ?   {
                    value: taskObject.value,
                    date: taskObject.date,
                    completed: taskObject.id,
                    id: taskObject.id,
                }
            :   taskObject
    );
    renderTasks(arrTaskObjects);
};
console.log(arrTaskObjects);
todoItems.addEventListener('click', (event) => {
    if (event.target.classList.contains('todo__action_delete')){
        deleteTask(event.target.parentNode);
    }
    if(event.target.classList.contains('todo__action_complete')){
        completeTask(event.target.parentNode);
}
});
button.addEventListener('click', getInputValue)

const filterActive = (arr) => {
    let arrFilterActive = [];
    arrFilterActive = arr.filter((task) => !task.completed);
    renderTasks(arrFilterActive)

}
const filterCompletedTasks = (arr) => {
    let arrTaskObjectsCompl = [];
    arrTaskObjectsCompl = arr.filter((task) => task.completed);
    renderTasks(arrTaskObjectsCompl);
};

select.addEventListener('click', (event) => {
    if (event.target.value === 'all') {
        renderTasks(arrTaskObjects);
    } else if (event.target.value === 'active') {
        filterActive(arrTaskObjects)
    } else if (event.target.value === 'completed') {
        filterCompletedTasks(arrTaskObjects)
    }
});