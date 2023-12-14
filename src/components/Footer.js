import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./footer.css";
import { toast } from "react-hot-toast";

const Footer = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

  const nameInput = form.current.querySelector('input[name="name"]');
  const emailInput = form.current.querySelector('input[name="email"]');
  const messageTextarea = form.current.querySelector('textarea[name="message"]');
  if (!nameInput.value || !emailInput.value || !messageTextarea.value) {
    // Display an error message or take appropriate action for invalid fields
    toast.error("Please fill out all required fields.");
    return;
  }

  const emailValue = emailInput.value;

  // Perform email validation
  if (!isValidEmail(emailValue)) {
    // Display an error message in a toast or any other way you prefer
    toast.error("Invalid email address.");
    return;
  }

    emailjs
      .sendForm(
        "service_dqbs0nj",
        "template_jlqor1m",
        form.current,
        "D3SbL3HnrdZihnfpy",
      )
      .then(
        (result) => {
          toast.success("Email sent successfully !");
          form.current.reset();
        },
        (error) => {},
      );
  };
  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
  return (
    <footer class='footer-distributed'>
      <div class='footer-left'>
        <h3>𝓦𝓸𝓻𝓵𝓭 𝓑𝓻𝓪𝓷𝓭𝓼</h3>

        {/* <p class='footer-links'>
          <a href='#'>Home</a>·<a href='#'>New Arrivals</a>·
          <a href='#'>Pricing</a>·<a href='#'>About</a>·<a href='#'>Faq</a>·
          <a href='#'>Contact</a>
        </p> */}

        <p class='footer-company-name'>𝓦𝓸𝓻𝓵𝓭 𝓑𝓻𝓪𝓷𝓭𝓼 © 2023</p>
         <h4 style={{color: 'white', paddingTop: '20px'}}>Follow us on social</h4>

        <div class='footer-icons'>
          <a href='https://www.facebook.com'>
            <i className='fab fa-facebook fa-xl'></i>
          </a>
          <a href='https://www.twitter.com'>
            <i className='fab fa-twitter fa-xl'></i>
          </a>
          <a href='https://www.pinterest.com'>
            <i className='fab fa-pinterest fa-xl'></i>
          </a>
          <a href='https://www.instagram.com'>
            <i className='fab fa-instagram fa-xl'></i>
          </a>
        </div>
      </div>

      <div class='footer-right'>
        <p>Customer Care</p>

        <form ref={form}>
          <input type='text' name='name' placeholder='Name' />
          <input type='email' name='email' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" placeholder='Email' />
          <textarea name='message' placeholder='Message'></textarea>
          <button onClick={sendEmail}>Send</button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
//it is added as default means no need to add curly braces {} while importing it in App.js
