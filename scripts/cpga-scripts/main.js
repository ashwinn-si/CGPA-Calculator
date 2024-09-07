let mark_storages=JSON.parse(localStorage.getItem("mark_storage")) || []; // containes all the semesters marks 
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
    display_changes();
});

document.getElementById("dont_know_button").addEventListener('click',()=>{
    document.querySelector(".pop_up_container").style.visibility='hidden';
    localStorage.setItem("curr_sem_count",JSON.stringify(curr_sem_counts));
    localStorage.setItem("mark_storage",JSON.stringify(mark_storages));
    localStorage.setItem("cpg_storage",JSON.stringify(cpg_storages));
    window.location.href="../index.html";
})

let container=document.querySelector(".container_1");
function display_changes(){
    
    if(cpg_storages.length!=0){
        let inner_text='';
        cpg_storages.forEach((Element)=>{
            inner_text+=`<div id="sem-${Element.curr_sem_counts}"       class="each_semcontainer">
                    <div><p>SEM ${Element.curr_sem_counts}</p></div>
                    <div><p>${Element.gpa}</p></div>
                </div>`
        })
        container.innerHTML=inner_text;
    }
}


//TODO - CGPA CALUCTION
document.getElementById("cal_cpga_button").addEventListener('click',()=>{
    let total_gpa=0;
    cpg_storages.forEach((Element)=>{
        total_gpa+=parseFloat(Element.gpa);
    })
    document.getElementById("cpga-displayer").innerHTML = ((total_gpa / ((curr_sem_counts - 1) * 10))*10).toFixed(2);

})
display_changes(); //rendering the page one time 