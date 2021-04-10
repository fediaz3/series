import React, {useState, useEffect} from 'react'
import { SearchInput } from './SearchInput';


function SearchInputAuxiliar() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
  
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
      fetch("https://tarea-1-breaking-bad.herokuapp.com/api/characters?limit=10&offset=0")
        .then(res => res.json())
        .then(
          (result) => {
            console.log("resultadooooo:", result)
            setItems(result);
            setIsLoaded(true);
            
          },
          // Nota: es importante manejar errores aquí y no en 
          // un bloque catch() para que no interceptemos errores
          // de errores reales en los componentes.
          (error) => {
            setError(error);
            setIsLoaded(true);
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