import React from 'react'
import {Typography} from '@material-ui/core'
import { Episodes } from '../Episodes/Episodes'

const Season = (props) => {
    const {seasonId} = props
    
    return (
        <>
          <Typography component="h1" variant="h5">
            {`Temporada ${seasonId}`}
          </Typography>
          <Episodes seasonId={seasonId}/>
        </>
    )


}

export {Season}