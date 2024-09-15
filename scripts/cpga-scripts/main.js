let mark_storages=JSON.parse(localStorage.getItem("mark_storage")) || []; // containes all sem marks with subject
let cpg_storages=JSON.parse(localStorage.getItem("cpg_storage")) || []; //containes all the cgp of the semesters
//contains the entire marks of each sem
let alert_message=JSON.parse(localStorage.getItem("alert")) || true;
let curr_sem_counts=JSON.parse(localStorage.getItem("curr_sem_count"))||1;

//reset button text

alert("Press the reset button before using the calculator. After completing your calculations, press reset again to clear all data and prepare the calculator for the next use.")

document.getElementById("reset_button").addEventListener('click',()=>{
    mark_storages=[];
    cpg_storages=[];
    curr_sem_counts=1;
    document.getElementById("cpga-displayer").innerHTML = "";
    document.getElementById("cpga-displayer").style.visibility = 'hidden';
    document.getElementById("main_edit_button").style.visibility = 'hidden';
    main_display_changer();
})

//input_checker
function error_catcher(score,element_id){
    if(score>=0 && score<=10){
        return true
    }else{
        navigator.vibrate(200);
        const container = document.getElementById(`${element_id}`);
            container.classList.add('vibrate');
            setTimeout(() => {
                container.classList.remove('vibrate');
            }, 400);
        return false;
    }
}

function grade_adder(){
    if(error_catcher(parseFloat(document.getElementById("cpg_scored").value),"cpg_scored")){
        cpg_storages.push({curr_sem_counts:curr_sem_counts,gpa:document.getElementById("cpg_scored").value});
        mark_storages.push({curr_sem_counts:null});
        curr_sem_counts++;
        main_display_changer();
        document.querySelector(".pop_up_container").style.visibility='hidden';
    }
}
document.getElementById("add_sem_gpa_button").addEventListener('click',()=>{
    document.querySelector(".pop_up_container").style.visibility='visible';
});
document.getElementById("cpg_scored").addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        grade_adder();
    }
});

document.getElementById("submit_button").addEventListener('click',()=>{
    grade_adder();
});
document.getElementById("dont_know_button").addEventListener('click',()=>{
    document.querySelector(".pop_up_container").style.visibility='hidden';
    localStorage.setItem("curr_sem_count",JSON.stringify(curr_sem_counts));
    localStorage.setItem("mark_storage",JSON.stringify(mark_storages));
    localStorage.setItem("cpg_storage",JSON.stringify(cpg_storages));
    window.location.href="gpa-page/index.html";
})

let container=document.querySelector(".container_1");

function main_display_changer(){
    if(cpg_storages.length!=0){
        let inner_text='';
        cpg_storages.forEach((Element)=>{
            inner_text+=`<div id="sem-${Element.curr_sem_counts}"       class="each_semcontainer">
                    <div><p>SEM ${Element.curr_sem_counts}</p></div>
                    <div><p>${Element.gpa}</p></div>
                </div>`
        })
        container.innerHTML=inner_text;
        document.querySelector('.predict_container').style.visibility='visible';
        document.getElementById("main_edit_button").style.visibility='visible';
    }else{
        container.innerHTML="";
        document.querySelector('.predict_container').style.visibility='hidden';
    }

}


document.getElementById("cal_cpga_button").addEventListener('click',()=>{
    let total_gpa=0;
    cpg_storages.forEach((Element)=>{
        total_gpa+=parseFloat(Element.gpa);
    })
    document.getElementById("cpga-displayer").innerHTML = ((total_gpa / ((curr_sem_counts - 1) * 10))*10).toFixed(3);
    document.getElementById("cpga-displayer").style.visibility='visible';
})

//edit main container
document.getElementById("main_edit_button").addEventListener('click',()=>{
    document.querySelector(".edit_options_container").style.visibility='visible';
})
document.getElementById("return_button").addEventListener('click',()=>{
    document.querySelector(".edit_options_container").style.visibility='hidden';
})
main_display_changer(); //!rendering the page one time 