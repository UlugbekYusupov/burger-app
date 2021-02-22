import React from 'react'
import Aux from '../../hoc/Aux';
import styles from './Layout.module.css'
import Burger from '../Burger/Burger'

function layout(props) {
    return (
        <Aux>
            <div>ToolBar, SideDrawer, Backdrop</div>
            <main className={styles.Content}>
                {props.children}
            </main>
        </Aux>
    )
}

export default layout