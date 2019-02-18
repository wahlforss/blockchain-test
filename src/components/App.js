import React, { Component } from 'react';
import {BubbleWrapper} from './BubbleWrapper'
import { Header } from './Header';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {      
      minValue: 100000000,
      minValueInput: '1'
    }
  }
  
  onChangeMinValue = (event) => {        
    this.setState({
      minValue: parseFloat(event.target.value) * 100000000 || 0,
      minValueInput: event.target.value
    })
  } 
  
  render() {        
    return (
      <div style={styles.background}>    
        <Header 
          minValueInput={this.state.minValueInput}
          onChangeMinValue={this.onChangeMinValue}
        />
        <BubbleWrapper 
          minValue={this.state.minValue}
        />
      </div>
    );
  }
}

const styles = {
  background: {
    height: '100vh',
    background: '#004A7C',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'  
  }  
}

export {App};
