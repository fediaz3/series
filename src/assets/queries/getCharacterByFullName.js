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



async function getCharacterByFullNameNew(n1, n2, n3=undefined, n4=undefined){
    console.log("llego aca 0 Character")
    let url = ''
    if (n4 != undefined){
        url = `https://tarea-1-breaking-bad.herokuapp.com/api/characters?name=${n1}+${n2}+${n3}+${n4}`
        console.log("llego aca4")
    } else if (n3 != undefined){
        url = `https://tarea-1-breaking-bad.herokuapp.com/api/characters?name=${n1}+${n2}+${n3}`
        console.log("llego aca3")
    } else {
        url = `https://tarea-1-breaking-bad.herokuapp.com/api/characters?name=${n1}+${n2}`
        console.log("llego aca2")
    }
    
    const character = await fetch(url)
    return character.json();
}


export default { getCharacterByFullName, getCharacterByFullNameVersion2,  getCharacterByFullNameNew };
