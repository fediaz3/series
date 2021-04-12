async function getEpisodesBreakingBad() {
    const seasons = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Breaking+Bad')
    return seasons.json(); 
}


async function getEpisodesBetterCallSaul() {
    const seasons = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Better+Call+Saul')
    return seasons.json(); 
}


export default { getEpisodesBreakingBad, getEpisodesBetterCallSaul };
