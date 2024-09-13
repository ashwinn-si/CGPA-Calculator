let modify_edit_container=document.querySelector('.modify_container');
let sem_no_modify=-1;
document.getElementById("modify_sem_button").addEventListener('click',()=>{
    modify_edit_container.style.visibility='visible';
    document.querySelector(".edit_options_container").style.visibility='hidden';    
    let container = document.getElementById("modify_selection_container");
    sem_no_modify=1;
    let content = "";
    // dymanic generation
    for (let i = 1; i < curr_sem_counts; i++) {
        content += `<option value="${i}">${i}</option>`;
    }
    container.innerHTML = content;
})

document.getElementById("modify_selection_container").addEventListener("change", () => {
    sem_no_modify = document.getElementById("modify_selection_container").value;
});

document.getElementById("modify_button").addEventListener('click',()=>{
    if(error_catcher(parseFloat(document.getElementById("modify_new_gpa").value))){
        cpg_storages.forEach(element=>{
            if(element.curr_sem_counts==sem_no_modify){
                element.gpa=document.getElementById("modify_new_gpa").value;
            }
        })
        main_display_changer();
        modify_edit_container.style.visibility='hidden';
    }
})