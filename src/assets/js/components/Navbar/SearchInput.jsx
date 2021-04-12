import _ from "lodash";
import React from "react";
import { Search, Grid, Header, Segment, Label } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

import service from '../../../queries/getCharacterByFullName'
import { SettingsOverscanOutlined } from "@material-ui/icons";


const initialState = {
  loading: false,
  results: [],
  value: ""
};

function exampleReducer(state, action) {
  switch (action.type) {
    case "CLEAN_QUERY":
      return initialState;
    case "START_SEARCH":
      return { ...state, loading: true, value: action.query };
    case "FINISH_SEARCH":
      return { ...state, loading: false, results: action.results };
    case "UPDATE_SELECTION":
      return { ...state, value: action.selection };

    default:
      throw new Error();
  }
}

const resultRenderer = ({ name }) => <Label content={name} />;

function SearchInput(props) {
  const history = useHistory();

  const [state, dispatch] = React.useReducer(exampleReducer, initialState);
  const { loading, results, value } = state;
  
  const {source} = props

  const timeoutRef = React.useRef();
  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current);
    dispatch({ type: "START_SEARCH", query: data.value });

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: "CLEAN_QUERY" });
        return;
      }

      const re = new RegExp(_.escapeRegExp(data.value), "i");
      const isMatch = (result) => re.test(result.name);

      dispatch({
        type: "FINISH_SEARCH",
        results: _.filter(source, isMatch)
      });
    }, 300);
  }, []);
  React.useEffect(() => {
      console.log("source:", source)
      return () => {
        clearTimeout(timeoutRef.current);
      };
  }, []);



  const handleResultSelect = (e, data) => {
    
    dispatch({ type: "UPDATE_SELECTION", selection: data.result.name })
    
            
    // console.log("Llevarlo a la vista del personaje elejido", data.result)
    let value = data.result.name
    // console.log("VAlue:", value)
    let nameArray = value.split(" ")
    // console.log("nameArray:", nameArray)
    let n1 = nameArray[0]
    let n2 = nameArray[1]
    let n3 = undefined
    // console.log("lelgamos aca xD 1:", nameArray)
    if (nameArray.length == 3){
      n3 = nameArray[2]
      // console.log("lelgamos aca xD2:", nameArray)
    }
    let n4 = undefined
    if (nameArray.length == 4){
      n3 = nameArray[2]
      n4 = nameArray[3]
    } 
    fetchCharacter(n1, n2, n3, n4)
  }

  async function fetchCharacter(n1, n2, n3, n4){    
    try {
      const characterData = await service.getCharacterByFullNameNew(n1, n2, n3, n4)
      const characterData2 = characterData[0]
      // console.log("veamos1:", characterData2.char_id)
      history.push('/'); // esto primero, pq es un truco cuando no redirecciona bien el de
      // abajo
      history.replace(`/character/${characterData2.char_id}`);
    } catch(error){
      console.log("error en el fetch:", error)
    }
    

  }


  return (
    <Grid>
      <Grid.Column width={6}>
        <Search
          loading={loading}
          onResultSelect={(e, data) => handleResultSelect(e, data)} // PROBLEMA PENDIENTE, SOLO FUNCIONA LA PRIMERA BUSQUEDA
          onSearchChange={handleSearchChange}
          resultRenderer={resultRenderer}
          results={results}
          value={value}
        />
      </Grid.Column>

      {/*<Grid.Column width={10}>
        <Segment>
          <Header>State</Header>
          <pre style={{ overflowX: "auto" }}>
            {JSON.stringify({ loading, results, value }, null, 2)}
          </pre>
          <Header>Options</Header>
          <pre style={{ overflowX: "auto" }}>
            {JSON.stringify(source, null, 2)}
          </pre>
        </Segment>
        </Grid.Column> */}
    </Grid>
  );
}







export {SearchInput}
