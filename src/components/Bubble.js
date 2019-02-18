import React, { Component } from 'react';
import posed from 'react-pose';

const colorArray = ['#FFFBD6', '#F9F2B2', '#F9EFA2', '#FAED85', '#FDEC61']

class Bubble extends Component {

    constructor(props) {                
        super(props)

        // initialises the bubble and creates a pose div. 
        this.BubblePose = posed.div({
            end: {
                scale: 0,                
                transition: {                    
                    duration: 400,
                    ease: 'easeInOut'
                }
            },
            middle: {
                scale: this.props.scale,
                delay: Math.floor(Math.random() * 3000), // starts  
                transition: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 10
                }
            },
            start: {
                scale: 0,                
            },
            fill: {                
                scale: 10,
                left: '42%',
                top: '40%',
                transition: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 10
                }
            }
        });

        this.state = {
            pose: 'middle'
        }

        this.left = Math.floor(Math.random() * 100)
        this.top = Math.floor(Math.random() * 100) 
    }

    componentDidMount() {
        // Hides bubble after animation end
        this.timeout = setTimeout(() => {
            this.setState({
                pose: 'end'
            })        
            setTimeout(() => {
                this.props.deleteBubble()
            }, 400);
        }, this.props.animationEnd);
        
    }

    // Changes pose if bubble is clicked
    onClickBubble = () => {
        if (this.state.pose !== 'fill') {
            this.setState({
                pose: 'fill'
            })
            clearTimeout(this.timeout)            
        } else {
            this.setState({
                pose: 'end'
            })
            setTimeout(() => {
                this.props.deleteBubble()
            }, 400);
        }        
    }
    
    // renders dynamic text content, depends on clicked or not
    renderTextContent = () => {
        if (this.state.pose === 'fill') {
            return (
                <div style={styles.bigText}>
                    <div>{this.props.bitcoinPrice} BTC </div>
                    <div>Address: {this.props.addr}</div>
                    <div>Tx Index: {this.props.txIndex}</div>
                </div>
            )
        } else {
            return (
            <div>
                {this.props.bitcoinPrice} BTC 
            </div>
            )
        }
    }

    render() { 
        const position = {
            left: `${this.left}%`,
            top: `${this.top}%`,
            background: colorArray[Math.round(this.props.scale)],
            zIndex: this.state.pose === 'fill' ? 5 : 1
        }
        
        return (
            <this.BubblePose 
                style={{...styles.bubble, ...position}}         
                pose={this.state.pose} 
                initialPose='start'
                onClick={this.onClickBubble}
            >
                {this.renderTextContent()}
            </this.BubblePose>
        );
    }
}

const styles = {
    bubble: {
        height: '100px',
        width: '100px',
        borderRadius: '300px',        
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#004A7C',
        position: 'absolute',
        cursor: 'pointer'
    },
    bigText: {
        fontSize: '3px'
    }
}
export {Bubble}