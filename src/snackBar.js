import React, { PureComponent } from 'react';
import styles from './assets/snackBar.module.css'

export default class Snackbar extends PureComponent {
    message = ''

    state = {
        isActive: false,
    }

    openSnackBar = (message = 'Something went wrong...') => {
        this.message = message;
        this.setState({ isActive: true }, () => {
            setTimeout(() => {
                this.setState({ isActive: false });
            }, 5000);
        });
    }

    render() {
        const { isActive } = this.state;
        return (
            <div className={isActive ? styles.snackbar + " " + styles.show : styles.snackbar}>
                {this.message}
            </div>
        )
    }
}
