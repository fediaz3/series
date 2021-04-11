import React, {useState, useEffect} from 'react'
import { SearchInput } from './SearchInput';


const convertToFormat = (data) => {
    // recibo del formato: 
    // [ [ {}, {}, {}, ... ],   [ {}, {}, {}, ... ], [ {}, {}, {}, ... ] ]
    // y quiero convertir al formato: 
    // [ {}, {}, {}, ... ,    {}, {}, {}, ... ,  {}, {}, {}, ...  ]
    let newData = []
    for (let i = 0; i < data.length; i++){
        for (let j = 0; j < data.length; j++){
            if (data[i][j] != undefined){
               newData.push(data[i][j]) 
            }      
        }
    }
    return newData
}

function SearchInputAuxiliar() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
  
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect( () => {
        const fetchData = async () => {
            let promises = [await fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/characters?limit=10&offset=0`)]

            let new_promise = undefined
            for (let i = 10; i < 200; i *= 2){
                new_promise = await fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/characters?limit=10&offset=${i}`)
                // if (new_promise.length == 0){
                //     break // no sirve este break, buscar otra forma
                // }
                promises.push(new_promise)
            }

            // for (let i = 0; i < 10; i++) {
            //    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
            //    console.log(i);
            // 
            console.log("llegamos a als promises:", promises)
            promises = promises.map( x => x.json()) //pq vienen de ese formato 
        
            Promise.all(promises)
            .then(response => {
                console.log("Respuesta:", response)
                let newFormat = convertToFormat(response)
                console.log("Nuevo formato:", newFormat)
                setItems(newFormat)
                
            })
            .then(
              (result) => {
                console.log("resultadooooo:", result)
                //setItems(result);
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

            }

        fetchData()
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