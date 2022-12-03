import React from 'react';
import {screen,render} from '@testing-library/react';
import '@testing-library/jest-dom';
import AddSwap from '../AddSwap';

beforeEach(()=>render(<AddSwap/>))

describe("Testing Component AddBookSale",()=>{
    it('must display a title',()=>{
        expect(screen.queryByText("Intercambiar libro")).toBeInTheDocument()
        screen.debug()
    });
    it('must display a labels',()=>{
        
        expect(screen.getByText(/Título/i, { selector: 'label' }))
        expect(screen.getByText(/Autor/i, { selector: 'label' }))
        expect(screen.getByText(/Descripción/i, { selector: 'label' }))
        expect(screen.getByText(/Interest/i, { selector: 'label' }))
        expect(screen.getByText(/Imagen/i, { selector: 'label' }))
    });

    it('must display a btn',()=>{
        const loginButton = screen.getByText(/Agregar/i, { selector: 'button' });
        expect(loginButton).toBeInTheDocument()
        screen.debug()
    });
});