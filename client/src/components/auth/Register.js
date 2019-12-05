import React, { Component } from 'react';
import classnames from 'classnames';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            av_email: '',
            av_password: '',
            api_client_id: '',
            api_client_secret: '',
            regOK: false,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const newAVUser = {
            av_email: this.state.av_email,
            av_password: this.state.av_password,
            api_client_id: this.state.api_client_id,
            api_client_secret: this.state.api_client_secret
        }
        console.log(newAVUser);

        fetch("/api/av-users/register", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newAVUser)
        })
            .then(response => {
                if (response) {
                    this.setState({ regOK: true });
                }
            })
            .catch(err => console.log(err));

    }

    render() {
        const { errors } = this.state;
        const text = this.state.regOK ? "AirVantage credentials created successfully!" : ""
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Register</h1>
                            <p className="lead text-center">Register AirVantage account and API Client credentials</p>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className={classnames('form-control form-control-lg', { 'is-invalid': errors.av_email })}
                                        placeholder="AV Email"
                                        name="av_email"
                                        value={this.state.av_email}
                                        onChange={this.onChange}
                                    />
                                    {errors.name && (<div className="invalid-feedback">{errors.av_email}</div>)}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        placeholder="AV Password"
                                        name="av_password"
                                        value={this.state.av_password}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="API Client ID"
                                        name="api_client_id"
                                        value={this.state.api_client_id}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="API Client Secret"
                                        name="api_client_secret"
                                        value={this.state.api_client_secret}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    className="btn btn-info btn-block mt-4"
                                />
                            </form>
                            <p>{text}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;