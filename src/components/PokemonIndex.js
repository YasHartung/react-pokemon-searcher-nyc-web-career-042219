import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'
const URL = 'http://localhost:3000/pokemon'

class PokemonPage extends React.Component {
  state = {
    loading: null,
    pokemon: [],
    filter: ''
  }

  handleFilter = (event, data ) => {
    this.setState({
      filter: data.value
    })
  }

  addPokemon = (newPoke) => {
    
    let poke={
      name: newPoke.name,
      stats: [{
        value: newPoke.hp,
        name: "hp"
      }],
      sprites:{
        front: newPoke.frontUrl,
        back: newPoke.backUrl
      }
    }
    fetch(URL, {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
        },
      body: JSON.stringify(poke)

    })
    .then(r => r.json())
    .then(newPokemon => {
      let updatedPokemon = [...this.state.pokemon, newPokemon]
      this.setState({pokemon: updatedPokemon})
    })
  }

  componentDidMount(){
    fetch(URL)
    .then(r => r.json())
    .then(data => {
      console.log(data)
      this.setState({
        loading: 1,
        pokemon: data
      })
    })
  }
  applyFilter(){
   return this.state.pokemon.filter(poke => poke.name.includes(this.state.filter))
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce(this.handleFilter, 500)} showNoResults={false} />
        <br />
        <PokemonCollection pokemon={this.applyFilter()}/> 
        <br />
        <PokemonForm addPokemon={this.addPokemon}/>
      </div>
    )
  }
}

export default PokemonPage
