import React from 'react';
import { Field } from 'redux-form'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {PropTypes} from 'prop-types';
import '../css/product.css';

class Product extends React.Component {

    getChildContext() {
        return {muiTheme: getMuiTheme(baseTheme)};
    }

    state = {
        open: false,
        canSubmit: false
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
        this.clearProductDetails();
    };

    getProductDetails() {
        let elements = document.getElementById("productDataForm").elements;
        let product = {};
        for(let i = 0 ; i < elements.length ; i++){
            let item = elements.item(i);
            if(item.name)
                product[item.name] = item.value;
        }
        return product;
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
        fields.push(productData);
        this.handleClose();
        this.clearProductDetails();
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
                onClick={() => this.createProduct(fields)}
            />,
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
                    <label className="modal-label" htmlFor="title">Title</label>
                    <input name={'title'} type={'text'}/>
                    <label className="modal-label" htmlFor="id">Id</label>
                    <input name={'id'} type={'text'}/>
                    <label className="modal-label" htmlFor="name">Name</label>
                    <input name={'name'} type={'text'}/>
                    <label className="modal-label" htmlFor="description">Description</label>
                    <input name={'description'} type={'text'}/>
                </form>
            </Dialog>
            <div className={'button-container'}>
            <button className={'product-add-button'} type="button" onClick={this.handleOpen}>
                Add Product
            </button>
            </div>
            {fields.map((member, index) => (
                <div key={index} className={'product-container'}>
                    <div className={'product-box'}>
                        <div>
                            <span>Title:</span>
                            <span>{fields.get(index).title}</span>
                        </div>
                    </div>
                    {/*<button*/}
                        {/*type="button"*/}
                        {/*title="Remove Product"*/}
                        {/*onClick={() => fields.remove(index)}*/}
                    {/*>Remove*/}
                    {/*</button>*/}
                    {/*<h4>Product #{index + 1}</h4>*/}
                    {/*<Field*/}
                        {/*name={`${member}.title`}*/}
                        {/*type="text"*/}
                        {/*component={"input"}*/}
                        {/*label="Title"*/}
                    {/*/>*/}
                    {/*<Field*/}
                        {/*name={`${member}.id`}*/}
                        {/*type="text"*/}
                        {/*component={"input"}*/}
                        {/*label="Id"*/}
                    {/*/>*/}
                    {/*<Field*/}
                        {/*name={`${member}.name`}*/}
                        {/*type="text"*/}
                        {/*component={"input"}*/}
                        {/*label="Product Name"*/}
                    {/*/>*/}
                    {/*<Field*/}
                        {/*name={`${member}.description`}*/}
                        {/*type="text"*/}
                        {/*component={"input"}*/}
                        {/*label="Description"*/}
                    {/*/>*/}
                </div>
            ))}
        </div>)
    }
}

Product.childContextTypes = {
    muiTheme: PropTypes.object
};


export default Product;

