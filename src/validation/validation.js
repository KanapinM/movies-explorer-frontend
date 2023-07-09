import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useLocation } from 'react-router-dom';
import { isEmail } from 'validator';

export function useFormWithValidation() {
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [validEmail, setValidEmail] = React.useState(false);
    const [isValid, setIsValid] = React.useState(false);
    const currentUser = React.useContext(CurrentUserContext);
    const location = useLocation();
    const locationProfile = ['/profile'].includes(location.pathname);

    const handleChange = (event) => {
        const { name, value } = event.target
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: event.target.validationMessage });

        setIsValid(event.target.closest('form').checkValidity());

        if ((event.target.name === 'email')) {
            setErrors({ ...errors, [name]: (!isEmail(value)) ? (event.target.validationMessage || 'Некорректный Email') : '' });
            setValidEmail(isEmail(value));
            setIsValid(isEmail(value) && event.target.closest('form').checkValidity());
        }
    };

    React.useEffect(() => {
        if ((locationProfile) && (values.email === currentUser.email)) {
            if (values.name === currentUser.name) {
                setIsValid(false);
            } else { setIsValid(true) }
        } else if (!validEmail) {
            setIsValid(false);
        }

    }, [handleChange]);

    const resetForm = React.useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return { values, setValues, handleChange, errors, isValid, setIsValid, resetForm };
}