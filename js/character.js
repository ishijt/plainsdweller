const popup = document.getElementById('popup')
const closePopupBtn = document.getElementById('close-popup')
const steps = document.querySelectorAll('.step')
let currentStep = 0

let selectedRace = ''
let selectedClass = ''

document.addEventListener('DOMContentLoaded', () => {
    popup.classList.remove('hidden')
})

closePopupBtn.addEventListener('click', () => {
    popup.classList.add('hidden')
})

const goToNextStep = () => {
    steps.forEach(step => step.classList.remove('active'))
    currentStep++
    if (currentStep < steps.length) {
        steps[currentStep].classList.add('active')
    }
}

document.querySelectorAll('.step-1 .option').forEach(option => {
    option.addEventListener('click', () => {
        const selectedRace = option.getAttribute('choice-race')
        console.log('Selected Race:', selectedRace)

        goToNextStep()
    })
})

document.querySelectorAll('.step-2 .option').forEach(option => {
    option.addEventListener('click', () => {
        const selectedClass = option.getAttribute('choice-class')
        console.log('Selected Class:', selectedClass)

        goToNextStep()
    })
})

document.querySelectorAll('.prev-step').forEach(button => {
    button.addEventListener('click', () => {
        if (currentStep >= 0) {
            steps.forEach(step => step.classList.remove('active'))
            currentStep--
            steps[currentStep].classList.add('active')
        }
    })
})