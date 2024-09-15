let subject_count=1;
let grade_point=10;
let credit_point=1;
let subject_name="";
let curr_sem_mark_storage=[];
let gpa;

let curr_sem_counts=JSON.parse(localStorage.getItem("curr_sem_count"));
let mark_storages=JSON.parse(localStorage.getItem("mark_storage")) || []; // containes all the semesters marks 
let cpg_storages=JSON.parse(localStorage.getItem("cpg_storage")) || []; //containes all the cgp of the semesters
//contains the entire marks of each sem


//add-grade extension js-code
//adding event listeners for the grade points and credit points

let grade_point_button=document.getElementById("grade_point").querySelector('select');
grade_point_button.addEventListener("change",()=>{
    grade_point=grade_point_button.value;
});

let credit_point_button=document.getElementById("credit_point").querySelector('select');
    credit_point_button.addEventListener("change",()=>{
    credit_point=credit_point_button.value;
});

//add-grade extension trigger js code
document.getElementById("add_grade_trigger").addEventListener("click",()=>{
    document.querySelector(".add_grade_container").style.visibility='visible';
});

function error_handling(sub_name){
    if(sub_name.length!=0){
        return true;
    }else{
        navigator.vibrate(200);
        const container = document.getElementById('subject_name');
            container.classList.add('vibrate');
            setTimeout(() => {
                container.classList.remove('vibrate');
            }, 400);
    }
}

//adding event listeners for the gpa_show_container buttons

document.getElementById("edit_button").addEventListener('click',()=>{
    document.querySelector(".gpa_shower_container").style.visibility='hidden';
    document.getElementById("congrs-lottie-animation").style.visibility='hidden';
})
document.getElementById("return_home").addEventListener('click',()=>{
    mark_storages.push({curr_sem_counts:curr_sem_mark_storage});
    cpg_storages.push({curr_sem_counts:curr_sem_counts,gpa:gpa});
    curr_sem_counts++;
    localStorage.setItem("curr_sem_count",JSON.stringify(curr_sem_counts));
    localStorage.setItem("mark_storage",JSON.stringify(mark_storages));
    localStorage.setItem("cpg_storage",JSON.stringify(cpg_storages));
    window.location.href="../index.html";
})

//!main function that calculates the gpa
document.getElementById("calculate_gpa").addEventListener("click",()=>{
    let total_grade_point=0
    let total_credit_point=0
    curr_sem_mark_storage.forEach((Element)=>{
        total_credit_point+=parseInt(Element.credit_point)*10;
        total_grade_point+=parseInt(Element.credit_point)*parseInt(Element.grade_point);
    })
    gpa=((total_grade_point/total_credit_point)*10).toFixed(2);
    document.getElementById("gpa_text").innerHTML=gpa;    document.querySelector(".gpa_shower_container").style.visibility='visible';
    document.getElementById("congrs-lottie-animation").style.visibility='visible';
    
})

//!edit button
document.getElementById("edit").addEventListener("click",()=>{
    let edit_container=document.querySelector(".edit_subject_container");
    edit_container.style.visibility='visible';
    selection_box_changes();
})
document.getElementById("remove_subject_button").addEventListener("click",()=>{
    let edit_container=document.querySelector(".edit_subject_container");
    edit_container.style.visibility='hidden';
    deleting_subject();
})