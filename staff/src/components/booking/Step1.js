import React from "react";

class Step1 extends React.Component {
    render() {
    if (this.props.currentStep !== 1) {
        return null
    }
    return(
        <div>
            <h3>Select Time</h3>
            <br/>
            <div className="form-group" style={{padding : "20px"}}>
                <input
                    className="form-control"
                    id="time"
                    name="time"
                    type="time"
                    placeholder=""
                    value={this.props.time}
                    onChange={(event)=>this.props.handleChange(event, "time")}
                />
            </div>
        </div>

    )}
}

export default Step1