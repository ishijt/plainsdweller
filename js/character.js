const popup = document.getElementById('popup')
const closePopupBtn = document.getElementById('close-popup')
const steps = document.querySelectorAll('.step')
let currentStep = 0

let rerollsLeft = 3

let selectedRace = ''
let selectedClass = ''
let selectedGender = ''
let selectedHairColor = ''
let selectedBG = ''

const stats = {
    Strength: 0,
    Dexterity: 0,
    Constitution: 0,
    Intelligence: 0,
    Wisdom: 0,
    Charisma: 0
}

let savedStats = {
    Strength: 0,
    Dexterity: 0,
    Constitution: 0,
    Intelligence: 0,
    Wisdom: 0,
    Charisma: 0
}

const classSpecializations = {
    Warrior: 'Strength',
    Rogue: 'Dexterity',
    Crusader: 'Constitution',
    Cleric: 'Wisdom',
    Sorcerer: 'Charisma',
    Shaman: 'Intelligence'
}

const rollStats = () => {
    Object.keys(stats).forEach(stat => {
        stats[stat] = Math.floor(Math.random() * (16 - 9 + 1)) + 9
    })

    const classSpecialization = classSpecializations[selectedClass]
    stats[classSpecialization] += 2
}

const updateStatsDisplay = () => {
    document.getElementById('strength').textContent = stats.Strength
    document.getElementById('dexterity').textContent = stats.Dexterity
    document.getElementById('constitution').textContent = stats.Constitution
    document.getElementById('intelligence').textContent = stats.Intelligence
    document.getElementById('wisdom').textContent = stats.Wisdom
    document.getElementById('charisma').textContent = stats.Charisma

    document.getElementById('rerolls-left').textContent = rerollsLeft
}

const updateChosenStatsDisplay = () => {
    console.log("Updated stats:", savedStats)
    document.getElementById('strength-upd').textContent = savedStats.Strength
    document.getElementById('dexterity-upd').textContent = savedStats.Dexterity
    document.getElementById('constitution-upd').textContent = savedStats.Constitution
    document.getElementById('intelligence-upd').textContent = savedStats.Intelligence
    document.getElementById('wisdom-upd').textContent = savedStats.Wisdom
    document.getElementById('charisma-upd').textContent = savedStats.Charisma
}

document.addEventListener('DOMContentLoaded', () => {
    popup.classList.remove('hidden')

    closePopupBtn.addEventListener('click', () => {
        popup.classList.add('hidden')
    })

    const goToNextStep = () => {
        steps.forEach(step => step.classList.remove('active'))
        currentStep++

        if (currentStep < steps.length) {
            if (currentStep === 3) {
                rollStats()
                updateStatsDisplay()
            }
            steps[currentStep].classList.add('active')
        }
        
        if (currentStep === 4) {
            updateChosenStatsDisplay()
            console.log('Stats: ', savedStats)
        }
    }

    document.querySelectorAll('.prev-step').forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep >= 0) {
                steps.forEach(step => step.classList.remove('active'))
                currentStep--
                steps[currentStep].classList.add('active')
            }
        })
    })

    document.querySelectorAll('.step-1 .option').forEach(option => {
        option.addEventListener('click', () => {
            selectedRace = option.getAttribute('choice-race')
            console.log('Selected Race:', selectedRace)
            goToNextStep()
        })
    })

    document.querySelectorAll('.step-2 .option').forEach(option => {
        option.addEventListener('click', () => {
            selectedClass = option.getAttribute('choice-class')
            console.log('Selected Class:', selectedClass)
            goToNextStep()
        })
    })

    document.getElementById('confirm-details').addEventListener('click', () => {
        selectedGender = document.getElementById('gender-options').value
        selectedHairColor = document.getElementById('hair-color-options').value
        selectedBG = document.getElementById('background-options').value
        goToNextStep()
    })

    document.getElementById('reroll-stats').addEventListener('click', () => {
        if (rerollsLeft > 0) {
            rerollsLeft--
            rollStats()
            updateStatsDisplay()
            console.log(`Rerolls left: ${rerollsLeft}`)
        } else {
            alert('No rerolls left!')
        }
    })

    document.getElementById('accept-stats').addEventListener('click', () => {
        savedStats = { ...stats }
        console.log('Stats accepted:', savedStats)
        updateChosenStatsDisplay()
        goToNextStep()
    })

    document.querySelectorAll('input[name="increase-2"]').forEach(radio => {
        radio.addEventListener('change', (event) => {
            const selectedStat2 = event.target.value
            console.log(`Stat to increase by +2: ${selectedStat2}`)
        })
    })
    
    document.querySelectorAll('input[name="increase-1"]').forEach(radio => {
        radio.addEventListener('change', (event) => {
            const selectedStat1 = event.target.value
            console.log(`Stat to increase by +1: ${selectedStat1}`)
        })
    })
})