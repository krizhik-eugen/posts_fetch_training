import React from 'react';
import styles from './MyModal.module.css'

const MyModal = ({children, visible, setVisible}) => {

    const modalClasses = [styles.myModal]

    if (visible) {
        modalClasses.push(styles.active)
    }

    return (
        <div className={modalClasses.join(' ')} onClick={()=>setVisible(false)}>
            <div className={styles.myModalContent} onClick={(e)=>{e.stopPropagation()}}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;