import React, { ChangeEvent, useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";




interface formitems{
    name:string;
    email:string;
    message:string;
}
function Contact() {
    const [inputform, setInform]=useState<formitems>({
    name:'',
    email:'',
    message:''
    })
    const [showform, setForm]=useState<formitems>()
   const updateForm = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
       const {name, value}=e.target
       setInform((prev)=>({...prev, [name]:value}))
    }
    const updateSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if (inputform) {
            setForm(inputform)
            alert('successful')
            setInform({
                name:'',
                email:'',
               message:''
            })
        }
    }
  return (
    <div className="w-full bg-gray-50 py-14 px-6">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-2">Contact Us</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We’d love to hear from you! Whether you have questions, feedback, or special requests,
          our team is always ready to help.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="bg-white shadow-md rounded-2xl p-8 flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Get in Touch</h2>

          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-red-600 text-xl" />
            <p className="text-gray-700 text-lg">+234 810 123 4567</p>
          </div>

          <div className="flex items-center gap-4">
            <FaEnvelope className="text-red-600 text-xl" />
            <p className="text-gray-700 text-lg">support@foodiezone.com</p>
          </div>

          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-red-600 text-xl mt-1" />
            <p className="text-gray-700 text-lg">
              23 Flavor Street, Lagos, Nigeria.
            </p>
          </div>

          <p className="text-gray-500 mt-6">
            Working Hours: <br />
            <span className="font-semibold text-gray-700">Mon – Sun: 9:00 AM – 10:00 PM</span>
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white shadow-md rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Send Us a Message</h2>

          <form onSubmit={updateSubmit} className="flex flex-col gap-4">
            <input
              name="name"
              value={inputform.name}
              onChange={updateForm}
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-red-500"
              required
            />
            <input
              name="email"
              value={inputform.email}
              onChange={updateForm}
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-red-500"
              required
            />
            <textarea
             name="message"
             value={inputform.message}
              onChange={updateForm}
              placeholder="Your Message"
              rows={5}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-red-500"
              required
            ></textarea>

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Optional Map Section */}
      <div className="w-full mt-16">
        <iframe
          title="FoodieZone Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.407839982293!2d3.3792!3d6.5244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b1d9e4b2b3f%3A0x2cf4d4ad4b8dfcae!2sLagos!5e0!3m2!1sen!2sng!4v1615185645628!5m2!1sen!2sng"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          className="rounded-2xl shadow-md"
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
