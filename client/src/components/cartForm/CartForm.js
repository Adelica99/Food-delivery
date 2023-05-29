import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';
import { fetchOrder } from '../order/OrderSlice';
import { setAnimation} from '../order/OrderSlice';

import './cartForm.scss';

const CartForm = () => {
    const { totalPrice, order, animation } = useSelector(state => state.order);
    const dispatch = useDispatch();

    const onSendOrder = (userData, {resetForm}) => {
        userData.order = order;
        userData.totalPrice = totalPrice;
        if (userData.order.length > 0) {
            dispatch(fetchOrder(JSON.stringify(userData)));
            resetForm();
            localStorage.clear();
        } else {
            dispatch(setAnimation({'animation': 'shake 0.5s ease-in-out'}));
        }
    }

    useEffect(() => {
        if (animation.animation.length > 0) {
            const timeout = setTimeout(() => {
                dispatch(setAnimation({'animation': ''}));
            }, 400);
        
            return () => clearTimeout(timeout);
        }
      }, [animation]);

    return (
        <div className="cartForm">
            <Formik
                initialValues = {{
                    addres: '',
                    email: '',
                    phone: '',
                    name: ''
                }}
                validationSchema = {Yup.object({
                    addres: Yup.string()
                            .required('field is empty'),
                    email: Yup.string()
                            .email('wrong email')
                            .required('field is empty'),
                    phone: Yup.string()
                        .matches(/^\+\d{2} \(\d{3}\) \d{3} \d{2} \d{2}$/, "wrong number")
                        .required('field is empty'),
                    name: Yup.string()
                        .required('field is empty')
                    })}
                    onSubmit={(value, {resetForm}) => {onSendOrder(value, {resetForm})}}>
                {
                    ({values, handleBlur, handleChange}) => (
                        <Form className='cartForm__wrapper'>
                            <div className="cartForm__field">
                                <label className='cartForm__lable' htmlFor="addres">Addres:</label>
                                <Field className='cartForm__input' name="addres" type="text" placeholder='addres'/>
                                <ErrorMessage className='cartForm__input-error' name="addres" style={{'color': '#e01020'}} component='div'/>
                            </div>
                            <div className="cartForm__field">
                                <label className='cartForm__lable' htmlFor="email">Email:</label>
                                <Field className='cartForm__input' name="email" type="text" placeholder='email'/>
                                <ErrorMessage className='cartForm__input-error' name="email" style={{'color': '#e01020'}} component='div'/>
                            </div>
                            <div className="cartForm__field">
                                <label className='cartForm__lable' htmlFor="phone">Phone:</label>
                                <InputMask  type="tel" 
                                            mask="+38 (999) 999 99 99" 
                                            name='phone'
                                            placeholder='phone' 
                                            onChange={handleChange} 
                                            onBlur={handleBlur} 
                                            value={values.phone} 
                                            className="cartForm__input"/>
                                <ErrorMessage className="cartForm__input-error" style={{'color': '#e01020'}} name='phone' component='div'/>
                            </div>
                            <div className="cartForm__field">
                                <label className='cartForm__lable' htmlFor="name">Name:</label>
                                <Field className='cartForm__input' name="name" type="text" placeholder='name'/>
                                <ErrorMessage className='cartForm__input-error' name="name" style={{'color': '#e01020'}} component='div'/>
                            </div>
                            <div className="cartForm__bottom">
                                <div className="cartForm__total">Total price: <span>{totalPrice}$</span></div>
                                <button type='submit' className="cartForm__btn">Submit</button>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}

export default CartForm;