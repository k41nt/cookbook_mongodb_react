import React, { useState } from 'react'
import api from '../api'


import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

const RecipesInsert = () => {
    const [name, setName] = useState('');
    const [instruction, setInstruction] = useState('');
    const [ingredients, setIngredients] = useState([]);

    const handleChangeInputName = async event => {
        let nameInput = event.target.value;
        setName(nameInput);
    }

    const handleChangeInputInstruction = async event => {
        let instructionInput = event.target.validity.valid
            ? event.target.value
            : instruction
        setInstruction(instructionInput);
    }

    const handleChangeInputIngredients = async event => {
        let ingredientsInput = event.target.value;
        setIngredients(ingredientsInput);
    }

    const handleIncludeRecipe = async () => {
        const arrayIngredients = ingredients.split(', ');
        const payload = { name, instruction, ingredients: arrayIngredients };

        await api.insertRecipe(payload).then(res => {
            window.alert(`Recipe inserted successfully`);
            setName('');
            setIngredients([]);
            setInstruction('');
            window.location.href = `/recipes/list`;
        })
    }

    return (
        <Wrapper>
            <Title>Create Recipe</Title>

            <Label>Name: </Label>
            <InputText
                type="text"
                value={name}
                onChange={handleChangeInputName}
            />

            <Label>Instruction: </Label>
            <InputText
                type="text"
                value={instruction}
                onChange={handleChangeInputInstruction}
            />

            <Label>Ingredients: </Label>
            <InputText
                type="text"
                value={ingredients}
                onChange={handleChangeInputIngredients}
            />

            <Button onClick={handleIncludeRecipe}>Add Recipe</Button>
            <CancelButton href={'/recipes/list'}>Cancel</CancelButton>
        </Wrapper>
    )
}

export default RecipesInsert
