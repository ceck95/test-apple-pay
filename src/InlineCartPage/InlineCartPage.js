import React from 'react';
// import CollectJSSection from "./CollectJSSection";
import {Link} from "react-router-dom";
import queryString from "querystring";

class InlineCartPage extends React.Component {
  constructor(props) {
    super(props);
    const {local} = queryString.parse(this.props.location.search);
    this.state = {
      firstName: '',
      lastName: '',
      amount: '',
      isSubmitting: false,
      alertMessage: '',
      // isFakePayment: this.props.location.search !== "",
      // isFakePayment: true,
      url: local ? "http://localhost:56103" : "https://api-staging.kiolyn.com"
    };
    this.setState = this.setState.bind(this);
    this.finishSubmit = this.finishSubmit.bind(this);
    this.payment = this.payment.bind(this);
    this.paymentFake = this.paymentFake.bind(this);
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
        this.payment(data)
      },
    });
  }

  finishSubmit(response) {
    const { isSubmitting, alertMessage, ...formData } = { ...this.state };
    formData.token = response.token;
    console.log(formData);
    this.setState({ isSubmitting: false, alertMessage: 'The form was submitted. Check the console to see the output data.' });
  }

  payment(data){
    this.setState({ isSubmitting: true });
    const {orderId,storeId} = this.props.match.params;
    fetch(`${this.state.url}/app/ordering/${storeId}/apple-wallet/${orderId}`,{
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
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

  paymentFake(){
    const {orderId,storeId} = this.props.match.params;
    fetch(`${this.state.url}/app/ordering/${storeId}/apple-wallet/${orderId}`,{
      body: JSON.stringify({
        token: "test",
        number: "1234"
      }),
      headers: { 'Content-Type': 'application/json' },
      method: "POST"
    }).then((data) => {
      return data.json()
    }).then(res => {
      this.setState({ isSubmitting: false, alertMessage: 'The form was submitted. Check the console to see the output data.' });
    }).catch(error => {
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
        <button onClick={()=>this.paymentFake()}>Fake apple pay</button>
      </div>
    );
  }
}

export default InlineCartPage;
