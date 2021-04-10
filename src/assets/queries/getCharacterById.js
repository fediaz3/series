async function getCharacterById(characterId) {
    const character = await fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/characters/${characterId}`)
    return character.json();
}

export default { getCharacterById };
