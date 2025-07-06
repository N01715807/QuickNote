window.onload = function()
{
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

    })
}