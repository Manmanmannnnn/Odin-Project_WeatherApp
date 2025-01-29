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

function conditionValue(data){
    const dataValue=data.trim().toLowerCase()
    if(dataValue==='clear'){
        return './images/clear_day_50dp_E8EAED_FILL0_wght400_GRAD0_opsz48.png'
    }
    else if(dataValue==='partially cloudy'){
        return './images/partly_cloudy_day_50dp_E8EAED_FILL0_wght400_GRAD0_opsz48.png'

    }
    else if(dataValue==='cloudy'){
        return './images/cloud_50dp_E8EAED_FILL0_wght400_GRAD0_opsz48.png'
    }
    else if(dataValue==='rain'){
        return './images/rainy_50dp_E8EAED_FILL0_wght400_GRAD0_opsz48.png'
    }
    else return './images/foggy_50dp_E8EAED_FILL0_wght400_GRAD0_opsz48.png'
    
}

async function updateOutput(){
    const data= await getData()
    console.log(data)
    output.innerHTML='';

    const title=document.createElement('h2');
    title.textContent= `Location: ${data.resolvedAddress} ` ;
    output.append(title)

    const div=document.createElement('div');
    div.classList.add('resultContainer')

    const condition=document.createElement('div');
    condition.classList.add('condition')

    const currentCondition = await  data.currentConditions.conditions;
    
    condition.textContent= currentCondition
    div.append(condition)

    console.log(conditionValue(currentCondition))
    const img=document.createElement('img')
    const imgSrc=conditionValue(currentCondition)
    img.setAttribute('src',imgSrc);
    condition.append(img)

    loc.value=''
   


    const time=document.createElement('p');

    time.textContent=  `Time: ${data.currentConditions.datetime}`;
    time.classList.add('time')
    div.append(time)

    output.append(div)
}

search.addEventListener('click',()=>{
    updateOutput()
})


//Update later adding style and other values on output box

