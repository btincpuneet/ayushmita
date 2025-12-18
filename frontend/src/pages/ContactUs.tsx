import React from "react";
import TreatmentHeader from "../components/Treatment/TreatmentHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const ContactUs = () => {
    return (
        <>
            <Header />
            <TreatmentHeader
                title="Contact Us"
                breadcrumbs={[
                    { label: "Home", link: "/" },
                    { label: "Contact Us" },
                ]}
            />

            <section className="py-10 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="bg-gray-100 rounded-2xl shadow-md p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <div className="bg-white rounded-xl p-5 mb-6 text-center">
                                <h3 className="font-semibold text-yellow-600">
                                    Book an Appointment for <br /> Your Treatment
                                </h3>
                                <p className="text-sm mt-2 text-gray-600">
                                    appointment@abcdefg.com
                                </p>
                            </div>

                            <h3 className="font-bold text-lg mb-2">Let's talk with us</h3>
                            <p className="text-md text-gray-600 mb-4">
                                Questions, comments, or suggestions? Simply fill in the form and
                                we’ll be in touch shortly.
                            </p>

                            <ul className="space-y-4 text-md text-gray-700">
                                <li className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-yellow-500 mt-1" />
                                    <span>
                                        Sahibabad, Ghaziabad, Uttar Pradesh <br />
                                        <span className="text-sm text-gray-600">Pin - 201005</span>
                                    </span>
                                </li>

                                <li className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-yellow-500" />
                                    <span>+1 234 678 9108 99</span>
                                </li>

                                <li className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-yellow-500" />
                                    <span>Contact@abcdefg.com</span>
                                </li>
                            </ul>

                        </div>

                        {/* RIGHT FORM */}
                        <div className="bg-white  rounded-xl p-6 shadow-sm">
                            <h3 className="font-semibold mb-4">
                                Have questions? Contact us
                            </h3>

                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="input"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        className="input"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="email"
                                        placeholder="Email ID"
                                        className="input"
                                    />
                                    <select className="input">
                                        <option>Select Country</option>
                                        <option>India</option>
                                        <option>USA</option>
                                    </select>
                                </div>

                                <input
                                    type="text"
                                    placeholder="Which Treatment Are You Looking For?"
                                    className="input"
                                />

                                <textarea
                                    rows={4}
                                    placeholder="Describe your treatment requirements"
                                    className="input resize-none"
                                />

                                <button
                                    type="submit"
                                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-md font-medium transition"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>


            <section className="h-[350px] w-full">
                <iframe
                    title="Google Map"
                    src="https://www.google.com/maps?q=Ghaziabad&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                />
            </section>
            <Footer />
        </>
    );
};

export default ContactUs;
