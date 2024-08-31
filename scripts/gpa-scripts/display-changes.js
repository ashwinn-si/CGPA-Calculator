//adding event listeners to add the context mark to the main screen

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
document.getElementById('add_subject_button').addEventListener('click',()=>{
    //storing the marks value
    curr_sem_mark_storage.push({subject_no:subject_count,credit_point:credit_point,grade_point:grade_point});

    //changing the inner html
    document.querySelector('.subject_no').innerHTML+=`<p id="sub-no-${subject_count}" class="context">${subject_count}</p>`;
    document.querySelector('.credit_point').innerHTML+=`<p id="sub-credit-${subject_count}" class="context">${curr_sem_mark_storage[subject_count-1].credit_point}</p>`;
    document.querySelector('.grade_point').innerHTML+=`<p id="sub-grade-${subject_count}" class="context">${grade_getter(curr_sem_mark_storage[subject_count-1].grade_point)}</p>`;

    //changes he display settings
    document.querySelector(".add_grade_container").style.visibility='hidden';
    subject_count++;
})