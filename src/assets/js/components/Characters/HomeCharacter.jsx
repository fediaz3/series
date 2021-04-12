import React from 'react'
import {CssBaseline, Container} from '@material-ui/core'
import { Character } from './ShowCharacter'


const HomeCharacter = (props) => {

    return (
        <>
            <React.Fragment>
            <CssBaseline />
              {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} /> */}
              <Container maxWidth="sm">
                <Character/>
              </Container>
            </React.Fragment>
        </>
    )
}

export {HomeCharacter}