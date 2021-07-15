import React, { useState, useEffect } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

const UpdateRecipe = (props) => {
    const updateUser = event => {
        event.preventDefault();

        window.location.href = `/recipes/update/${props.id}`;
    }

    return <Update onClick={updateUser}>Update</Update>

}

const DeleteRecipe = (props) => {
    const deleteUser = async event => {
        event.preventDefault();

        if (
            window.confirm(
                `Do you want to delete the recipe ${props.id} permanently?`,
            )
        ) {
            // This is tricky, the delete request makes a promise, we need to wait for the request to complete before reload the page
            await api.deleteRecipeById(props.id).then(result => result.data && window.location.reload());
        }
    }
    return <Delete onClick={deleteUser}>Delete</Delete>;
}

const RecipesList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [recipes, setRecipes] = useState({});

    useEffect(() => {

        async function getAllRecipes() {
            await api.getAllRecipes().then(recipes => {
                setIsLoading(false);
                setRecipes(recipes.data.data);
            })
        }
        getAllRecipes();

    }, []);

    const columns = [
        {
            Header: 'ID',
            accessor: '_id',
            filterable: true,
        },
        {
            Header: 'Name',
            accessor: 'name',
            filterable: true,
        },
        {
            Header: 'Ingredients',
            accessor: 'ingredients',
            filterable: true,
            Cell: props => <span>{props.value.join(', ')}</span>,
        },
        {
            Header: 'Instruction',
            accessor: 'instruction',
            filterable: true,
        },
        {
            Header: '',
            accessor: '',
            Cell: function (props) {
                return (
                    <span>
                        <DeleteRecipe id={props.original._id} />
                    </span>
                )
            },
        },
        {
            Header: '',
            accessor: '',
            Cell: function (props) {
                return (
                    <span>
                        <UpdateRecipe id={props.original._id} />
                    </span>
                )
            },
        },
    ]

    let showTable = true
    if (!recipes.length) {
        showTable = false
    }

    return (
        <Wrapper>
            {showTable && (
                <ReactTable
                    data={recipes}
                    columns={columns}
                    loading={isLoading}
                    defaultPageSize={10}
                    showPageSizeOptions={true}
                    minRows={0}
                />
            )}
        </Wrapper>
    )
}

export default RecipesList
