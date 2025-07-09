window.onload = function()
{
    const today = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    const Datefrom = today.toLocaleDateString("en-US", options);
    document.getElementById("todayDate").innerText = Datefrom;

    const in_colorId = document.querySelectorAll(".color-option")
        for(let clickedOption of in_colorId){
            clickedOption.addEventListener("click",function(){for(let otherOption of in_colorId)
                {
                    otherOption.classList.remove("selected")
                }
            clickedOption.classList.add("selected")
            document.getElementById("selectedColor").value = clickedOption.dataset.color
            })
        }

    const taskform = document.getElementById("taskform")
    const taskList = document.getElementById("taskList")


    taskform.addEventListener("submit",function(event)
    {
        event.preventDefault()

        let valid = true

        const input_taskName = document.getElementById("in_taskName")
        if(input_taskName.value.trim()===""){
            input_taskName.style.border = "2px solid red"
            if(valid===true){input_taskName.focus()}
            const error_taskName = document.getElementById("error_taskName")
            error_taskName.innerText = "Please enter a task name."
            valid = false
        }
        
        const input_note = document.getElementById("in_note")
        if(input_note.value.length > 100){
            input_note.style.border = "2px solid red"
            if(valid===true){input_note.focus()}
            const error_Notes = document.getElementById("error_Notes")
            error_Notes.innerText = "No more than 100 words"
            valid = false
        }

        const input_priority = document.getElementById("in_priority")
        if(input_priority.value === ""){
            input_priority.style.border="2px solid red"
            if(valid===true){input_priority.focus()}
            const error_priority = document.getElementById("error_priority")
            error_priority.innerText="Please select priority"
            valid = false
        }

        const in_beginTime = document.getElementById("in_beginTime").value
        const in_endTime = document.getElementById("in_endTime").value
        
        if (!valid) return;

        const taskCard = document.createElement("div")
        taskCard.classList.add("task-card")

        const selectedColor = document.getElementById("selectedColor").value
        const spanSelectedColor =document.createElement("span")
        spanSelectedColor.classList.add("colorStyle")
        spanSelectedColor.style.background = selectedColor
        spanSelectedColor.dataset.color = selectedColor
        taskCard.insertBefore(spanSelectedColor, taskCard.firstChild)

        const spanNametaskName = document.createElement("span")
        spanNametaskName.innerText = input_taskName.value
        taskCard.appendChild(spanNametaskName)

        const spanNameNote = document.createElement("span")
        spanNameNote.innerText = input_note.value
        taskCard.appendChild(spanNameNote)

        const spanNamePriority = document.createElement("span")
        spanNamePriority.classList.add("task-priority")
        spanNamePriority.innerText = input_priority.value
        taskCard.appendChild(spanNamePriority)

        const spanNameBeginTime = document.createElement("span")
        spanNameBeginTime.innerText = in_beginTime
        taskCard.appendChild(spanNameBeginTime)

        if(in_beginTime && in_endTime){
        
        const spanNameEndTime = document.createElement("span")
        spanNameEndTime.innerText = in_endTime
        taskCard.appendChild(spanNameEndTime)

        const today = new Date().toISOString().split("T")[0];
        const fullBegin = `${today}T${in_beginTime}`
        const fullEnd =`${today}T${in_endTime}`
        const beginTime = new Date(fullBegin)
        const endTime = new Date(fullEnd)

        const spanFormattedTime = document.createElement("span")
        taskCard.appendChild(spanFormattedTime)
        let diff = (endTime - beginTime) / 1000

        const spanButton = document.createElement("span")
        spanButton.classList.add("button");
        spanButton.innerText = "Start"
        taskCard.appendChild(spanButton) 

        let timer
        let isrunning = false
        spanButton.addEventListener("click",function(){
            if(isrunning === false){
                isrunning = true
                timer = setInterval(()=>{
                    if (diff<=0)  
                {
                    spanFormattedTime.innerText = "Time's up!"
                    clearInterval(timer)
                    return;
                }
                let hours = Math.floor(diff / 3600).toString().padStart(2, "0")
                let minutes = Math.floor((diff % 3600) / 60).toString().padStart(2, "0")
                let seconds = Math.floor(diff % 60).toString().padStart(2, "0")
                    
                spanFormattedTime.innerText = `${hours}:${minutes}:${seconds}`
                diff--;
                }, 1000)
                spanButton.innerText = "Pause"
            }else{
                isrunning = false
                clearInterval(timer);
                spanButton.innerText = "Start"
            }
        })
        }

        const spanDeletButton = document.createElement("span")
        spanDeletButton.innerText = "Cancel"
        spanDeletButton.style.cursor = "pointer"
        spanDeletButton.classList.add("spanDeletButton")
        spanDeletButton.addEventListener("click",function(){taskCard.remove()})
        taskCard.appendChild(spanDeletButton)

        taskList.appendChild(taskCard)

    })

    const filterButton = document.getElementById("applyFilter");
    filterButton.addEventListener("click", function(event) {
        event.preventDefault();
        
        const colorFilterValue = document.getElementById("filterColor").value;
        const priorityFilterValue = document.getElementById("filterPriority").value;
        const allTasks = Array.from(document.querySelectorAll(".task-card"));
        const taskList = document.getElementById("taskList");
        
        const matched = [];
        const unmatched = [];
        
        for (let task of allTasks) {
            const priority = task.querySelector(".task-priority").innerText;
            const color = task.querySelector(".colorStyle").dataset.color;
            
            const matchColor = colorFilterValue === "" || color === colorFilterValue;
            const matchPriority = priorityFilterValue === "" || priority === priorityFilterValue;
            
            if (matchColor && matchPriority) {
                matched.push(task);
            } else {
                unmatched.push(task);
            }
        }
        
        taskList.innerHTML = "";
        
        matched.forEach(task => taskList.appendChild(task));
        unmatched.forEach(task => taskList.appendChild(task));
    });

}