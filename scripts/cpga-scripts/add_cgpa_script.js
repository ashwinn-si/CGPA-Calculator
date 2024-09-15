function erorr_handler(from_sem,to_sem){
    if(from_sem>=to_sem){
        navigator.vibrate(200);
        let container = document.getElementById(`cgpa_from`);
        container.classList.add('vibrate');
        setTimeout(() => {
            container.classList.remove('vibrate');
        }, 400);
        return false;
    }
    return true;
}
document.getElementById('add_cgpa_button').addEventListener('click',()=>{
    document.getElementById('from_sem_text').innerHTML=curr_sem_counts;
    document.querySelector('.add_cpga_container').style.visibility='visible';
    cgpa_button_key=true;
})

document.getElementById("add_cpga_submit").addEventListener('click',()=>{
    let cgpa=parseFloat(document.getElementById('cgpg_scored').value)
    let from_sem=curr_sem_counts;
    let to_sem=parseFloat(document.getElementById('cgpa_to').value)
    if(error_catcher(cgpa,"cgpg_scored") && error_catcher_sem(to_sem,"cgpa_to") && erorr_handler(from_sem,to_sem)){
        for(let i=from_sem;i<=to_sem;i++){
            cpg_storages.push({curr_sem_counts:curr_sem_counts,gpa:"NOT GIVEN"});
            mark_storages.push({curr_sem_counts:null});
            curr_sem_counts++;
        }
        total_cgpa_scored=cgpa;
        main_display_changer();
        
        document.querySelector('.add_cpga_container').style.visibility='hidden';
    }
    
})
