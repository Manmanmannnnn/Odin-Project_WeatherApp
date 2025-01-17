const loc=document.querySelector('#location');
const output=document.querySelector('.output');
const search=document.querySelector('button');



async function getData(){
    let currentSearch=loc.value.trim()
    try{
        const response= await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${currentSearch}?unitGroup=us&key=Q5TKZ37JHWTQAUCVQZR5P9XNR&contentType=json`)
        const json= await response.json();
        return json
    }catch(error){
        console.error(error)
    }
    
}

async function updateOutput(){
    const data= await getData()
    console.log(data)
    output.innerHTML='';

    const title=document.createElement('h2');
    title.textContent=  data.resolvedAddress;
    output.append(title)

    const condition=document.createElement('p');
    
    condition.textContent=  data.currentConditions.icon;
    output.append(condition)
}

search.addEventListener('click',()=>{
    updateOutput()
})


//Update later adding style and other values on output box

