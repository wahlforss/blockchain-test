import React, { Component } from 'react';
import { Bubble } from './Bubble';
import omit from 'lodash/omit'

class BubbleWrapper  extends Component {
    constructor(props) {
        super(props)
        this.state = {            
            bubbles: {},                        
        }
        this.socket = new WebSocket('wss://ws.blockchain.info/inv');                        
    }

    componentDidMount() {                                      
        this.socket.onopen = (event) => {
            this.socket.send('{ "op": "unconfirmed_sub" }');
            console.log('open');            
            this.socket.addEventListener('message', this.onNewTransaction)
        }                
    }

    // Scale of bubbles is relative to the size of transcation
    calculateScale = (price) => {
        const percentageOfMinValue = Math.log(((price + 0.5) / this.props.minValue))
        return Math.min(percentageOfMinValue, 3)
    }


    onNewTransaction = (event) => {        
        const data = JSON.parse(event.data)
        const outputArray = data.x.out        
        outputArray.forEach((outputObject) => {
            const bitcoinPrice = outputObject.value
            if (bitcoinPrice >= this.props.minValue) {
                const newBubbleSymbol = Symbol()
                const bitcoinPriceInBtc = Math.round((bitcoinPrice / 100000000) * 100) / 100                                
                const animationEnd = Math.max(4000, Math.floor(Math.random() * 6000)) 
                const newBubble = (
                    <Bubble
                        animationEnd={animationEnd} // animation ends randomly
                        bitcoinPrice={bitcoinPriceInBtc}
                        key={Math.random()}
                        scale={this.calculateScale(bitcoinPrice)}
                        deleteBubble={this.deleteBubble.bind(this, newBubbleSymbol)}
                        addr={outputObject.addr}
                        txIndex={outputObject.tx_index}
                    />
                )
                this.setState({
                    bubbles: {
                        ...this.state.bubbles,
                        [newBubbleSymbol]: newBubble                    
                    },                
                })
            }        
        })
    }

    // Deletes bubble from state so that the memory can last
    deleteBubble = (deleteSymbol) => {        
        const currentBubblesState = omit(this.state.bubbles, deleteSymbol)
        this.setState({
            bubbles: {
                ...currentBubblesState
            }
        })        
    }

    renderBubbles = () => {
        const bubbles = Object.getOwnPropertySymbols(this.state.bubbles)                        
        return (
            <div style={styles.bubbleWrapper}>
                {bubbles.map((bubbleSymbol) => {
                    return (
                        this.state.bubbles[bubbleSymbol]
                    )
                })}
            </div>
        )
    }

    render() {
        return (            
            this.renderBubbles()            
        );
    }
}

const styles = {
    bubbleWrapper: {
        position: 'absolute',        
        height: '60%',
        width: '60%',
    }
}

export {BubbleWrapper};
