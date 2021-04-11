// async function getQuotesByFullName(firstName, lastName) {
//     let lastNameNew = ''
//     if (lastName != undefined){
//         lastNameNew = lastName
//     }
//     const quotes = await fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/quote?author=${firstName}+${lastNameNew}`)
//     return quotes.json();
// }

async function getQuotesByFullName(n1, n2, n3=undefined, n4=undefined){
    console.log("llego aca 0")
    let url = ''
    if (n4 != undefined){
        url = `https://tarea-1-breaking-bad.herokuapp.com/api/quote?author=${n1}+${n2}+${n3}+${n4}`
        console.log("llego aca4")
    } else if (n3 != undefined){
        url = `https://tarea-1-breaking-bad.herokuapp.com/api/quote?author=${n1}+${n2}+${n3}`
        console.log("llego aca3")
    } else {
        url = `https://tarea-1-breaking-bad.herokuapp.com/api/quote?author=${n1}+${n2}`
        console.log("llego aca2")
    }
    
    const quotes = await fetch(url)
    return quotes.json();
}



export default { getQuotesByFullName };
