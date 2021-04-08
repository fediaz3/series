import React from 'react'


import {
    useParams
  } from "react-router-dom";

import {CssBaseline, Container, Typography} from '@material-ui/core'
import { Season } from './ShowSeason';

const HomeSeason = (props) => {
    let { id } = useParams();
    
    return (
        <>
            <React.Fragment>
            <CssBaseline />
              {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} /> */}
              <Container maxWidth="sm">
                <Season seasonId={id}/>
              </Container>
            </React.Fragment>
        </>
    )


}

export {HomeSeason}