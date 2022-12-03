import React from 'react';
import {screen,render} from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateRecommendation from '../CreateRecommendation';

beforeEach(()=>render(<CreateRecommendation/>))

describe("Testing Component CreateRecommendation",()=>{
    it('must display a title',()=>{
        expect(screen.queryByText("Crear Recomendación")).toBeInTheDocument()
        screen.debug()
    });
    it('must display a labels',()=>{
        
        expect(screen.getByText(/Título de la publicación/i, { selector: 'label' }))
        expect(screen.getByText(/Nombre del libro/i, { selector: 'label' }))
        expect(screen.getByText(/Autor/i, { selector: 'label' }))
        expect(screen.getByText(/Recomendación/i, { selector: 'label' }))
        expect(screen.getByText(/Resumen del libro/i, { selector: 'label' }))
        expect(screen.getByText(/Imagen/i, { selector: 'label' }))
    });

    it('must display a btn',()=>{
        const loginButton = screen.getByText(/Agregar/i, { selector: 'button' });
        expect(loginButton).toBeInTheDocument()
        screen.debug()
    });
});