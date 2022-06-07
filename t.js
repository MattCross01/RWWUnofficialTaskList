  // Dummy data (implemented soon, tasks do not align. Mapping ul Soon)
 
  // FRONTEND FUNCTIONS

  const tasks = [
    {
        id: 1,
        task: "Clear Current Pallet",
    },
    {
        id: 2,
        task: "Finish Code For Work",
    },
    {
        id: 3,
        task: "Create Finished Pallet",
    },
    {
        id: 4,
        task: "Clear Out Prextex",
    },
    {
        id: 5,
        task: "Check with Taylor for eBay Listing Needs",
    },
    {
        id: 6,
        task: "Inspect/List Unopened Items"
    }
    ]; 

 
 // Create a "close" button and append it to each list item

   var myNodelist = document.getElementsByTagName("LI");
   var i;
   for (i = 0; i < myNodelist.length; i++) {
     var span = document.createElement("SPAN");
     var txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.appendChild(txt);
      myNodelist[i].appendChild(span);
 }

   // Click on close button to remove item from list 

   var close = document.getElementsByClassName("close");
   var i;
   for (i = 0; i < close.length; i++) {
     close[i].onclick = function() {
       var div = this.parentElement;
       div.style.display = "none";
     }
   }

    // Add a "checked" symbol when clicking on a list item

     var list = document.querySelector('ul');
        list.addEventListener('click', function(ev) {
            if (ev.target.tagName === 'LI') {
                ev.target.classList.toggle('checked');
            }
        }, false);

    // Create a new list item when clicking on the "Add" button

    function newElement() {
        const li = document.createElement("li");
        const inputValue = document.getElementById("myInput").value + "";
        const t = document.createTextNode(inputValue);
        li.appendChild(t);
        if (inputValue === '') {
            alert("Error #1: You must type something!");
        } else {
            document.getElementById("myUL").appendChild(li);
        }
        document.getElementById("myInput").value = "";

        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
          span.className = "close";
            span.appendChild(txt);
            li.appendChild(span);
    
           for (i = 0; i < close.length; i++) {
               close[i].onclick = function() {
                    var div = this.parentElement;
                    div.style.display = "none";
              }
           }
        }

        // SAVES DATA TO LOCAL STORAGE

        function saveData() {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }

        // LOADS DATA FROM LOCAL STORAGE

        function loadData() {
            const loadedTasks = JSON.parse(localStorage.getItem("tasks"));  // JSON parse turn string into object
            if (loadedTasks !== null) {
                tasks.push(...loadedTasks);
                renderTasks();
            }
        }

        // RENDER TASKS

        function renderTasks() {
            const tasksList = document.getElementById("myUL");
            tasksList.innerHTML = "";
            tasks.forEach(item => {
                const li = document.createElement("li");
                li.innerText = item.task;
                tasksList.appendChild(li);
            });
        }

        // EVENT LISTENERS

        document.getElementById("myBtn").addEventListener("click", newElement);
        document.getElementById("myUL").addEventListener("click", saveData);
        document.addEventListener("DOMContentLoaded", loadData);
        document.addEventListener("DOMContentLoaded", renderTasks);

        // -----------------------------------------------------------------------------------------------------------------------------// 

        // BACKEND FUNCTIONS
         
        const express = require('express');
        const app = express();
        const port = 3000;
        app.listen(port, () => console.log(`Listening on port ${port}`));
        app.use(express.static('public'));

        // ROUTES 

        app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
        app.get('/tasks', (req, res) => res.send(tasks));
        app.post('tasks', (req, res) => {
            tasks.push(req.body);
            res.send(tasks);
        }, (err) => console.log(err));
        app.put('/tasks/:id', (req, res) => {
            const { id } = req.params;
            const task = tasks.find(task => task.id === id);
            task.task = req.body.task;
            res.send(tasks);
        }, (err) => console.log(err));
            app.put('tasks', (req, res) => {
            tasks.push(req.body);
            res.send(tasks);
        }
        , (err) => console.log(err));
        app.delete('/tasks/:id', (req, res) => {
            const { id } = req.params;
            tasks = tasks.filter(task => task.id !== id);
            res.send(tasks);
        },
        (err) => console.log(err));
        app.delete('tasks', (req, res) => {
            tasks = [];
            res.send(tasks);
        },
        (err) => console.log(err));
        app.get('/tasks/:id', (req, res) => {
            const { id } = req.params;
            const task = tasks.find(task => task.id === id);
            res.send(task);
        }, (err) => console.log(err));