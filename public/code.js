// ----------------------------------------------------
// Fetching data from Titanic Dataset 
fetch('titanic-passengers.json')
.then(res => res.json())
.then(json => {
  handleData(json)
})
.catch(err => console.log(err.message))

// ----------------------------------------------------
// Create Graph 
function makeGraph(data, width = 900, height = 400) {
  const container = document.createElement('div')
  // container.style.width = `${width}px`
  container.style.height = `${height}px`
  container.style.position = 'relative'
  
  const step = width / data.length * 2
  const output = []
  const maxValueArr = data.forEach(item => {
    output.push(item.value)
  })
  const maxValue = Math.max(...output) // Find Max
  const dataNormalized = output.map(val => val/maxValue)
  
  data.forEach((item, i) => {
    const el = document.createElement('div')
    container.appendChild(el)
    el.style.position = 'absolute'
    el.style.backgroundColor = item.color
    el.style.width = `${step}px`
    el.style.height = `${item.value}px`
    // el.style.height = `${dataNormalized[i] * 400}px`
    el.style.left = `${step * i}px`
    el.style.bottom = '0'
  });
  return container
}

// ----------------------------------------------------------
// Handles data 
function handleData(data) {
  // Takes data & returns necessary info only: fields
  const betterData = data.map(passengers => passengers.fields)

  // Fare & Gender
  const fareAndGender = betterData.map(passenger => {
    const value = passenger.fare
    const color = passenger.sex === 'male' ? '#3366ff' : 'pink'
    return { value, color } 
  })

  // Siblings & Survival
  const sibAndSurvival = betterData.map(passenger => {
    const value = passenger.sibsp
    const color = passenger.survived === 'Yes' ? 'red' : 'green'
    return { value, color } 
  })

  // Age & Survival
  const ageAndSurvival = betterData.map(passenger => {
    const value = passenger.age
    const color = passenger.survived === 'Yes' ? 'red' : 'green'
    return { value, color } 
  })

  
  // Age & Class
  const ageAndClass = betterData.map(passenger => {
    const value = passenger.age
    let color;
    switch (passenger.pclass) {
      case 3:
      color = '#FFD700'
      break;
      case 2:
      color = '#C0C0C0'
      break;
      case 1:
      color = '#CD7f32'
      break;
    }
    return { value, color } 
  })
  
  // Class & Gender
  const classAndGender = betterData.map(passenger => {
    const value = passenger.pclass
    const color = passenger.sex === 'male' ? '#3366ff' : 'pink'
    return { value, color } 
  })

  // Class & Survival
  const classAndSurvival = betterData.map(passenger => {
    const value = passenger.pclass
    const color = passenger.survived === 'Yes' ? 'red' : 'green'
    return { value, color }
  })


  const faresAndGenderGraph = makeGraph(fareAndGender)
  document.querySelector('body').appendChild(faresAndGenderGraph)

  const sibAndSurvivalGraph = makeGraph(sibAndSurvival)
  document.querySelector('body').appendChild(sibAndSurvivalGraph)
  
  const classAndSurvivalGraph = makeGraph(classAndSurvival)
  document.querySelector('body').appendChild(classAndSurvivalGraph)

  const ageAndClassGraph = makeGraph(ageAndClass)
  document.querySelector('body').appendChild(ageAndClassGraph)

  const ageAndSurvivalGraph = makeGraph(ageAndSurvival)
  document.querySelector('body').appendChild(ageAndSurvivalGraph)

  const classAndGenderGraph = makeGraph(classAndGender)
  document.querySelector('body').appendChild(classAndGenderGraph)


}