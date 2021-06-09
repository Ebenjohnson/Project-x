import React from 'react'
import Step1 from "../components/booking/Step1"
import Step2 from "../components/booking/Step2";
import Step3 from "../components/booking/Step3";
import toast from 'react-hot-toast';

class Booking extends React.Component {
    constructor(props) {
        super(props)
        // Set the initial input values
        this.state = {
            currentStep: 1,
            time : "",
            service : ""
        }
        this._next = this._next.bind(this)
        this._prev = this._prev.bind(this)
    }


    _next() {
        let currentStep = this.state.currentStep
        console.log(this.state.time)
        if (this.state.time == "" && currentStep === 1){
            toast.error('Select Time first')
        } else {
            // If the current step is 1 or 2, then add one on "next" button click
            currentStep = currentStep >= 2 ? 3 : currentStep + 1
            this.setState({
                currentStep: currentStep
            })
        }
    }

    _prev() {
        let currentStep = this.state.currentStep
        currentStep = currentStep <= 1? 1: currentStep - 1
        this.setState({time : ""})
        this.setState({
            currentStep: currentStep
        })
    }

     previousButton(){
        let currentStep = this.state.currentStep;
        // If the current step is not 1, then render the "previous" button
        if(currentStep ===2){
            return (
                <button
                    className="fabl primary"
                    type="button"
                    onClick={this._prev}>
                    Cancel
                </button>
            )
        }
        return null;
    }

    handleChange = event => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

     nextButton(){
        let currentStep = this.state.currentStep;
        if (this.state.time == "" && currentStep === 1){
            return
        } else{
            if(currentStep <3){
                return (
                    <button
                        className="fabl primary"
                        type="button"
                        onClick={this._next}>
                        <span>{currentStep > 1 ? "Complete" :  "Continue" }</span>
                    </button>
                )
            }
            return null;
        }

    }

    render(){
        return (
            <div className="booking">
                <h1 className="dash__title">Booking</h1>
                <div className="box-content">
                    <form onSubmit={this.handleSubmit}>
                        <Step1
                            currentStep={this.state.currentStep}
                            handleChange={this.handleChange}
                            time={this.state.time}
                        />
                        <Step2
                            currentStep={this.state.currentStep}
                            handleChange={this.handleChange}
                            service={this.state.service}
                        />
                        <Step3
                            currentStep={this.state.currentStep}
                        />


                        <p className="text-center">{this.previousButton()} {this.nextButton()}</p>
                    </form>
                </div>
            </div>
        )
    }
}

export default Booking