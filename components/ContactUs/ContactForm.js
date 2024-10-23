"use client";
import React, { useState, useContext } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="mx-auto w-11/12">
      <div className="rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-2xl font-semibold">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="mb-1 block text-sm font-medium text-black"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="focus:ring-custom-red w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="mb-1 block text-sm font-medium text-black"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="focus:ring-custom-red w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-black"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="focus:ring-custom-red w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="mb-1 block text-sm font-medium text-black"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="focus:ring-custom-red w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="mb-1 block text-sm font-medium text-black"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="focus:ring-custom-red h-32 w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-custom-red focus:ring-custom-red rounded-md px-6 py-3 text-white transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
