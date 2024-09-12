let mark_storages=JSON.parse(localStorage.getItem("mark_storage")) || []; // containes all sem marks with subject
let cpg_storages=JSON.parse(localStorage.getItem("cpg_storage")) || []; //containes all the cgp of the semesters
//contains the entire marks of each sem
let curr_sem_counts=JSON.parse(localStorage.getItem("curr_sem_count"))||1;

document.getElementById("add_sem_gpa_button").addEventListener('click',()=>{
    document.querySelector(".pop_up_container").style.visibility='visible';
});

document.getElementById("submit_button").addEventListener('click',()=>{
    document.querySelector(".pop_up_container").style.visibility='hidden';
    cpg_storages.push({curr_sem_counts:curr_sem_counts,gpa:document.getElementById("cpg_scored").value});
    mark_storages.push({curr_sem_counts:null});
    curr_sem_counts++;
    main_display_changer();
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