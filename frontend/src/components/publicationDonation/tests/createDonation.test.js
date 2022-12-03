import React from 'react';
import {screen,render} from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateDonation from '../CreateDonation';

beforeEach(()=>render(<CreateDonation/>))

describe("Testing Component CreateDonation",()=>{
    it('must display a title',()=>{
        expect(screen.queryByText("Crear Donación")).toBeInTheDocument()
        screen.debug()
    });
    it('must display a labels',()=>{
        
        expect(screen.getByText(/Título de la publicación/i, { selector: 'label' }))
        expect(screen.getByText(/Nombre del libro/i, { selector: 'label' }))
        expect(screen.getByText(/Autor/i, { selector: 'label' }))
        expect(screen.getByText(/Editorial/i, { selector: 'label' }))
        expect(screen.getByText(/Imagen/i, { selector: 'label' }))
    });

    it('must display a btn',()=>{
        const loginButton = screen.getByText(/Agregar/i, { selector: 'button' });
        expect(loginButton).toBeInTheDocument()
        screen.debug()
    });
});