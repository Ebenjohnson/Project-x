import React from 'react'
import {
    RangeDatePicker
} from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";


class  Invoice extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }


    handleChange = event => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }


    render(){
        return (
            <div className="invoice">
                <h1 className="dash__title">Invoice</h1>
                <div className="box-content">
                    <form onSubmit={this.handleSubmit}>

                        <div className="step__head__inv"></div>
                        <h3></h3>
                        <div className="form-group" style={{padding : "20px"}}>
                            <RangeDatePicker
                                startDatePlaceholder="From"
                                endDatePlaceholder="To"
                                highlightToday
                            />
                        </div>


                        <p className="text-center">
                            <button
                                className="fabl primary"
                                type="button"
                                >
                                <span>Proceed</span>
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}

export default Invoice