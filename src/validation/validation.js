import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useLocation } from 'react-router-dom';


export function useFormWithValidation() {
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);
    const currentUser = React.useContext(CurrentUserContext);
    const location = useLocation();
    const locationProfile = ['/profile'].includes(location.pathname);

    const handleChange = (event) => {
        const { name, value } = event.target
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: event.target.validationMessage });

        setIsValid(event.target.closest('form').checkValidity());
    };
    React.useEffect(() => {
        if ((locationProfile) && (((values.name === currentUser.name) && (values.email === currentUser.email)))) {
            setIsValid(false);
            return;
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