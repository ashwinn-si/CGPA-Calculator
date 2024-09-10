let subject_count=1;
let grade_point=10;
let credit_point=1;
let curr_sem_mark_storage=[];
let gpa;
//TODO CAHNGE THE SUBJECT COUNT INTO SUBJECT NAME AND PUSH THE SUBJECT NAME INTO CURR_SEM_MARK_STORGAE 

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

document.getElementById('add_subject_button').addEventListener("click",()=>{
    
});

//add-grade extension trigger js code
document.getElementById("add_grade_trigger").addEventListener("click",()=>{
    document.getElementById("subject_counter").innerHTML=subject_count;
    document.querySelector(".add_grade_container").style.visibility='visible';
});


//adding event listeners for the gpa_show_container buttons

document.getElementById("edit_button").addEventListener('click',()=>{
    document.querySelector(".gpa_shower_container").style.visibility='hidden';
})
document.getElementById("return_home").addEventListener('click',()=>{
    mark_storages.push({curr_sem_counts:curr_sem_mark_storage});
    cpg_storages.push({curr_sem_counts:curr_sem_counts,gpa:gpa});
    curr_sem_counts++;
    localStorage.setItem("curr_sem_count",JSON.stringify(curr_sem_counts));
    localStorage.setItem("mark_storage",JSON.stringify(mark_storages));
    localStorage.setItem("cpg_storage",JSON.stringify(cpg_storages));
    window.location.href="home-page/index.html";
})

//main function that calculates the gpa
document.getElementById("calculate_gpa").addEventListener("click",()=>{
    let total_grade_point=0
    let total_credit_point=0
    curr_sem_mark_storage.forEach((Element)=>{
        total_credit_point+=parseInt(Element.credit_point)*10;
        total_grade_point+=parseInt(Element.credit_point)*parseInt(Element.grade_point);
    })
    gpa=((total_grade_point/total_credit_point)*10).toFixed(2);
    document.getElementById("gpa_text").innerHTML=gpa;    document.querySelector(".gpa_shower_container").style.visibility='visible';
})