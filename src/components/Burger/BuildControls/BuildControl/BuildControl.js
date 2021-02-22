import React from 'react'
import styles from './BuildControl.module.css'

function buildControl(props) {
    return (
        <div className={styles.BuildControl}>
            <div className={styles.Label}>{props.label}</div>
            <button 
                className={styles.Less} 
                onClick={props.removed} 
                disInfo={props.disabledInfo}>Less</button>

            <button className={styles.More} onClick={props.added}>More</button>
        </div>
    )
}

export default buildControl
