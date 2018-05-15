import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {PropTypes} from 'prop-types';
import '../css/product.css';
import 'whatwg-fetch';
import _ from 'lodash';
import EditIcon from 'material-ui-icons/Edit';
import DeleteIcon from 'material-ui-icons/Delete';

class Product extends React.Component {

    getChildContext() {
        return {muiTheme: getMuiTheme(baseTheme)};
    }

    componentDidMount() {
        fetch('http://localhost:8000/api/getProducts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                _.map(data.body, (entry, index) => {
                    this.props.fields.push(entry);
                });
            })
    }

    state = {
        edit: false,
        open: false,
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false, edit: false});
        this.clearProductDetails();
        this.editProductId = null;
        this.editProductIndex = null;
    };

    getProductDetails() {
        if(document.getElementById("productDataForm")) {
            let elements = document.getElementById("productDataForm").elements;
            let product = {};
            for (let i = 0; i < elements.length; i++) {
                let item = elements.item(i);
                if (item.name)
                    product[item.name] = item.value;
            }
            return product;
        }
        return;
    }

    setProductDetails(data) {
        let elements = document.getElementById("productDataForm").elements;
        for(let i = 0 ; i < elements.length ; i++){
            let item = elements.item(i);
            if(item.name)
                item.value = data[item.name];
        }
    }

    clearProductDetails() {
        let elements = document.getElementById("productDataForm").elements;
        for(let i = 0 ; i < elements.length ; i++){
            let item = elements.item(i);
            if(item.name)
                item.value = '';
        }
    }

    createProduct = (fields) => {
        const productData = this.getProductDetails();
        fetch('http://localhost:8000/api/createProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const id = data.body._id;
                productData._id = id;
                fields.push(productData);
            });
        this.handleClose();
        this.clearProductDetails();
    };

    deleteProduct = (index) => {
        const productId = this.props.fields.get(index)._id;
        let that = this;
        fetch(`http://localhost:8000/api/deleteProduct/${productId}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                that.props.fields.remove(index);
            })
    };

    editProduct = (index) => {
        const productDetail = this.props.fields.get(index);
        this.editProductId = productDetail._id;
        this.editProductIndex = index;
        this.setState({open: true, edit: true}, () => {
            this.setProductDetails(productDetail);
        });
    };

    updateProduct = () => {
        const productData = this.getProductDetails();
        const productId = this.editProductId;
        let that = this;
        fetch(`http://localhost:8000/api/updateProduct/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                that.props.fields.remove(that.editProductIndex);
                that.props.fields.insert(that.editProductIndex, data.body);
                that.handleClose();
                that.clearProductDetails();
                that.editProductId = null;
                that.editProductIndex = null;
            });

    };

    render() {
        const{fields} = this.props;
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={() => this.state.edit ? this.updateProduct() : this.createProduct(fields)}
            />
        ];

        return (<div>
            <Dialog
                title="Create Product"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                autoScrollBodyContent={true}
            >
                <form onSubmit={this.submit} id={'productDataForm'}>
                    <label className="modal-label" htmlFor="group">Group</label>
                    <input name={'group'} type={'text'}/>
                    <label className="modal-label" htmlFor="code">Code</label>
                    <input name={'code'} type={'text'}/>
                    <label className="modal-label" htmlFor="name">Name</label>
                    <input name={'name'} type={'text'}/>
                    <label className="modal-label" htmlFor="description">Description</label>
                    <input name={'description'} type={'text'}/>
                    <label className="modal-label" htmlFor="url">Image Url</label>
                    <input name={'url'} type={'text'}/>
                </form>
            </Dialog>
            <div className={'button-container'}>
                <button className={'product-add-button'} type="button" onClick={this.handleOpen}>
                    Add Product
                </button>
            </div>
            {fields.map((member, index) => (
                <div key={index} className={'product-box'}>
                    <div>
                        <img className={'image-conatiner'} src={fields.get(index).url} alt={'product'}/>
                        <div className={'product-name'}>{fields.get(index).name}</div>
                        <div className={'delete-button'} onClick={() => this.deleteProduct(index)}>
                            <DeleteIcon/>
                        </div>
                        <div className={'edit-button'} onClick={() => this.editProduct(index)}>
                            <EditIcon/>
                        </div>
                    </div>
                </div>
            ))}
        </div>)
    }
}

Product.childContextTypes = {
    muiTheme: PropTypes.object
};


export default Product;

