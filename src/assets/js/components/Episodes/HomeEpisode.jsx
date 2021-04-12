import React from 'react'


import {CssBaseline, Container} from '@material-ui/core'
import { Episode } from './ShowEpisode'


const HomeEpisode = (props) => {

    return (
        <>
            <React.Fragment>
            <CssBaseline />
              {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} /> */}
              <Container maxWidth="sm">
                <Episode/>
              </Container>
            </React.Fragment>
        </>
    )
}

export {HomeEpisode}