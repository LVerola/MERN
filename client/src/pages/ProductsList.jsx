import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import api from '../api'

import styled from 'styled-components'

import 'react-table-6/react-table.css'

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

class UpdateProduct extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/products/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteProduct extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Você tem certeza que quer deletar o produto ${this.props.id} permanentemente?`,
            )
        ) {
            api.deleteProductById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

class ProductsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllProducts().then(products => {
            this.setState({
                products: products.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { products, isLoading } = this.state
        console.log('TCL: ProductsList -> render -> products', products)

        const columns = [
            {
                Header: 'Código',
                accessor: 'code',
                filterable: true,
            },
            {
                Header: 'Produto',
                accessor: 'name',
                filterable: true,
            },
            {
                Header: 'Preço',
                accessor: 'price',
                filterable: true,
            },
            {
                Header: 'Descrição',
                accessor: 'description',
                filterable: true,
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteProduct id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateProduct id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!products.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={products}
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
}

export default ProductsList