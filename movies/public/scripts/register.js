document.getElementById('register').addEventListener('click',(event)=>{
    event.preventDefault()
    let data = {
        name: document.querySelector('#name').value,
        photo: document.querySelector('#photo').value,
        age: document.querySelector('#age').value,
        mail: document.querySelector('#mail').value,
        password: document.querySelector('#password').value,
    }
    console.log(data)
    fetch(`/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res=>res.json())
        .then(res=>console.log(res))    //en lugar de imprimir en consola: mostrar mensaje de alerta
        .catch(err=>console.log(err))   //en lugar de imprimir en consola: mostrar mensaje de alerta
})