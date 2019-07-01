import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  state={
    front: true
  }
  handleClick = () => {
    
    this.setState({
      front: !this.state.front
    })
  }

  
  render() {
   
    return (
      <Card>
        <div onClick={this.handleClick}>
          <div className="image">
            <img src={this.state.front ? this.props.sprites.front : this.props.sprites.back} alt="" />
          </div>
          <div className="content">
            <div className="header">{this.props.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.props.stats.find(stat => stat.name === 'hp').value}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
