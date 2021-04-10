import React, {useEffect, useState}from 'react'
import {Typography} from '@material-ui/core'
import { Episodes } from '../Episodes/Episodes'
import {
  useParams
} from "react-router-dom";


const Season = () => {
    // "/:serieName/season/:seasonNum"
    let { serieName, seasonNum } = useParams(); 
    

    // Consultar los episodios de la serie: serieName y de la temporada: seasonNum
    // (cachar que esta seasonNum, es solo el numero de temporada, no el id de la temporada.
    // porque no existe id unico para la temporada) (asi qe es numero q parte del 1
    // hasta numero chico) (pero no mas abajo, en episodes)

    return (
        <>
          <Typography component="h1" variant="h5">
            {`Temporada ${seasonNum} | ${serieName}`}
          </Typography>
          <Episodes/>
        </>
    )


}

export {Season}