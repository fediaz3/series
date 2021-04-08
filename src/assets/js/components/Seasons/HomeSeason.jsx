import React from 'react'


import {
    useParams
  } from "react-router-dom";

import {CssBaseline, Container, Typography} from '@material-ui/core'
import { Season } from './ShowSeason';

const HomeSeason = (props) => {
    let { id, type } = useParams(); //
    // ene ste caso especial id: nombre de la serie
    //                       type: id de la season.
    return (
        <>
            <React.Fragment>
            <CssBaseline />
              {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} /> */}
              <Container maxWidth="sm">
                <Season seasonId={type}/>
              </Container>
            </React.Fragment>
        </>
    )


}

export {HomeSeason}