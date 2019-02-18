import React from 'react';

const Header = (props) => {
    return (
        <div style={styles.titleWrapper}>
            <h1 style={styles.title}>
                Unconfirmed Bitcoin transactions
            </h1>
            <h2>Click on bubbles for more info</h2>
            <div style={styles.inputWrapper}>
                <span>Minimum value of transaction</span>
                <input
                    type="text"
                    value={props.minValueInput}
                    onChange={props.onChangeMinValue}
                    style={styles.input}
                />
                <span>BTC</span>
            </div>
        </div>
    )
}

const styles = {    
    title: {
        textAlign: 'center'
    },
    inputWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleWrapper: {
        background: '#fff',
        textAlign: 'center',
        zIndex: 10,
        borderRadius: 30,
        alignSelf: 'flex-start',
        padding: '17px',
        marginTop: '10px',
        color: '#004A7C',
        fontWeight: 700
    },
    input: {
        width: '100%',
        height: '45px',
        fontSize: '19px',
        padding: '0px 16px',
        border: 'none',
        borderRadius: '4px',
        fontWeight: 400,
        lineHeight: 'normal',
        backgroundColor: '#959595',
        color: '#004A7C',
        outline: 'none',
        marginLeft: '10px',
        marginRight: '10px',

    }
}

export {Header}