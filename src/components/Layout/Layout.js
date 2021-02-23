import React from 'react'
import Aux from '../../hoc/Aux';
import styles from './Layout.module.css'
import ToolBar from '../Navigation/Toolbar/Toolbar'

function layout(props) {
    return (
        <Aux>
            <ToolBar/>
            <main className={styles.Content}>
                {props.children}
            </main>
        </Aux>
    )
}

export default layout
