import React, {useState, useEffect} from 'react'
import { SearchInput } from './SearchInput';
import service from '../../../queries/getAllCharacters'

function SearchInputAuxiliar() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
  
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()

    async function CreatePromises(){
      const promises = []
      fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/characters?limit=10&offset=0`).
      then( (res) => {
        promises.push(res)
      })
      
      let i = 10
      let next_promise = undefined
      while (true) {
        // code block to be executed
        next_promise = await fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/characters?limit=10&offset=${i}`)
        if (next_promise.length == 0){
            break
        }
        promises.push(next_promise)
        i *= 2
      }
      console.log("lista de promises:", promises)
      return promises
    }



    useEffect(() => {
      
  
      // ar promises = []
      // romises.push(
      //  fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/characters?limit=10&offset=0`)
      // 
      //  = 10
      // hile (true) {

      //  promises.push(
      //    fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/characters?limit=10&offset=${i}`)
      //    .then(res => {
      //        if (res.length == 0){
      //            break
      //        }
      //        return res
      //      } )
      //    .catch(err => {return err} )
      //  );

      //  i *= 10
      // 
      console.log("lllegamos acaaaa")
     
      Promise.all(CreatePromises())
        // .then(res => res.json())
        .then(
          (result) => {
            console.log("Resultadooooo1:", result)
            setIsLoaded(true);
            setItems(result);
            // agarrar el result acá y hacer un join weno
            console.log("Resultadooooo2:", result)
          },
          // Nota: es importante manejar errores aquí y no en 
          // un bloque catch() para que no interceptemos errores
          // de errores reales en los componentes.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
            <SearchInput source={items}/>
        </>
      );
    }
  }

export {SearchInputAuxiliar}