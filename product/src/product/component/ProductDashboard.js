import React from 'react';
import Products from './Product';
import { FieldArray, reduxForm } from 'redux-form'
class ProductDashBoard extends React.Component {

    render() {
        return (
            <form>
                <FieldArray
                    name={'products'}
                    component={Products}
                />
            </form>
        );
    }
}

export default reduxForm({
    form: 'productsForm'
})(ProductDashBoard)