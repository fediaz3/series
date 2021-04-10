async function getCharacterByFullName(firstName, lastName) {
    let lastNameNew = ''
    if (lastName != undefined){
        lastNameNew = lastName
    }
    const character = await fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/characters?name=${firstName}+${lastNameNew}`)
    return character.json();
}

async function getCharacterByFullNameVersion2(firstName, lastName, secondLastName) {
    const character = await fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/characters?name=${firstName}+${lastName}+${secondLastName}`)
    return character.json();
}

export default { getCharacterByFullName, getCharacterByFullNameVersion2 };
