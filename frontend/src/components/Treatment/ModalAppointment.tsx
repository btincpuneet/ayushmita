import React from "react";

interface ModalAppointmentProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalAppointment: React.FC<ModalAppointmentProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 ">
            <div className="bg-white w-full max-w-lg  shadow-xl relative  rounded-2xl ">

                <button
                    className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl "
                    onClick={onClose}
                >
                    ×
                </button>


                <h2 className="text-xl font-semibold mb-4 text-left bg-[#F6F7F9] px-4 py-4">
                    Book An Appointment For Treatment
                </h2>


                <form className="space-y-4 p-6">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col" >
                            <label>Full Name</label>
                            <input
                                type="text"
                                className="w-full border border-gray-400 rounded-md px-3 py-2 text-sm"
                            />
                        </div>
                        <div className="flex flex-col" >
                            <label>Phone Number</label>
                            <input
                                type="number"
                                className="w-full border border-gray-400 rounded-md px-3 py-2 text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label>Describe your treatment requirements</label>
                        <textarea
                            className="w-full border border-gray-400 rounded-md px-3 py-2 text-sm h-24"
                        ></textarea>
                    </div>



                    <label className="flex items-start gap-2 text-sm">
                        <input type="checkbox" className="mt-1" />
                        <span>
                            I agree to receive updates/ notifications from Ayushmta via whatsapp
                        </span>
                    </label>


                    <button
                        type="submit"
                        className="w-1/2 bg-[#ffb300] hover:bg-[#ffaa00] text-black py-2 rounded-md font-medium"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ModalAppointment;
