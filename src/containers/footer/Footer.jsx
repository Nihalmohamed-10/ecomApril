import React from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GitHubIcon from "@mui/icons-material/GitHub";

function Footer() {
  return (
    <div className="mt-20 max-w-6xl mx-auto pt-10 pb-10 border-t ">
        <div className="text-center">
          <a href="">Terms .</a>
          <a href="">Privacy Policy</a>
        </div>
      <div className="mt-10 flex flex-col gap-5 justify-between pb-10 border-b pl-5 pr-5 text-center sm:flex-row sm:flex-wrap sm:text-start ">
        
        <div className="flex flex-col gap-2">
          <p className="text-[#926ffa] font-bold">Products</p>
          <a href="">web Studio</a>
          <a href="">DynamicBox flex</a>
          <a href="">Programming forms</a>
          <a href="">Integrations</a>
          <a href="">Command Lines</a>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#926ffa] font-bold">Resources</p>
          <a href="">Documentation</a>
          <a href="">Tutorials& guides</a>
          <a href="">Blog</a>
          <a href="">Support Center</a>
          <a href="">Partners</a>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#926ffa] font-bold">Company</p>
          <a href="">Home</a>
          <a href="">About Us</a>
          <a href="">Comapny values</a>
          <a href="">Pricing</a>
          <a href="">Privacy Policy</a>
        </div>
        <div className="flex flex-col gap-2 sm:w-[300px]">
          <p className="text-[#926ffa] font-bold">Subscribe</p>
          <p>Get the latest news and articles to your inbox every month</p>
          <div className="flex justify-evenly items-center gap-5">
            <input type="text" placeholder="your email id" className="border-r  p-4"/>
            <div>
                <ArrowForwardIcon/>
            </div>
        </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col-reverse pl-10 md:flex-row md:justify-between md:pl-5">
        <p>made with _ siza</p>
        <div>
          <GitHubIcon/>
        </div>
        
      </div>
    </div>
  );
}

export default Footer;
