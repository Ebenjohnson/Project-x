import React from "react";


class Step2 extends React.Component {
    render() {
    if (this.props.currentStep !== 2) {
        return null
    }
    return(
        <div style={{marginBottom : "40px"}}>
            <div className="step__head"></div>
            <h4 style={{marginLeft : "10px",marginBottom : "20px", marginTop : "20px"}}>Services</h4>
            <div className="step__list">
                <div className="row">
                    <div className="col-lg-9">
                        <h6>Stephen Forson</h6>
                        <p>Adult Haircut</p>
                    </div>
                    <div className="col-lg-3 step__list__service">
                        <div className="step__list__price">
                            £25.0
                        </div>
                        <div className="step__list__add"  >
                            <i className="fa fa-plus"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )}
}

export default Step2