import Link from "next/link";
import React from "react";

const ContactUs = () => {
  return (
    <div className="grid place-items-center h-screen w-full">
      <div className="text-center bg-black/10 w-96 p-10 mx-auto">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <Link className="text-blue-600 font-medium mt-4 block" href="/">
          back to home
        </Link>
      </div>
    </div>
  );
};

export default ContactUs;
