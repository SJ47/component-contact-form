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

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            let response = await fetch("http://localhost:5001/contact-us/", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.statusText !== "OK") {
                throw new Error(
                    `${data.errors[0].msg} in ${data.errors[0].param}`
                );
            } else {
                alert(data.message);
                setFormData({
                    name: "",
                    email: "",
                    message: "",
                });
            }
        } catch (error) {
            alert(error);
        }
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
                        value={formData.name}
                        type="text"
                        placeholder="Your name"
                        onChange={handleInputChange}
                    />

                    <label htmlFor="email">EMAIL</label>
                    <input
                        name="email"
                        value={formData.email}
                        type="email"
                        placeholder="Your email"
                        onChange={handleInputChange}
                    />

                    <label htmlFor="message">MESSAGE</label>
                    <textarea
                        name="message"
                        value={formData.message}
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
