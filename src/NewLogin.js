import React, { Component } from "react";
import { Redirect } from "react-router";
// const sign_in_btn = document.querySelector("#sign-in-btn");
// const sign_up_btn = document.querySelector("#sign-up-btn");
// const container = document.querySelector(".container");
const initials = {
  admin: false,
  isLoggedIn: false,
  maintenence: false,
};

class NewLogin extends Component {
  constructor(props) {
    super(props);
    this.state=initials
  }

  handleInputChange = (f) => {
    f.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username === "Anu" && password === "radha1982") {
      localStorage.setItem("user", username);
      this.setState({ isLoggedIn: true });
    } else if (username === "Aarthi" && password === "Aarthi") {
      localStorage.setItem("user", username);
      this.setState({ isLoggedIn: true });
    } else {
      alert("Login Denied");
    }
  };

  render() {
    if (this.state.isLoggedIn && localStorage.getItem("user") === "Anu") {
      return <Redirect to="/Homepage" />;
    }

    if (this.state.isLoggedIn && localStorage.getItem("user") === "Aarthi") {
      return <Redirect to="/Homepage" />;
    }

    return (
      <div class="container">
        <div class="forms-container">
          <div class="signin-signup">
            <form class="sign-in-form">
              <h2 class="title">Sign in</h2>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="Username" id="username" />
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Password" id="password" />
              </div>
              <input
                type="submit"
                value="Login"
                class="btn solid"
                onClick={this.handleInputChange}
              />
              {/*<p class="social-text">Or Sign in with social platforms</p>
                  <div class="social-media">
                    <a href="#" class="social-icon">
                      <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" class="social-icon">
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" class="social-icon">
                      <i class="fab fa-google"></i>
                    </a>
                    <a href="#" class="social-icon">
                      <i class="fab fa-linkedin-in"></i>
                    </a>
                  </div> */}
            </form>
          </div>
        </div>

        <div class="panels-container">
          <div class="panel left-panel">
            <div class="content">
              <h3>Unique Trendz and Trendz Zone </h3>
              <p>
                This is the Sales and Stock maintenence site of unique trendz
                and trendz
              </p>
              {/* <button class="btn transparent" id="sign-up-btn" >
                    Sign up
                  </button> */}
            </div>
            <img src="img/log.svg" class="image" alt="" />
          </div>
          {/* <div class="panel right-panel">
                <div class="content">
                  <h3>One of us ?</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                    laboriosam ad deleniti.
                  </p>
                  <button class="btn transparent" id="sign-in-btn">
                    Sign in
                  </button>
                </div>
                <img src="img/register.svg" class="image" alt="" />
              </div> */}
        </div>
        <div>
          {/* { sign_up_btn.addEventListener("click", () => {
        container.classList.add("sign-up-mode");
      }),
      
      sign_in_btn.addEventListener("click", () => {
        container.classList.remove("sign-up-mode");
      })} */}
        </div>
      </div>
    );
  }
}

export default NewLogin;
