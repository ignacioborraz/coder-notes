document.getElementById('login').addEventListener('click',(event)=>{
    event.preventDefault()
    let data = {
        name: document.querySelector('#name').value,
        mail: document.querySelector('#mail').value
    }
    //console.log(data);
    fetch(`/api/sessions/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res=>res.json())
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
})

document.getElementById('private').addEventListener('click',(event)=>{
    event.preventDefault()
    fetch(`/api/sessions/private`)
        .then(res=>res.json())
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
})

document.getElementById('logout').addEventListener('click',(event)=>{
    event.preventDefault()
    fetch(`/api/sessions/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res=>res.json())
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
})