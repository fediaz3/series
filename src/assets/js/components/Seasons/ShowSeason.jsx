import React from 'react'
import {Typography} from '@material-ui/core'


const Season = (props) => {
    const {seasonId} = props
    
    return (
        <>
          <Typography component="h1" variant="h5">
                    {`Temporada ${seasonId}`}
          </Typography>
        </>
    )


}

export {Season}