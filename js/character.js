const popup = document.getElementById('popup')
const closePopupBtn = document.getElementById('close-popup')
const steps = document.querySelectorAll('.step')

let currentStep = 0

let selectedRace = ''
let selectedClass = ''
let selectedGender = ''
let selectedHairColor = ''
let selectedBG = ''

let rerollsLeft = 3

const stats = {
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
    document.getElementById('strength-upd').textContent = stats.Strength
    document.getElementById('dexterity-upd').textContent = stats.Dexterity
    document.getElementById('constitution-upd').textContent = stats.Constitution
    document.getElementById('intelligence-upd').textContent = stats.Intelligence
    document.getElementById('wisdom-upd').textContent = stats.Wisdom
    document.getElementById('charisma-upd').textContent = stats.Charisma
}

const showProfile = (characterData) => {
    if (characterData) {
        document.getElementById('profile-race').textContent = characterData.race
        document.getElementById('profile-class').textContent = characterData.class
        document.getElementById('profile-gender').textContent = characterData.gender
        document.getElementById('profile-haircolor').textContent = characterData.hairColor
        document.getElementById('profile-background').textContent = characterData.background

        // Statsit
        document.getElementById('profile-strength').textContent = characterData.stats.Strength
        document.getElementById('profile-dexterity').textContent = characterData.stats.Dexterity
        document.getElementById('profile-constitution').textContent = characterData.stats.Constitution
        document.getElementById('profile-intelligence').textContent = characterData.stats.Intelligence
        document.getElementById('profile-wisdom').textContent = characterData.stats.Wisdom
        document.getElementById('profile-charisma').textContent = characterData.stats.Charisma

        // Näytetään profiili
        document.getElementById('character-profile').classList.remove('hidden')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const showInstructionsBtn = document.getElementById('show-instructions')
    const popupShown = sessionStorage.getItem('popupShown')

    const characterLimit = 6

    let slides = document.querySelectorAll('.slide')
    let currentSlide = 0

    const showNextSlide = () => {
        slides[currentSlide].classList.remove('active')
        currentSlide = (currentSlide + 1) % slides.length
        slides[currentSlide].classList.add('active')
    }

    setInterval(showNextSlide, 10000)

    slides[currentSlide].classList.add('active')

    if (!popupShown) {
        popup.classList.remove('hidden')
        sessionStorage.setItem('popupShown', 'true')
    }

    closePopupBtn.addEventListener('click', () => {
        popup.classList.add('hidden')
    })

    showInstructionsBtn.addEventListener('click', () => {
        popup.classList.remove('hidden')
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

            document.querySelector('input[name="increase-2"][value="Strength"]').checked = true
            document.querySelector('input[name="increase-1"][value="Dexterity"]').checked = true
    
            document.querySelector(`input[name="increase-1"][value="Strength"]`).disabled = true
            document.querySelector(`input[name="increase-2"][value="Dexterity"]`).disabled = true
        }

        if (currentStep === 5) {
            saveCharacterData()

            let characters = JSON.parse(localStorage.getItem('characters')) || []
            const latestCharacter = characters[characters.length - 1]

            showProfile(latestCharacter)
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

            const charactersList = JSON.parse(localStorage.getItem('characters')) || []
            const characterLimit = 6
         
            if (charactersList.length >= characterLimit) {
                alert("Character limit 6! You can't create more!")
                return
            }

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
        console.log('Stats accepted:', stats)
        updateStatsDisplay()
        goToNextStep()
    })

    document.querySelectorAll('input[name="increase-2"]').forEach(radio => {
        radio.addEventListener('change', (event) => {
            const selectedStat2 = event.target.value
            console.log(`Stat to increase by +2: ${selectedStat2}`)

            document.querySelector(`input[name="increase-1"][value="${selectedStat2}"]`).disabled = true;

            document.querySelectorAll('input[name="increase-1"]').forEach(input => {
                if (input.value !== selectedStat2) {
                    input.disabled = false
                }
            })
        })
    })
    
    document.querySelectorAll('input[name="increase-1"]').forEach(radio => {
        radio.addEventListener('change', (event) => {
            const selectedStat1 = event.target.value
            console.log(`Stat to increase by +1: ${selectedStat1}`)

            document.querySelector(`input[name="increase-2"][value="${selectedStat1}"]`).disabled = true;

            document.querySelectorAll('input[name="increase-2"]').forEach(input => {
                if (input.value !== selectedStat1) {
                    input.disabled = false
                }
            })
        })
    })

    document.getElementById('finalize-stats').addEventListener('click', () => {     
        document.querySelectorAll('input[name="increase-2"]:checked').forEach(radio => {
            const selectedStat = radio.value
            stats[selectedStat] += 2
        })
        document.querySelectorAll('input[name="increase-1"]:checked').forEach(radio => {
            const selectedStat = radio.value
            stats[selectedStat] += 1
        }) 
        
        console.log('Final stats after increases:', stats)
        updateChosenStatsDisplay()
        showConfirmPopup()
    })

    const showConfirmPopup = () => {
        document.getElementById('confirm-strength').textContent = stats.Strength
        document.getElementById('confirm-dexterity').textContent = stats.Dexterity
        document.getElementById('confirm-constitution').textContent = stats.Constitution
        document.getElementById('confirm-intelligence').textContent = stats.Intelligence
        document.getElementById('confirm-wisdom').textContent = stats.Wisdom
        document.getElementById('confirm-charisma').textContent = stats.Charisma
    
        document.getElementById('confirm-popup').classList.remove('hidden')
    }
    
    // Jos käyttäjä valitsee "No", palataan takaisin vaiheeseen 5
    document.getElementById('confirm-no').addEventListener('click', () => {
        const selectedStat2 = document.querySelector('input[name="increase-2"]:checked').value
        const selectedStat1 = document.querySelector('input[name="increase-1"]:checked').value
        
        // Poistaa lisäykset kun käyttäjä valitsee "No"
        stats[selectedStat2] -= 2
        stats[selectedStat1] -= 1
        
        document.getElementById('confirm-popup').classList.add('hidden')
        currentStep = 4
        steps.forEach(step => step.classList.remove('active'))
        steps[currentStep].classList.add('active')
        updateChosenStatsDisplay()
    })
    
    // Jos käyttäjä valitsee "Yes", siirry viimeiseen vaiheeseen hyväksytyillä statseilla
    document.getElementById('confirm-yes').addEventListener('click', () => {
        document.getElementById('confirm-popup').classList.add('hidden')
        steps.forEach(step => step.classList.remove('active'))
        steps[currentStep].classList.add('active')    
        goToNextStep()
    })

    // Tallennetaan hahmon tiedot localStorageen
    const saveCharacterData = () => {
        let characters = JSON.parse(localStorage.getItem('characters')) || []

        // Tallennetaan hahmodata
        const characterData = {
            race: selectedRace,
            class: selectedClass,
            gender: selectedGender,
            hairColor: selectedHairColor,
            background: selectedBG,
            stats: stats
        }

        characters.push(characterData)

        localStorage.setItem('characters', JSON.stringify(characters))
    }
})