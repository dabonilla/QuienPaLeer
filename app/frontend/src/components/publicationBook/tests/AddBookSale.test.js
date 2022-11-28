import React from 'react';
import {screen,render} from '@testing-library/react';
import '@testing-library/jest-dom';
import FormBook from '../AddBookSale';

beforeEach(()=>render(<FormBook/>))

describe("Testing Component AddBookSale",()=>{
    it('must display a title',()=>{
        expect(screen.queryByText("Agregar libro")).toBeInTheDocument()
        
    });

    it('must display a labels',()=>{
        
        expect(screen.getByText(/Título de la venta/i, { selector: 'label' }))
        expect(screen.getByText(/Nombre del libro/i, { selector: 'label' }))
        expect(screen.getByText(/Autor/i, { selector: 'label' }))
        expect(screen.getByText(/Editorial/i, { selector: 'label' }))
        expect(screen.getByText(/Año/i, { selector: 'label' }))
        expect(screen.getByText(/Categoría/i, { selector: 'label' }))
        expect(screen.getByText(/Precio/i, { selector: 'label' }))
        expect(screen.getByText(/Imagen/i, { selector: 'label' }))
    });

    it('must display a btn',()=>{
        const loginButton = screen.getByText(/Agregar/i, { selector: 'button' });
        expect(loginButton).toBeInTheDocument()
        screen.debug()
    });

});