import React, { Component } from 'react'
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

class ProductsInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            price: '',
            description: '',
            code: '',
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputPrice = async event => {
        const price = event.target.value
        this.setState({ price })
    }

    handleChangeInputDescription = async event => {
        const description = event.target.value
        this.setState({ description })
    }

    handleChangeInputCode = async event => {
        const code = event.target.value
        this.setState({ code })
    }

    handleIncludeProduct = async () => {
        const { name, price, description, code } = this.state
        const payload = { name, price, description, code }

        await api.insertProduct(payload).then(res => {
            window.alert(`Produto adicionado com successo`)
            this.setState({
                name: '',
                price: '',
                description: '',
                code: '',
            })
        })
    }

    render() {
        const { name, price, description, code } = this.state
        return (
            <Wrapper>
                <Title>Cadastrar Produto</Title>

                <Label>Produto: </Label>
                <InputText
                    type="text"
                    value={name}
                    onChange={this.handleChangeInputName}
                />

                <Label>Preço: </Label>
                <InputText
                    type="number"
                    value={price}
                    onChange={this.handleChangeInputPrice}
                />

                <Label>Descrição: </Label>
                <InputText
                    type="text"
                    value={description}
                    onChange={this.handleChangeInputDescription}
                />

                <Label>Código: </Label>
                <InputText
                    type="text"
                    value={code}
                    onChange={this.handleChangeInputCode}
                />

                <Button onClick={this.handleIncludeProduct}>Adicionar Produto</Button>
                <CancelButton href={'/products/list'}>Cancelar</CancelButton>
            </Wrapper>
        )
    }
}

export default ProductsInsert