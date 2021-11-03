import React, { useState } from "react";
import { StyledContactUsContainer } from "./ContactUs.styled";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleInputChange = (event) => {
        console.log("Input changing...");
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log("FORM Submitted");

        fetch("http://localhost:5001/contact-us/", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((json) => console.log(json))
            .catch((err) => console.log("Request failed", err));
        // }).then((res) => res.json());

        // postTask(payload) {
        // return fetch(baseURL, {
        //     method: 'POST',
        //     body: JSON.stringify(payload),
        //     headers: { 'Content-Type': 'application/json' }
        // })
        //     .then(res => res.json())
        // },
    };

    return (
        <div>
            <StyledContactUsContainer>
                <h1>Contact</h1>
                <p>I am looking forward to your message.</p>
                <form onSubmit={handleFormSubmit}>
                    <label htmlFor="name">NAME</label>
                    <input
                        name="name"
                        type="text"
                        placeholder="Your name"
                        onChange={handleInputChange}
                    />

                    <label htmlFor="email">EMAIL</label>
                    <input
                        name="email"
                        type="text"
                        placeholder="Your email"
                        onChange={handleInputChange}
                    />

                    <label htmlFor="message">MESSAGE</label>
                    <textarea
                        name="message"
                        rows="2"
                        cols="50"
                        placeholder="Your message"
                        onChange={handleInputChange}
                    ></textarea>
                    <input type="submit" />
                </form>
            </StyledContactUsContainer>
        </div>
    );
};

export default ContactUs;
