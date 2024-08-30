let subject_count=1;
let mark_storage=[];
let grade_point=1;
let credit_point=1;

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
    mark_storage.push({subject_no:subject_count,credit_point:credit_point,grade_point:grade_point});
    subject_count++;
    document.querySelector(".add_grade_container").style.visibility='hidden';
});


//add-grade extension trigger js code
document.getElementById("add_grade_trigger").addEventListener("click",()=>{
    document.getElementById("subject_counter").innerHTML=subject_count;
    document.querySelector(".add_grade_container").style.visibility='visible';
});