const theData = document.querySelector('#inputVals')
theData.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(e.target.elements.name.value)
    console.log(e.target.elements.city.value)
})