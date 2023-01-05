async function captureData(event) {
    event.preventDefault()
    let data = document.querySelectorAll('.form-control')
    let values = {}
    data.forEach(e => values[e.name] = e.value)
    console.log(values)
}
//document.querySelector('#newProduct').addEventListener('click',captureData)