import React, { Component } from 'react';
import classnames from 'classnames';

class System extends Component {
    constructor() {
        super();
        this.state = {
            av_email: '',
            phone_custom_1_value: '',
            phone_custom_1_timestamp: '',
            phone_custom_2_value: '',
            phone_custom_2_timestamp: '',
            phone_custom_3_value: '',
            phone_custom_3_timestamp: '',
            phone_custom_4_value: '',
            phone_custom_4_timestamp: '',
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

        fetch("/api/av-apis/last-datapoints", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "av_email": this.state.av_email })
        })
            .then(response => response.json())
            .then(data => {
                function timestampConverter(timestamp) {
                    let date = new Date(timestamp);
                    return date.toString();
                };

                // let timestamp1 = timestampConverter(data["phone.custom.1"][0].timestamp);
                // console.log(timestamp1);

                return this.setState({
                    phone_custom_1_value: data["phone.custom.1"][0].value,
                    phone_custom_1_timestamp: timestampConverter(data["phone.custom.1"][0].timestamp),
                    phone_custom_2_value: data["phone.custom.2"][0].value,
                    phone_custom_2_timestamp: timestampConverter(data["phone.custom.2"][0].timestamp),
                    phone_custom_3_value: data["phone.custom.3"][0].value,
                    phone_custom_3_timestamp: timestampConverter(data["phone.custom.3"][0].timestamp),
                    phone_custom_4_value: data["phone.custom.4"][0].value,
                    phone_custom_4_timestamp: timestampConverter(data["phone.custom.4"][0].timestamp)
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="system">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">System</h1>
                            <p className="lead text-center">Get last data points of a system from AirVantage</p>
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
                                <input
                                    type="submit"
                                    value="Get data"
                                    className="btn btn-info btn-block mt-4"
                                />
                            </form>
                            <br />
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th>Label</th>
                                        <th>Value</th>
                                        <th>Time</th>
                                    </tr>
                                    <tr>
                                        <td>A4 pages printed</td>
                                        <td>{this.state.phone_custom_1_value}</td>
                                        <td>{this.state.phone_custom_1_timestamp}</td>
                                    </tr>
                                    <tr>
                                        <td>A6 pages printed</td>
                                        <td>{this.state.phone_custom_2_value}</td>
                                        <td>{this.state.phone_custom_2_timestamp}</td>
                                    </tr>
                                    <tr>
                                        <td>Black ink level (%)</td>
                                        <td>{this.state.phone_custom_3_value}</td>
                                        <td>{this.state.phone_custom_3_timestamp}</td>
                                    </tr>
                                    <tr>
                                        <td>Color ink level (%)</td>
                                        <td>{this.state.phone_custom_4_value}</td>
                                        <td>{this.state.phone_custom_4_timestamp}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default System;