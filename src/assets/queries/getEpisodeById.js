async function getEpisodeById(episodeId) {
    const episode = await fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/episodes/${episodeId}`)
    return episode.json(); 
}


export default { getEpisodeById };
