import React from 'react'
import burgerLogo from '../../assets/Images/photo_2021-02-23 10.31.03.jpeg'
import styles from './Logo.module.css'

function logo() {
    return (
        <div className={styles.Logo}>
            <img src = {burgerLogo} alt="MyBurger"/>
        </div>
    )
}

export default logo
