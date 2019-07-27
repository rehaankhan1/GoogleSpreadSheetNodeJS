const theData = document.querySelector('#inputVals')
theData.addEventListener('submit', (e) => {
    e.preventDefault()
    const lname = e.target.elements.name.value
    const lcity = e.target.elements.city.value
   location.assign(`\send?name=${lname}&city=${lcity}`)
})