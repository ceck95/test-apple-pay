import React from 'react';
// import CollectJSSection from "./CollectJSSection";
import {Link} from "react-router-dom";

class InlineCartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      amount: '',
      isSubmitting: false,
      alertMessage: '',
    };
    this.setState = this.setState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.finishSubmit = this.finishSubmit.bind(this);
    this.payment = this.payment.bind(this);
  }

  componentDidMount() {
    window.CollectJS.configure({
      variant: 'inline',
      country:"US",
      price:"1.00",
      currency:"USD",
      callback: (data) => {
        console.log(data);
        console.log(JSON.stringify(data));
        this.payment(data.token)
      },
    });
  }

  finishSubmit(response) {
    const { isSubmitting, alertMessage, ...formData } = { ...this.state };
    formData.token = response.token;
    console.log(formData);
    this.setState({ isSubmitting: false, alertMessage: 'The form was submitted. Check the console to see the output data.' });
  }

  handleSubmit(event) {
    // event.preventDefault();
    // this.setState({ isSubmitting: true });
    // window.CollectJS.startPaymentRequest();
  }

  payment(token){
    this.setState({ isSubmitting: true });
    fetch('http://localhost:56103/test/apple-pay',{
      body: {token},
      method: "POST"
    }).then((data) => {
      return data.json()
    }).then(res => {
      console.log("🚀 ~ InlineCartPage ~ res", res)
      this.setState({ isSubmitting: false, alertMessage: 'The form was submitted. Check the console to see the output data.' });
    }).catch(error => {
      console.log("🚀 ~ InlineCartPage ~ error", error)
      this.setState({ isSubmitting: false, alertMessage: 'Error payment' });
    })
  }

  render() {
    return (
      <div className="App">
        <div>
          <h1>Cart Page</h1>
          <Link to="/">Home Page</Link>
          <br />
          <Link to="/lightbox">Lightbox cart page</Link>
        </div>
        <br />
        { this.state.alertMessage && (
          <div className="alert">
            {this.state.alertMessage}
          </div>
        )}
        <p>Button apple pay</p>
        <div id="applepaybutton"></div>
        <div id="googlepaybutton"></div>
        {/* <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={event => this.setState({ firstName: event.target.value })}
              value={this.state.firstName}
            />
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={event => this.setState({ lastName: event.target.value })}
              value={this.state.lastName}
            />
          </div>
          <div>
            <input
              type="text"
              name="amount"
              placeholder="Amount"
              onChange={event => this.setState({ amount: event.target.value })}
              value={this.state.amount}
            />
          </div>
          <CollectJSSection />
          <button
            type="submit"
            disabled={this.state.isSubmitting}
          >
            Submit
          </button>
        </form> */}
        
      </div>
    );
  }
}

export default InlineCartPage;
