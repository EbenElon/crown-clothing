import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument} from '../../firebase/firebase.utils'
import './sign-up.styles.scss'

class SignUp extends React.Component {
    constructor () {
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            comfirmPassword: ''
        }
    }

    handleSubmit =async (e) => {
        e.preventDefault();

        const { displayName, email, password, comfirmPassword } = this.state;

        if (password !== comfirmPassword) {
            alert("password don't much")
            return;
        }

        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password)
            
            await createUserProfileDocument(user,{displayName})
            
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch(err) {
            console.error(err);
        }
    };

    handleChange = e => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    render() {
        const {displayName, email, password, comfirmPassword} = this.state;
        return (
            <div className='sign-up'>
            <h2 className='title'>I do not have an account</h2>
            <span>Sign up with your Email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={this.handleChange}
                    label='Display Name'
                    required
                    />
                    
                    <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange={this.handleChange}
                    label='Email'
                    required
                    />

                    <FormInput
                    type='password'
                    name='password'
                    value={password}
                    onChange={this.handleChange}
                    label='Password'
                    required
                    />

                    <FormInput
                    type='password'
                    name='comfirmPassword'
                    value={comfirmPassword}
                    onChange={this.handleChange}
                    label='Comfirm password'
                    required
                    />
                    <CustomButton type='submit'>Sign Up</CustomButton>
                     
                </form>
            </div>
        )
    }
}

export default SignUp;