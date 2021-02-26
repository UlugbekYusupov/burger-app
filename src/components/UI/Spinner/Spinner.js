import React from 'react'
import styles from './Spinner.module.css'

function spinner() {
    return (
        <div className={styles.Loader}>
            Loading...
        </div>
    )
}

export default spinner
