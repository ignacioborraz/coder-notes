document.getElementById('submit').addEventListener('click',(event)=>{
    event.preventDefault()
    let data = {
        name: document.querySelector('#name').value,
        mail: document.querySelector('#mail').value
    }
    console.log(data);
    fetch(`/api/cookies/signed/set`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(()=>console.log('registrado'))
        .catch(()=>console.log('ocurrió un error'))
})

document.getElementById('get_cookie').addEventListener('click',(event)=>{
    event.preventDefault()
    fetch(`/api/cookies/signed/get`)
        .then(res=>res.json())
        .then(res=>console.log(res))
        .catch(()=>console.log('ocurrió un error'))
})