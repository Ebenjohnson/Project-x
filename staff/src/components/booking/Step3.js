import React from "react";
import 'font-awesome/css/font-awesome.min.css';

class Step3 extends React.Component {
    render() {
    if (this.props.currentStep !== 3) {
        return null
    }
    return(
        <div className="form-group">
            <h5>Thank you for completing your booking</h5>
            <br/>
            <br/>
            <p className="success__icon"><i className="fa fa-check"></i></p>
            <br/>
            <h5 className="text-center">
                Your Completion has been successful <br/>
                A confirmation email <br/>
                Be <br/>
                Sent shortly
            </h5>
        </div>

    )}
}

export default Step3