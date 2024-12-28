let DEBUG = true;

document.getElementById('itemInfo').addEventListener('submit',(event) => {

    event.preventDefault();

    // raw information collected 
    const form = document.getElementById('itemInfo');

    // create an arrray of key,value pairs holding information
    const data = new FormData(form);
    

    // check for information collection
    if(DEBUG){
        console.log('Form submitted');
        for(let [key, value] of data.entries()) {
            console.log(key+": "+value);
        }
        const file = data.get('pic');
        if(file && file.name){
            console.log(file.name);
        }
    }

    fetch('/submit', {method: 'POST', body: formData})
    .then(repsone => response.json()).then(data => 
        {console.log('Server response: ', data);})
    .catch(error => {console.error('Error: ', error)});




});