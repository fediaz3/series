import React from 'react'
import {CssBaseline, Container, Typography} from '@material-ui/core'
import { Season } from './ShowSeason';

const HomeSeason = (props) => {
    return (
        <>
            <React.Fragment>
            <CssBaseline />
              {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} /> */}
              <Container maxWidth="sm">
                <Season/>
              </Container>
            </React.Fragment>
        </>
    )


}

export {HomeSeason}