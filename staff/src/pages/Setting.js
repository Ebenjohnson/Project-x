import React, {Component} from 'react'
import StarRatingComponent from 'react-star-rating-component';
import  user from "../assets/images/creative.jpg"
class Setting  extends Component {

    constructor(props) {
        super(props)
        this.state = {
            about: 1,
            payment: 1,
            setting: 1,
            rating: 1,
        }

    }


    showAbout = () =>{
        if (this.state.about === 1){
            this.setState({
                about : 2
            })
        }
        else{
            this.setState({
                about : 1
            })
        }
        console.log(this.state.about)
    }
    showPayment = () =>{
        if (this.state.payment === 1){
            this.setState({
                payment : 2
            })
        }
        else{
            this.setState({
                payment : 1
            })
        }
        console.log(this.state.about)
    }
    showSetting = () =>{
        if (this.state.setting === 1){
            this.setState({
                setting : 2
            })
        }
        else{
            this.setState({
                setting : 1
            })
        }
        console.log(this.state.about)
    }
    showRating = () =>{
        if (this.state.rating === 1){
            this.setState({
                rating : 2
            })
        }
        else{
            this.setState({
                rating : 1
            })
        }
        console.log(this.state.about)
    }



    render(){
  return (
      <div>
          <h1 className="dash__title">Setting</h1>
          {this.state.about == 1 && this.state.payment == 1&& this.state.setting == 1&& this.state.rating == 1 &&
          <div className="box-content" style={{padding: "20px"}}>
              <button className="setting__links" onClick={this.showAbout}>About</button>
              <button className="setting__links" onClick={this.showPayment}>Payment Method</button>
              <button className="setting__links" onClick={this.showSetting}>Availability setting</button>
              <button className="setting__links" onClick={this.showRating}>Ratings</button>
          </div>
          }

          {this.state.about == 2 && <div className="box-content __big__box" style={{padding : "20px"}}>
             <div className="box__header">
                 <a  className="__closed" onClick={this.showAbout}>
                     <i className="fa fa-close"></i>
                 </a>
                 <div className="__title">About Barber</div>
             </div>
              <div className="box__body">
                  <div className="row">
                      <div className="col-lg-4 about__ava__box">
                          <img src={user} alt="" className="avatar__user" />
                          <p><strong>{this.props.username}</strong></p>
                          <p ><StarRatingComponent
                              name="about_rating"
                              value="4"
                              editing={false}
                          /></p>
                      </div>
                      <div className="col-lg-8">
                          <div className="row">
                              <div className="col-lg-6">
                                  <label htmlFor="">Name</label>
                                  <input type="text" className="custom__input" value={this.props.username}/>
                              </div>
                              <div className="col-lg-6">
                                  <label htmlFor="">Email</label>
                                  <input type="text" className="custom__input" value={this.props.email} />
                              </div>
                              <div className="col-lg-6">
                                  <label htmlFor="">Password</label>
                                  <input type="password" className="custom__input" value="123456"/>
                              </div>
                              <div className="col-lg-6">
                                  <label htmlFor="">Organisation</label>
                                  <input type="text" className="custom__input"  />
                              </div>
                              <div className="col-lg-12">
                                  <label htmlFor="">Mobile Number</label>
                                  <input type="text" className="custom__input"/>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>}

          {this.state.setting == 2 && <div className="box-content __big__box" style={{padding : "20px"}}>
              <div className="box__header">
                  <a  className="__closed" onClick={this.showSetting}>
                      <i className="fa fa-close"></i>
                  </a>
                  <div className="__title">Availability Setting</div>
              </div>
              <div className="box__body">
                    <form action="">
                        <div className="row">
                        <div className="col-lg-6">
                            <label htmlFor="from">From</label>
                            <input
                                className="form-control"
                                id="from"
                                name="from"
                                type="time"
                                placeholder=""
                            />
                        </div>
                        <div className="col-lg-6">
                            <label htmlFor="to">To</label>
                            <input
                                className="form-control"
                                id="to"
                                name="to"
                                type="time"
                                placeholder=""
                            /></div>
                        <div className="offset-lg-4 col-lg-4 mt-5">
                            <button type="sbmit" className="fabl fabl-block primary">Proceed</button>
                        </div>
                        </div>
                    </form>
              </div>
          </div>}

          {this.state.payment == 2 && <div className="box-content __big__box" style={{padding : "20px"}}>
              <div className="box__header">
                  <a  className="__closed" onClick={this.showPayment}>
                      <i className="fa fa-close"></i>
                  </a>
                  <div className="__title">Payment method</div>
              </div>
              <div className="box__body">
                  <div className="row">
                      <div className="col-lg-3">
                          <h3>Your Card Details</h3>
                          <br/>
                          <div className="__pay__card">
                              <i className="fa fa-cc-visa"></i>
                          </div>
                          <div className="__pay__card">
                              <i className="fa fa-cc-mastercard"></i>
                          </div>
                      </div>
                      <div className="col-lg-9">
                          <form action="">
                              <div className="row">
                                  <div className="col-lg-12">
                                      <input type="text" className="custom__input" placeholder="Name on Card" />
                                  </div>
                                  <div className="col-lg-12">
                                      <input type="text" className="custom__input" placeholder="Card Number"/>
                                  </div>
                                  <div className="col-lg-6">
                                      <input type="month" className="custom__input" placeholder="" />
                                  </div>
                                  <div className="col-lg-6">
                                      <input type="number" className="custom__input" placeholder="123" />
                                  </div>

                                  <div className="col-lg-12">
                                      <br/>
                                      <label className="f-radio">Select to save card
                                          <input type="checkbox" name="squareradio" />
                                              <span className="square"></span>
                                      </label>
                                  </div>

                              </div>

                            <div className="offset-lg-4 col-lg-4">
                                <button className="fabl fabl-block primary">Proceed</button>
                            </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>}

          {this.state.rating == 2 && <div className="box-content __big__box" style={{padding : "20px"}}>
              <div className="box__header">
                  <a  className="__closed" onClick={this.showRating}>
                      <i className="fa fa-close"></i>
                  </a>
                  <div className="__title">rating</div>
              </div>
              <div className="box__body">
                  <div className="row">
                      <div className="col-lg-4 about__ava__box">
                          <img src={user} alt="" className="avatar__user" />
                          <p><strong>{this.props.username}</strong></p>
                          <p ><StarRatingComponent
                              name="about_rating"
                              value="4"
                              editing={false}
                          /></p>
                      </div>
                      <div className="col-lg-8">
                          <h3>Review</h3>
                          <div className="row">
                              <div className="col-lg-12 __trending">
                                    <div className="row">
                                        <div className="col-lg-7">
                                            Person A
                                        </div>
                                        <div className="col-lg-5">
                                            <p className="text-right"><StarRatingComponent
                                                name="about_rating"
                                                value="5"
                                                editing={false}
                                            /></p>
                                        </div>
                                    </div>
                                        <small>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</small>
                                  <hr/>
                              </div>

                              <div className="col-lg-12 __trending">
                                    <div className="row">
                                        <div className="col-lg-7">
                                            Person B
                                        </div>
                                        <div className="col-lg-5">
                                            <p  className="text-right"><StarRatingComponent
                                                name="about_rating"
                                                value="2"
                                                editing={false}
                                            /></p>
                                        </div>
                                    </div>
                                        <small>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</small>
                                  <hr/>
                              </div>

                              <div className="col-lg-12 __trending">
                                    <div className="row">
                                        <div className="col-lg-7">
                                            Person C
                                        </div>
                                        <div className="col-lg-5">
                                            <p  className="text-right"><StarRatingComponent
                                                name="about_rating"
                                                value="3"
                                                editing={false}
                                            /></p>
                                        </div>
                                    </div>
                                        <small>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</small>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>}
      </div>
  )}
}

export default Setting