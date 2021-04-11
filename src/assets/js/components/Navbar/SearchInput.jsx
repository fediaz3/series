import _ from "lodash";
import React from "react";
import { Search, Grid, Header, Segment, Label } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

import service from '../../../queries/getCharacterByFullName'


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

  async function fetchCharacter(firstName, lastName){
    const characterData = await service.getCharacterByFullName(firstName, lastName)
    const characterData2 = characterData[0]
    console.log("veamos1:", characterData2.char_id)
    history.push(`/character/${characterData2.char_id}`) // cambiar de ruta
  }

  async function fetchCharacterVersion2(firstName, lastName, secondLastName){
    const characterData = await service.getCharacterByFullNameVersion2(firstName, lastName, secondLastName)
    const characterData2 = characterData[0]
    console.log("veamos2:", characterData2.char_id)
    history.push(`/character/${characterData2.char_id}`) // cambiar de ruta
  }

  return (
    <Grid>
      <Grid.Column width={6}>
        <Search
          loading={loading}
          onResultSelect={(e, data) => {

            dispatch({ type: "UPDATE_SELECTION", selection: data.result.name })
            
            console.log("Llevarlo a la vista del personaje elejido", data.result)
            // redirectToCharacter(data.result.name) // red
            let value = data.result.name
            let nameArray = value.split(" ")
            // console.log(nameArray)
            let firstName = nameArray[0]
            let lastName = nameArray[1]
            let secondLastName = undefined
            if (nameArray.length == 2){ // minimo 2 nombres tienen en la APi los personajes.
              fetchCharacter(firstName, lastName)
            } else if (nameArray.length == 3){ // maximo 3 nombres en la API tienen los personajes        
              secondLastName = nameArray[2]
              fetchCharacterVersion2(firstName, lastName, secondLastName)
            }
           }
          }
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
