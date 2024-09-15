function grade_getter(value){
    let grade='0';
    switch(value){
        case '10':
            grade='O';
            break;
        case '9':
            grade='A+';
            break;
        case '8':
            grade='A';
            break;
        case '7':
            grade='B+';
            break;
        case '6':
            grade='B';
            break;
        case '5':
            grade='C';
            break;
        case '0':
            grade='U';
    }
    return grade;
}

function main_container_display_changer(){
    document.querySelector('.subject_no').innerHTML=" <p class='sub_header'>subject<br>Name</p>";
    document.querySelector(".credit_point").innerHTML="<p class='sub_header'>credit<br>point</p>"
    document.querySelector(".grade_point").innerHTML="<p class='sub_header'>grade<br>point</p>"

    curr_sem_mark_storage.forEach(element=>{
        document.querySelector('.subject_no').innerHTML+=`<p id="sub-no-${element.subject_count}" class="context">${element.subject_name}</p>`;
        document.querySelector('.credit_point').innerHTML+=`<p id="sub-credit-${element.subject_count}" class="context">${element.credit_point}</p>`;
        document.querySelector('.grade_point').innerHTML+=`<p id="sub-grade-${element.subject_count}" class="context">${element.grade_point}</p>`;
    })
}


document.getElementById('add_subject_button').addEventListener('click',()=>{
    //retreving the subject name
    subject_name=document.getElementById("subject_name").value;
    if(error_handling(subject_name)){
        //storing the marks value
        curr_sem_mark_storage.push({subject_no:subject_count,subject_name:subject_name,credit_point:credit_point,grade_point:grade_point});

        //changes the display settings
        main_container_display_changer();

        document.querySelector(".add_grade_container").style.visibility='hidden';
        subject_count++;
    }
})

//!changing the selection box content
let subject_no_deleted = 1; // Default subject no to be deleted

function selection_box_changes() {
    let container = document.getElementById("selection_container");
    subject_no_deleted=1;
    let content = "";
    // dymanic generation
    for (let i = 1; i < subject_count; i++) {
        content += `<option value="${i}">${i}</option>`;
    }
    container.innerHTML = content;
}

// Update `subject_no_deleted` when a new option is selected
document.getElementById("selection_container").addEventListener("change", () => {
    subject_no_deleted = document.getElementById("selection_container").value;
});

// Simulate the subject deletion logic
function deleting_subject() {
    curr_sem_mark_storage.splice(subject_no_deleted-1, 1);
    //changing other subject no by 1
    curr_sem_mark_storage.forEach(element => {
        if(element.subject_no>subject_no_deleted){
           element.subject_no-=1;
        }
    });
    if(subject_count !=1){
        subject_count--;
    }
    main_container_display_changer()
}
