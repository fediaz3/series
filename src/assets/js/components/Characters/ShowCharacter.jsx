import React, { useEffect, useState } from 'react'


import { useParams } from "react-router-dom";


import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


import {List, ListItem, ListItemText, Divider} from '@material-ui/core'
import { Seasons } from '../Seasons/Seasons';
import { Link } from 'react-router-dom';
import service from '../../../queries/getCharacterById'
import service2 from '../../../queries/getQuotesByFullName'




const Character = (props) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    
    const classes = useStyles();

    let { characterId } = useParams(); // get the variable parameters 
                                                          // that exist in the current url

    useEffect(() => {
      fetchCharacter(characterId)
    }, []) 
    
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [nickName, setNickName] = useState('')
    const [occupation, setOcuppation] = useState('')
    const [status, setStatus] = useState('')
    const [category, setCategory] = useState([])
    const [appearenceBrBad, setApperenceBrBad] = useState([])
    const [appearenceBeCal, setAppearenceBeCal] = useState([])
    const [portrayed, setPortrayed] = useState('')

    const [quotes, setQuotes] = useState([])




    // con la API obtener, el nombre y todos sus detalles, porque aqui
    // ya tengo el ID unico del personaje
    async function fetchCharacter(characterId){
      try { //notar que dentro de este try hay dos await 
        const characterData = await service.getCharacterById(characterId);
        const characterData2 = characterData[0]
        console.log("Character :", characterData2)
  
        //Obtener las citas, dado el nombre
        let value = characterData2.name
        let nameArray = value.split(" ")
        // console.log(nameArray)
        let n1 = nameArray[0]
        let n2 = nameArray[1]
        let n3 = undefined
        console.log("lelgamos aca xD 1:", nameArray)
        if (nameArray.length == 3){
          n3 = nameArray[2]
          console.log("lelgamos aca xD2:", nameArray)
        }
        let n4 = undefined
        if (nameArray.length == 4){
          n3 = nameArray[2]
          n4 = nameArray[3]
        } 
       
        const quotesCharacter = await service2.getQuotesByFullName(n1, n2, n3, n4)
        console.log("QUOTESSSSS CHARACTER", quotesCharacter)
  
  
  
        setImage(characterData2.img)
        setName(characterData2.name)
        setNickName(characterData2.nickname)
        setOcuppation(characterData2.occupation)
        setStatus(characterData2.status)
        setCategory(characterData2.category)
        setApperenceBrBad(characterData2.appearance)
        setAppearenceBeCal(characterData2.better_call_saul_appearance)
        setPortrayed(characterData2.portrayed)
  
        setQuotes(quotesCharacter)
        setIsLoaded(true);
  
        } catch (error){
          console.log("Error alguno de los fetch (son 2 posibles aqui):", error)
          setError(error);
          setIsLoaded(true);
        }


      
      

    }


    const appearencesBreakingBad = appearenceBrBad.map( (elem) => (
      
        <Link to={`/Breaking Bad/season/${elem}`} style={{"text-decoration": "none"}}>
            {`Temporada ${elem}  `} 
        </Link> 
        
    ))

    // "/:serieName/season/:seasonNum" 

    const appearencesBetterCaulSoul = appearenceBeCal.map( (elem) => (
        //notar que el link to, tiene que ser con espacios el nombre de la serie
        <Link to={`/Better Call Saul/season/${elem}`} style={{"text-decoration": "none"}}>
            {`Temporada ${elem}  `} 
        </Link> 
    ))

    const quotes2 = quotes.map( (elem, index) => (
      <Typography color="textSecondary" variant="body2">
        {`${index + 1}: ${elem.quote}`}
        <p></p>
      </Typography>
     
    ))

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
          <div className={classes.root}>
            <div className={classes.section1}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h4">
                    {`${name}`}
                  </Typography>
                </Grid>
                <Grid item xs>
                  <img src={`${image}`}
                   style={{ height: 'auto', width: "100%" }}></img>  
                </Grid>
                
              </Grid>
              <Typography color="textSecondary" variant="body2">
                  {`Nickname: ${nickName}`}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                  {`Ocupación: ${occupation}`}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                  {`Estatus: ${status}`}
              </Typography>

              { appearenceBrBad.length > 0
              ?
              <> 
                <Typography color="textSecondary" variant="body2">
                  Apariciones en temporadas de Breaking Bad
                </Typography>
                {appearencesBreakingBad}
              </>
              : 
              <>
                <Typography color="textSecondary" variant="body2">
                  No tiene apariciones en temporadas de Breaking Bad
                </Typography>
              </>
              }
              


              { appearenceBeCal.length > 0 
              ? 
              <>
                <Typography color="textSecondary" variant="body2">
                  Apariciones en temporadas de Better Caul Soul
                </Typography>
                { appearencesBetterCaulSoul }
              </>
              : 
              <>
                <Typography color="textSecondary" variant="body2">
                  No tiene apariciones en temporadas de Better Caul Soul
                </Typography>
              </>
              }
              
              
              <Typography color="textSecondary" variant="body2">
                  {`Actor/Actriz ${portrayed}`}
              </Typography>



              { quotes2.length > 0 
              ? 
              <>
                <Typography color="textSecondary" variant="body2">
                  Citas:
                </Typography>
                { quotes2 }
              </>
              : 
              <>
                <Typography color="textSecondary" variant="body2">
                  No tiene citas
                </Typography>
              </>
              }

            </div>
            <Divider variant="middle" />
          </div>
            
        </>
      );
    }
    
}

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    section1: {
      margin: theme.spacing(3, 2),
    },
    section2: {
      margin: theme.spacing(2),
    },
    section3: {
      margin: theme.spacing(3, 1, 1),
    },
    root2: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
  }));


export {Character}