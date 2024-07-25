import React from 'react'
import styles from '../form/form.module.css'

export default function Error() {
    return (
        <div className={styles.container}>
            <h3>API Error</h3>
            <p>Something went wrong with API data</p>
            <button>Delete</button>
            </div>
    )
}
