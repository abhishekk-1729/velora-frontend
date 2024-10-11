import React, { useState } from "react";
import "./Hero.css";
import greater_than from "./greater_than.png";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { Dropdown } from "primereact/dropdown";
const Hero = () => {
  const [textState, setTextState] = useState(0);
  const [responseMessage, setResponseMessage] = useState(""); // State to store the response message
  const [isEmailMode, setIsEmailMode] = useState(true); // State to toggle between Email and Phone modes
  const [email, setEmail] = useState(""); // State for Email input
  const [phone, setPhone] = useState(""); // State for Phone input
  const [errorMessage, setErrorMessage] = useState(""); // State to store validation errors

  const [selectedItem, setSelectedItem] = useState({
    code: "+91",
    name: "India",
    flagUrl:"/new.png" 
    
  });
  // List of international dialing codes
  const reversedCodes = {
    Afghanistan: "+93",
    Albania: "+355",
    Algeria: "+213",
    "American Samoa": "+1-684",
    Andorra: "+376",
    Angola: "+244",
    Anguilla: "+1-264",
    Antarctica: "+672",
    "Antigua and Barbuda": "+1-268",
    Argentina: "+54",
    Armenia: "+374",
    Aruba: "+297",
    Australia: "+61",
    Austria: "+43",
    Azerbaijan: "+994",
    Bahamas: "+1-242",
    Bahrain: "+973",
    Bangladesh: "+880",
    Barbados: "+1-246",
    Belarus: "+375",
    Belgium: "+32",
    Belize: "+501",
    Benin: "+229",
    Bermuda: "+1-441",
    Bhutan: "+975",
    Bolivia: "+591",
    "Bosnia and Herzegovina": "+387",
    Botswana: "+267",
    Brazil: "+55",
    "British Indian Ocean Territory": "+246",
    Brunei: "+673",
    Bulgaria: "+359",
    "Burkina Faso": "+226",
    Burundi: "+257",
    Cambodia: "+855",
    Cameroon: "+237",
    Canada: "+1",
    "Cape Verde": "+238",
    "Cayman Islands": "+1-345",
    "Central African Republic": "+236",
    Chad: "+235",
    Chile: "+56",
    China: "+86",
    Cuba: "+53",
    Colombia: "+57",
    Comoros: "+269",
    "Congo (Democratic Republic)": "+243",
    "Congo (Republic)": "+242",
    "Cook Islands": "+682",
    "Costa Rica": "+506",
    "Côte d'Ivoire": "+225",
    Croatia: "+385",
    Cyprus: "+357",
    "Czech Republic": "+420",
    Denmark: "+45",
    Djibouti: "+253",
    Dominica: "+1-767",
    "Dominican Republic": "+1-809",
    "East Timor": "+670",
    Ecuador: "+593",
    Egypt: "+20",
    "El Salvador": "+503",
    "Equatorial Guinea": "+240",
    Eritrea: "+291",
    Estonia: "+372",
    Ethiopia: "+251",
    "Falkland Islands": "+500",
    "Faroe Islands": "+298",
    Fiji: "+679",
    Finland: "+358",
    France: "+33",
    "French Guiana": "+594",
    "French Polynesia": "+689",
    Gabon: "+262",
    Gambia: "+220",
    Georgia: "+995",
    Germany: "+49",
    Ghana: "+233",
    Gibraltar: "+350",
    "United Kingdom": "+44",
    Greece: "+30",
    Greenland: "+299",
    Grenada: "+1-473",
    Guadeloupe: "+590",
    Guam: "+1-671",
    Guatemala: "+502",
    Guinea: "+224",
    "Guinea-Bissau": "+245",
    Guyana: "+592",
    Haiti: "+509",
    "Heard Island and McDonald Islands": "+672",
    Italy: "+39",
    Honduras: "+504",
    "Hong Kong": "+852",
    Hungary: "+36",
    Iceland: "+354",
    India: "+91",
    Indonesia: "+62",
    Iran: "+98",
    Iraq: "+964",
    Ireland: "+353",
    Israel: "+972",
    Jamaica: "+1-876",
    Japan: "+81",
    Jordan: "+962",
    Kazakhstan: "+7",
    Kenya: "+254",
    Kiribati: "+686",
    "North Korea": "+850",
    "South Korea": "+82",
    Kuwait: "+965",
    Kyrgyzstan: "+996",
    Laos: "+856",
    Latvia: "+371",
    Lebanon: "+961",
    Lesotho: "+266",
    Liberia: "+231",
    Libya: "+218",
    Liechtenstein: "+423",
    Lithuania: "+370",
    Luxembourg: "+352",
    Macau: "+853",
    Macedonia: "+389",
    Madagascar: "+261",
    Malawi: "+265",
    Malaysia: "+60",
    Maldives: "+960",
    Mali: "+223",
    Malta: "+356",
    "Marshall Islands": "+692",
    Martinique: "+596",
    Mauritania: "+222",
    Mauritius: "+230",
    Mayotte: "+269",
    Mexico: "+52",
    Micronesia: "+691",
    Moldova: "+373",
    Monaco: "+377",
    Mongolia: "+976",
    Montserrat: "+1-664",
    Morocco: "+212",
    Mozambique: "+258",
    Myanmar: "+95",
    Namibia: "+264",
    Nauru: "+674",
    Nepal: "+977",
    Netherlands: "+31",
    "Netherlands Antilles": "+599",
    "New Caledonia": "+687",
    "New Zealand": "+64",
    Nicaragua: "+505",
    Niger: "+227",
    Nigeria: "+234",
    Niue: "+683",
    "Norfolk Island": "+672",
    "Northern Mariana Islands": "+1-670",
    Norway: "+47",
    Oman: "+968",
    Pakistan: "+92",
    Palau: "+680",
    Palestine: "+970",
    Panama: "+507",
    "Papua New Guinea": "+675",
    Paraguay: "+595",
    Peru: "+51",
    Philippines: "+63",
    Poland: "+48",
    Portugal: "+351",
    "Puerto Rico": "+1-787",
    Qatar: "+974",
    Réunion: "+262",
    Romania: "+40",
    Russia: "+7",
    Rwanda: "+250",
    "Saint Helena": "+290",
    "Saint Kitts and Nevis": "+1-869",
    "Saint Lucia": "+1-758",
    "Saint Pierre and Miquelon": "+508",
    "Saint Vincent and the Grenadines": "+1-784",
    Samoa: "+685",
    "San Marino": "+378",
    "Sao Tome and Principe": "+239",
    "Saudi Arabia": "+966",
    Serbia: "+381",
    Senegal: "+221",
    Seychelles: "+248",
    "Sierra Leone": "+232",
    Singapore: "+65",
    Slovakia: "+421",
    Slovenia: "+386",
    "Solomon Islands": "+677",
    Somalia: "+252",
    "South Africa": "+27",
    "South Georgia and the South Sandwich Islands": "+500",
    Spain: "+34",
    "Sri Lanka": "+94",
    Sudan: "+249",
    Suriname: "+597",
    "Svalbard and Jan Mayen": "+47",
    Swaziland: "+268",
    Sweden: "+46",
    Switzerland: "+41",
    Syria: "+963",
    Taiwan: "+886",
    Tajikistan: "+992",
    Tanzania: "+255",
    Thailand: "+66",
    Togo: "+228",
    Tokelau: "+690",
    Tonga: "+676",
    "Trinidad and Tobago": "+1-868",
    Tunisia: "+216",
    Turkey: "+90",
    Turkmenistan: "+993",
    "Turks and Caicos Islands": "+1-649",
    Tuvalu: "+688",
    Uganda: "+256",
    Ukraine: "+380",
    "United Arab Emirates": "+971",
    "United Kingdom": "+44",
    "United States": "+1",
    Uruguay: "+598",
    Uzbekistan: "+998",
    Vanuatu: "+678",
    "Vatican City": "+379",
    Venezuela: "+58",
    Vietnam: "+84",
    "British Virgin Islands": "+1-284",
    "United States Virgin Islands": "+1-340",
    "Wallis and Futuna": "+681",
    "Western Sahara": "+212",
    Yemen: "+967",
    Zambia: "+260",
    Zimbabwe: "+263",
  };

  const countryList = [];

  for (const [code, country] of Object.entries(reversedCodes)) {
    countryList.push(`${code} ${country}`);
  }

  // Email and phone validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;

  const handleConnectRequest = async () => {
    // Validate Email or Phone input
    if (isEmailMode) {
      if (!email || !emailRegex.test(email)) {
        setErrorMessage("Please enter a valid email address.");
        return;
      }
    } else {
      if (!phone || !phoneRegex.test(phone)) {
        setErrorMessage("Please enter a valid 10-digit phone number.");
        return;
      }
    }

    // If validation passes, reset error and proceed with request
    setErrorMessage("");
    setTextState(1);

    const apiEndpoint = isEmailMode
      ? "https://hammerhead-app-yx4ws.ondigitalocean.app/api/v1/alert/sendEmail"
      : "https://hammerhead-app-yx4ws.ondigitalocean.app/api/v1/alert/sendMessage";

    const body = isEmailMode ? { email } : { phone, message: "Hi bro" };

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResponseMessage(data.message || "Request sent successfully!");
      setTextState(2);
    } catch (error) {
      setResponseMessage("Failed to send request. Please try again.");
      alert("Failed to send request. Please try again.");
    }
  };

  const toggleMode = () => {
    setIsEmailMode(!isEmailMode);
    setErrorMessage(""); // Clear error message when switching modes
  };

  const countryList1 = [
    { code: "+91", name: "India", flagUrl:"/new.png" },
    { code: "+1", name: "United States",flagUrl:"/new.png" },
    { code: "+1", name: "United States",flagUrl:"/new.png" },
    { code: "+1", name: "United States" ,flagUrl:"/new.png"},
    { code: "+1", name: "United States",flagUrl:"/new.png" },
    { code: "+1", name: "United States",flagUrl:"/new.png" },
    { code: "+1", name: "United States",flagUrl:"/new.png" },
    { code: "+1", name: "United States" ,flagUrl:"/new.png"},
    { code: "+44", name: "United Kingdom",flagUrl:"/new.png" },
    // Add more countries as needed
  ];
  return (
    <div className="hero_section">
      {/* Hero Content */}
      <div className="mx-8 sm:mx-16 mt-32 mb-16 px-4 lg:py-4 flex flex-col gap-16">
        {/* Hero Heading */}
        <div className="hero_heading flex flex-col lg:gap-8">
          <div className="hero_main_heading">
            <h1 className="text-[57.6px] sm:text-[96px] font-semibold leading-[80px] text-[#F0F6FC]">
              Let's Innovate Together
            </h1>
          </div>
          <div className="hero_sub_heading">
            <h2 className="text-[24px] font-normal leading-[32px] text-[#9198A1]">
              Empowering New Ventures with Exceptional Website Solutions
            </h2>
          </div>
        </div>

        {/* Hero CTA */}
        <div className="hero_cta flex flex-col gap-2">
          <div className="hero_cta_email_text flex gap-4">
            <button
              onClick={() => setIsEmailMode(true)}
              className={`text-[14px] font-semibold leading-[21px] ${
                isEmailMode ? "text-[#bc8cff]" : "text-[#F0F6FC]"
              }`}
            >
              Email Address
            </button>
            /
            <button
              onClick={() => setIsEmailMode(false)}
              className={`text-[14px] font-semibold leading-[21px] ${
                !isEmailMode ? "text-[#bc8cff]" : "text-[#F0F6FC]"
              }`}
            >
              Phone Number
            </button>
          </div>
          <div className="hero_cta_content flex flex-col lg:flex-row gap-2 pr-8">
            {/* Email/Phone Signup */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleConnectRequest();
              }}
            >
              <div className="hero_cta_email_signup flex flex-col lg:flex-row gap-2 lg:gap-0">
                <div className="hero_cta_email_input flex items-center">
                  {isEmailMode ? (
                    <input
                      type={isEmailMode ? "email" : "tel"} // Change input type based on mode
                      placeholder={
                        isEmailMode ? "you@company.com" : "123-456-7890"
                      } // Change placeholder
                      value={isEmailMode ? email : phone}
                      onChange={(e) => {
                        setErrorMessage("");
                        setTextState(0);
                        isEmailMode
                          ? setEmail(e.target.value)
                          : setPhone(e.target.value);
                      }} //
                      className="w-full p-3 pr-16 border border-gray-400 rounded-md lg:rounded-l-md lg:rounded-r-none focus:outline-none focus:border-blue-500 text-gray-900 placeholder-gray-500"
                      required
                      pattern={
                        isEmailMode
                          ? "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
                          : "[0-9]{10}"
                      }
                    />
                  ) : (
                    <>
                      <div className="flex">
                        <div className="py-3 px-2 border border-gray-400 rounded-md rounded-l-md border-r-none rounded-r-none focus:outline-none focus:border-blue-500 text-gray-900 flex gap-1 bg-[#ffffff] border-r-0 text-gray">
                          <div className="card flex justify-content-center">
                          <Dropdown
  value={selectedItem}
  onChange={(e) => setSelectedItem(e.value)}
  options={countryList1}
  virtualScrollerOptions={{ itemSize: 38 }}
  placeholder="+91"
  className="w-full md:w-14rem custom-dropdown"
  panelClassName="custom-dropdown-panel"
  valueTemplate={(option) => (option ? option.code : "")} // Display only the country code
  itemTemplate={(option) => (
    <div className="flex items-center">
      <img
        src={option.flagUrl} // Add the image URL from the option object
        alt={option.name}
        style={{ width: "20px", marginRight: "10px" }} // Customize size and spacing
      />
      <span>{option.name} - {option.code}</span> {/* Display both code and name */}
    </div>
  )}
  filter // Enable filtering
  filterBy="name" // Filter by country name
  filterFunction={(option, search) => {
    return (
      option.name.toLowerCase().includes(search.toLowerCase()) ||
      option.code.includes(search)
    );
  }}
/>
                          </div>
                          {/* <select
                            className="focus:outline-none"
                            value={selectedCode
                            onChange={(e) => setSelectedCode(e.target.value)}
                          > */}
                          {/* {dialingCodes.map((code, index) => (
                              <option key={index} value={code}>
                                {code}
                              </option>
                            ))}{" "} */}
                          {/* Add more country codes as needed */}
                          {/* </select> */}
                        </div>
                        <input
                          type={isEmailMode ? "email" : "tel"} // Change input type based on mode
                          placeholder={
                            isEmailMode ? "you@company.com" : "123-456-7890"
                          } // Change placeholder
                          value={isEmailMode ? email : phone}
                          onChange={(e) => {
                            setErrorMessage("");
                            setTextState(0);
                            isEmailMode
                              ? setEmail(e.target.value)
                              : setPhone(e.target.value);
                          }} //
                          className="w-full p-3 pr-8 border border-gray-400 border-r-0 border-l-0 rounded-md  rounded-l-none rounded-r-none text-gray-900 placeholder-gray-500 focus:outline-none"
                          required
                          pattern={
                            isEmailMode
                              ? "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
                              : "[0-9]{10}"
                          }
                        />
                      </div>
                    </>
                  )}
                </div>
                {/*  focus:border-blue-500  */}
                <button
                  type="submit"
                  className="hero_cta_signup_content py-3 rounded-lg bg-[#783ec7] flex justify-center  items-center lg:rounded-r-md lg:rounded-l-none hover:shadow-[0_2px_8px_0_rgba(255,255,255,0.3)] transition-shadow duration-300 ease-in-out"
                >
                  <div className="flex justify-center px-8">
                    <h4 className="text-[16px] font-semibold leading-[16px] text-[#FFFFFF]">
                      {textState == 0 ? (
                        "Get you website"
                      ) : textState == 1 ? (
                        <ThreeDots
                          visible={true}
                          height="24"
                          width="24"
                          color="#ffffff"
                          radius="4"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{}}
                          wrapperClass="lg:px-12"
                        />
                      ) : (
                        "We'll reach out to you!"
                      )}
                    </h4>
                  </div>
                </button>
              </div>
            </form>
            {/* Contact Sales Button */}
            <div className="hero_cta_contact_sales px-6 py-3 border rounded-lg border-[#bc8cff] bg-[#0d1116] hover:border-white flex justify-center">
              <Link
                to="/contact_us"
                className="hero_cta_contact_sales_content flex gap-2 items-center"
              >
                <div>
                  <h4 className="text-[16px] font-semibold leading-[16px] text-[#FFFFFF]">
                    Reach Out to Us
                  </h4>
                </div>
                <div>
                  <img
                    src={greater_than}
                    alt="Greater than"
                    className="transition-all hero_cta_img"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Quality */}
        <div className="hero_quality flex flex-col gap-8">
          <div className="hero_quality_heading">
            <h3 className="text-[20px] font-normal leading-[28px] text-[#9198A1]">
              Trusted by Businesses for Unmatched Delivery, Design and
              Performance ↘︎
            </h3>
          </div>
          <div className=" text-[22px] font-normal leading-[32px] text-[#9198A1] hero_quality_examples grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            <h2 className="">Fast Delivery</h2>

            <h2 className=" ">Precise Design</h2>
            <h2 className=" ">Great Performance</h2>
            <h2 className=" ">Custom Code</h2>
            <h2 className="">Top-Notch Service</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
