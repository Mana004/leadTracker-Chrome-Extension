
let myLeads = []
const buttonEl = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl  = document.getElementById("ul-el")
const deleteEl = document.getElementById("delete-btn")
const saveEl = document.getElementById("save-btn")

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("leads"))

if(leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage
    renderLeads(myLeads);
}

deleteEl.addEventListener("dblclick", deleteLeads)


buttonEl.onclick = saveLead;

saveEl.onclick = saveTab;




function renderLeads(leads){

    let listItems = ""

for(let i = 0; i<leads.length; i++){
    listItems += `
    <li>
        <a 
        target ='_blank' 
        href = '${leads[i]}'>
        ${leads[i]} 
        </a>
    </li>`
}

ulEl.innerHTML = listItems
    
}

function saveTab(){

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const currentTab = tabs[0];
        myLeads.push(currentTab.url)
        localStorage.setItem("leads", JSON.stringify(myLeads))
        renderLeads(myLeads)
      });

}



function deleteLeads(){
    localStorage.clear()
    myLeads=[]
    renderLeads(myLeads)
}

function saveLead(){

    let lead = inputEl.value;
    myLeads.push(lead);

    inputEl.value=''

    localStorage.setItem("leads", JSON.stringify(myLeads))

    renderLeads(myLeads)
      
}


    



