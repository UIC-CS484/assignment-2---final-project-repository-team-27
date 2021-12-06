import React from 'react';
import './ForgotPassword.css';
import NewUserImage from '../../Images/NewUserImage.png';
import Tilt from 'react-tilt';
import longArrowLeftIcon from '../../Images/long-arrow-left.svg';

class ForgotPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            statusMessage: '',
            oldEmail: '',
            renderEmail: true,
            inputOTP: '',
            serverOTP: '',
            renderOTP: false,
            newPassword: '',
            renderNewPassword: false,
            renderValidateEmail: true,
            renderValidateOTP: false,
            renderUpdatePassword: false,
            successMessage: ''
        }
    }

    onOldEmailChange = (event) => {
        this.setState({ oldEmail: event.target.value })
        this.setState({ statusMessage: '' })
    }

    onNewPasswordChange = (event) => {
        this.setState({ newPassword: event.target.value })
        this.setState({ statusMessage: '' })
    }

    oninputOTPChange = (event) => {
        this.setState({ inputOTP: event.target.value })
        this.setState({ statusMessage: '' })
    }

    onValidateEmail = () => {
        const { oldEmail } = this.state;
        if (oldEmail.length === 0) {
            this.setState({ statusMessage: 'All fields are necessary' })
        }
        else {
            fetch(`${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_SERVER_PORT}/generateotp`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: oldEmail
                }),
                credentials: 'include'
            })
                .then(response => response.json())
                .then(data => {
                    if (data.includes('Email does not exist'))
                        this.setState({ statusMessage: data })
                    else {
                        this.setState({ serverOTP: data })
                        this.setState({ renderEmail: false })
                        this.setState({ renderValidateEmail: false })
                        this.setState({ renderOTP: true })
                        this.setState({ renderValidateOTP: true })
                    }
                })
        }
    }

    onValidateOTP = () => {
        const { inputOTP, serverOTP } = this.state;
        if (inputOTP.length === 0) {
            this.setState({ statusMessage: 'All fields are necessary' })
        }
        else {
            if (inputOTP === serverOTP) {
                this.setState({ renderOTP: false })
                this.setState({ renderValidateOTP: false })
                this.setState({ renderNewPassword: true })
                this.setState({ renderUpdatePassword: true })
            }
            else {
                this.setState({ statusMessage: 'Incorrect OTP' })
            }
        }

    }

    onValidatePassword = () => {
        const { newPassword, oldEmail } = this.state;
        if (newPassword.length === 0) {
            this.setState({ statusMessage: 'All fields are necessary' })
        }
        else {

            fetch(`${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_SERVER_PORT}/updatepassword`, {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: oldEmail,
                    newPassword: newPassword
                }),
                credentials: 'include'
            })
            .then(response => response.json())
            .then(data => {
                if (data.includes('Password updated successfully')){
                    this.setState({ renderNewPassword: false })
                    this.setState({ renderUpdatePassword: false })
                    this.setState({ successMessage: 'Password Updated successfully. Please login to your account now.' })
                }
                else{
                    this.setState({ statusMessage: data })
                }

            })

        }
    }

    render() {
        const { onRouteChange } = this.props;
        const { statusMessage, renderNewPassword, renderOTP, renderEmail,
            renderValidateEmail, renderValidateOTP, renderUpdatePassword, successMessage } = this.state;
        return (
            <div className='forgotpassword'>
                <Tilt className="Tilt" options={{ max: 50, perspective: 700 }} >
                    <img src={NewUserImage} alt='New User Icon' id='forgotpassword-newuserimage' />
                </Tilt>
                <div className='forgotpassword-form'>
                    <h2 className='forgotpassword-h2'>Forgot Password</h2>
                    {
                        <p className='status-message'> {statusMessage} </p>
                    }
                    {
                        renderEmail ?
                            <input type='email' name='oldEmail' placeholder='Email' onChange={this.onOldEmailChange} />
                            : <div></div>
                    }
                    {
                        renderOTP ?
                            <input type='tel' name='inputOTP' placeholder='OTP' onChange={this.oninputOTPChange} />
                            : <div></div>
                    }
                    {
                        renderNewPassword ?
                            <input type='password' name='newPassword' placeholder='New Password' onChange={this.onNewPasswordChange} />
                            : <div></div>
                    }
                    {
                        renderValidateEmail ?
                            <button type='submit' name='validateEmail'
                                value='validateEmail' onClick={this.onValidateEmail}>VALIDATE EMAIL</button>
                            : <div></div>
                    }
                    {
                        renderValidateOTP ?
                            <button type='submit' name='validateOTP'
                                value='validateOTP' onClick={this.onValidateOTP}>VALIDATE OTP</button>
                            : <div></div>
                    }
                    {
                        renderUpdatePassword ?
                            <button type='submit' name='validatePassword'
                                value='validatePassword' onClick={this.onValidatePassword}>UPDATE PASSWORD</button>
                            : <div></div>
                    }
                    {
                        <p className='success-message'> {successMessage} </p>
                    }
                </div>
                <div className='forgotpassword-signin'>
                    <img src={longArrowLeftIcon} alt='Left Arrow Icon' id='forgotpassword-arrow-icon' />
                    <p onClick={() => onRouteChange('signin')}>Sign into your account</p>
                </div>
            </div>
        )
    }
}

export default ForgotPassword;