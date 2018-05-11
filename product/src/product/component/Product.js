import React from 'react';
import { Field } from 'redux-form'

class Product extends React.Component {


    state = {openAddProductModal: false};

    createProduct = () => {
        this.setState({openAddProductModal : true})
    };

    render() {
      const{fields} = this.props;
        return (<ul>
            <li>
                <button type="button" onClick={() => fields.push({})}>
                    Add Member
                </button>
            </li>
            {fields.map((member, index) => (
                <li key={index}>
                    <button
                        type="button"
                        title="Remove Member"
                        onClick={() => fields.remove(index)}
                    />
                    <h4>Member #{index + 1}</h4>
                    <Field
                        name={`${member}.firstName`}
                        type="text"
                        component={"input"}
                        label="First Name"
                    />
                    <Field
                        name={`${member}.lastName`}
                        type="text"
                        component={"input"}
                        label="Last Name"
                    />
                </li>
            ))}
        </ul>)
    }
}

export default Product;

