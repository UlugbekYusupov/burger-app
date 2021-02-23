import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import styles from './Sidedrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux'

function sidedrawer(props) {
    let attachedClasses = [styles.Sidedrawer, styles.Close]
    if(props.open) {
        attachedClasses = [styles.Sidedrawer, styles.Open]
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={styles.Logo}><Logo/></div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
    )
}

export default sidedrawer
