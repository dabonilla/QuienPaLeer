import React from 'react';
import noResults from '../assets/img/NoResults.jpg'

const NoResultFound = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <img src={noResults} style={{ width: '30%', }} />
            <h5>No se encontraron resultados</h5>
            <lu style={{ fontSize: 12 }}>
                <li className='text-muted'>Intenta con términos más específicos.</li>
                <li className='text-muted'>Revisa la ortografía.</li>
                <li className='text-muted'>Revisa la sección en la que estás buscando.</li>
            </lu>
        </div>
    )
}
export default NoResultFound