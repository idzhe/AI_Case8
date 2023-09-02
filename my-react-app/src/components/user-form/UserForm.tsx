import React, { useState } from 'react';
import validator from 'validator';

interface UserFormProps {
    onSubmit: (data: { firstName: string; lastName: string; email: string; message: string }) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({
        firstName: false,
        lastName: false,
        email: false,
        message: false
    });

    const validateField = (field: string, value: string) => {
        switch (field) {
            case 'firstName':
                return value.trim() ? '' : 'First name is required.';
            case 'lastName':
                return value.trim() ? '' : 'Last name is required.';
            case 'email':
                return validator.isEmail(value) ? '' : 'Email is not valid.';
            case 'message':
                return value.trim() ? '' : 'Message is required.';
            default:
                return '';
        }
    }

    type FieldNames = 'firstName' | 'lastName' | 'email' | 'message';

    const handleBlur = (field: FieldNames) => {
        setTouched(prev => ({ ...prev, [field]: true }));

        const fields = {
            firstName,
            lastName,
            email,
            message
        };

        const error = validateField(field, fields[field]);

        setErrors(prev => ({ ...prev, [field]: error }));
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'message':
                setMessage(value);
                break;
        }

        if (touched[name]) {
            setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
        }
    }

    const isFormValid = !Object.values(errors).some(error => error);

    const styles: { [key: string]: React.CSSProperties } = {
        form: {
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '300px',
            margin: '0 auto'
        },
        input: {
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px'
        },
        error: {
            color: 'red',
            fontSize: '0.8rem'
        },
        errorMessage: {
            height: '1rem',
            color: 'red',
            fontSize: '0.8rem',
            margin: '4px 0'
        },
        button: {
            padding: '10px 15px',
            background: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
        },
        disabledButton: {
            opacity: 0.5,
            cursor: 'not-allowed'
        }
    };

    return (
        <form onSubmit={e => {
            e.preventDefault();
            if (isFormValid) onSubmit({ firstName, lastName, email, message });
        }} style={styles.form}>
            <input
                name="firstName"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={handleChange}
                onBlur={() => handleBlur('firstName')}
                style={styles.input}
            />

            <p style={styles.errorMessage}>
                <span>{(touched.firstName && errors.firstName) || '\u00A0'}</span>
            </p>

            <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={handleChange}
                onBlur={() => handleBlur('lastName')}
                style={styles.input}
            />

            <p style={styles.errorMessage}>
                <span>{(touched.lastName && errors.lastName) || '\u00A0'}</span>
            </p>

            <input
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                style={styles.input}
            />

            <p style={styles.errorMessage}>
                <span>{(touched.email && errors.email) || '\u00A0'}</span>
            </p>

            <textarea
                name="message"
                placeholder="Message"
                value={message}
                onChange={handleChange}
                onBlur={() => handleBlur('message')}
                style={styles.input}
            />

            <p style={styles.errorMessage}>
                <span>{(touched.message && errors.message) || '\u00A0'}</span>
            </p>

            <button type="submit"
                    style={isFormValid ? styles.button : {...styles.button, ...styles.disabledButton}}
                    disabled={!isFormValid}>Submit
            </button>
        </form>
    );
}

export default UserForm;
