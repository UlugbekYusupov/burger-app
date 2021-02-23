import React from 'react'
import styles from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
]

function buildControls(props) {
    return (
        <div className={styles.BuildControls}>
            
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            
            {controls.map(ctrl => (
                <BuildControl  
                    key = {ctrl.label} 
                    label = {ctrl.label}
                    added = { () => props.ingredientAdded(ctrl.type)}
                    removed = {() => props.ingredientRemoved(ctrl.type)}
                    disabledInfo = {props.disableInfo[ctrl.type]}
                />
            ))}

            <button 
                className={styles.OrderButton}
                disabledInfo={!props.purchasable}
                onClick={props.ordered}>ORDER NOW</button>
        </div>
    )
}

export default buildControls
