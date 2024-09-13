let delete_edit_container=document.querySelector('.edit_sem_container');
let sem_no_deleted=-1;

document.getElementById("edit_button").addEventListener('click',()=>{
    delete_edit_container.style.visibility='visible';
    document.querySelector(".edit_options_container").style.visibility='hidden';    
    let container = document.getElementById("delete_selection_container");
    sem_no_deleted=1;
    let content = "";
    // dymanic generation
    for (let i = 1; i < curr_sem_counts; i++) {
        content += `<option value="${i}">${i}</option>`;
    }
    container.innerHTML = content;
})

/* changing the value of the sem deletion*/
document.getElementById("delete_selection_container").addEventListener("change", () => {
    sem_no_deleted = document.getElementById("delete_selection_container").value;
});

document.getElementById("remove_sem_button").addEventListener('click',()=>{
    mark_storages.splice(sem_no_deleted-1,1);
    cpg_storages.splice(sem_no_deleted-1,1);
    
    if(curr_sem_counts !=1){
        curr_sem_counts--;
    }
    cpg_storages.forEach(element=>{
        if(element.curr_sem_counts>sem_no_deleted){
            element.curr_sem_counts--;
        }
    })
    main_display_changer();
    delete_edit_container.style.visibility='hidden';
})