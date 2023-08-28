import React from 'react';
import styles from './MyPagination.module.css'


const MyPagination = ({totalPages, currentPage, setCurrentPage}) => {
    return (
        <div className={styles.pageWrapper}>{totalPages.map(page =>
            <span
                onClick={() => {
                    setCurrentPage(page)
                }}
                key={page}
                className={page === currentPage ? `${styles.pageCurrent} ${styles.page}` : styles.page}
            >
                            {page}
                        </span>)}
        </div>
    );
};

export default MyPagination;