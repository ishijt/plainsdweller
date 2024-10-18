const steps = document.querySelector('.step')
let currentStep = 0

const goToNextStep = () => {
    steps[currentStep].classList.remove('active')
    currentStep++
    steps[currentStep].classList.add('active')
}

document.querySelector('.step-1 .option').forEach(option => {
    option.addEventListener('click', () => {
        const selectedRace = option.getAttribute('choice-race')
        console.log('Selected Race:', selectedRace)

        goToNextStep()
    })
})