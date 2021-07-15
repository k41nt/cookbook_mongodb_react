import React, { useState, useEffect } from 'react'
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

const RecipesUpdate = (props) => {
    // const [id, setId] = useState(props.match.params.id);
    const [name, setName] = useState('');
    const [instruction, setInstruction] = useState('');
    const [ingredients, setIngredients] = useState([]);

    const handleChangeInputName = async event => {
        let nameInput = event.target.value
        setName(nameInput);
    }

    const handleChangeInputInstruction = async event => {
        let instructionInput = event.target.validity.valid
            ? event.target.value
            : instruction

        setInstruction(instructionInput);
    }

    const handleChangeInputIngredients = async event => {
        const ingredientsInput = event.target.value
        setIngredients(ingredientsInput);
    }

    const handleUpdateRecipe = async () => {
        const arrayIngredients = ingredients.split(', ')
        const payload = { name, instruction, ingredients: arrayIngredients }

        await api.updateRecipeById(props.match.params.id, payload).then(res => {
            window.alert(`Recipe updated successfully`)
            setName('');
            setIngredients([]);
            setInstruction('');
            window.location.href = `/recipes/list`;
        })
    }

    useEffect(() => {
        async function getRecipe(){
            let recipe = await api.getRecipeById(props.match.params.id)
            setName(recipe.data.data.name);
            setIngredients(recipe.data.data.ingredients.join(', '));
            setInstruction(recipe.data.data.instruction);
        }
        getRecipe();

    }, [props.match.params.id])
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

            <Button onClick={handleUpdateRecipe}>Update Recipe</Button>
            <CancelButton href={'/recipes/list'}>Cancel</CancelButton>
        </Wrapper>
    )
}

export default RecipesUpdate
