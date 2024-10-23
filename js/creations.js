document.addEventListener('DOMContentLoaded', () => {
    const charactersList = document.getElementById('characters-list')
    const characters = JSON.parse(localStorage.getItem('characters')) || []

    const renderCharacters = () => {
        charactersList.innerHTML = ''

        if (characters.length === 0) {
            charactersList.innerHTML = '<p>No characters found.</p>'
        } else {
            characters.forEach((character, index) => {
                const characterDiv = document.createElement('div')
                characterDiv.classList.add('character-profile')
    
                const stats = character.stats || {}
    
                characterDiv.innerHTML = `
                    <h3>${character.race} ${character.class}</h3>
                        <p>Gender: ${character.gender}</p>
                        <p>Hair Color: ${character.hairColor}</p>
                        <p>Background: ${character.background}</p>
                        <h4>Stats</h4>
                        <ul>
                            <li>Strength: ${stats.Strength !== undefined ? stats.Strength : 'N/A'}</li>
                            <li>Dexterity: ${stats.Dexterity !== undefined ? stats.Dexterity : 'N/A'}</li>
                            <li>Constitution: ${stats.Constitution !== undefined ? stats.Constitution : 'N/A'}</li>
                            <li>Intelligence: ${stats.Intelligence !== undefined ? stats.Intelligence : 'N/A'}</li>
                            <li>Wisdom: ${stats.Wisdom !== undefined ? stats.Wisdom : 'N/A'}</li>
                            <li>Charisma: ${stats.Charisma !== undefined ? stats.Charisma : 'N/A'}</li>
                        </ul>
                        <button class="delete-btn" data-index="${index}">Delete</button>
                `
                charactersList.appendChild(characterDiv)
            })
        }
    }

    // Hahmojen renderöinti
    renderCharacters()

    // Hahmon poistaminen
    charactersList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.getAttribute('data-index')

            // Poistetaan hahmo listasta
            characters.splice(index, 1)

            // Päivitetään Local Storage
            localStorage.setItem('characters', JSON.stringify(characters))

            // Päivitetään näkymä
            renderCharacters()
        }
    })
})