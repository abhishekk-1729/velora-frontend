import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Dropdown } from "primereact/dropdown";
import endpoints from "../../configs/apiConfigs";
import { useAuth } from "../../store/auth";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./ContactUs.css"

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [textState, setTextState] = useState(0);
  const [isEmailMode, setIsEmailMode] = useState(false);
  const { isLoggedIn, user, token } = useAuth();

  const [selectedItem, setSelectedItem] = useState({
    name: "India",
    image: "/svg/countries/in.svg",
    code: "IN",
    phone_code: "+91",
  });

  const countryList1 = [
    {
      name: "United States",
      image: "/svg/countries/us.svg",
      code: "US",
      phone_code: "+1",
    },

    {
      name: "Afghanistan",
      image: "/svg/countries/af.svg",
      code: "AF",
      phone_code: "+93",
    },
    {
      name: "Albania",
      image: "/svg/countries/al.svg",
      code: "AL",
      phone_code: "+355",
    },
    {
      name: "Algeria",
      image: "/svg/countries/dz.svg",
      code: "DZ",
      phone_code: "+213",
    },
    {
      name: "Andorra",
      image: "/svg/countries/ad.svg",
      code: "AD",
      phone_code: "+376",
    },
    {
      name: "Angola",
      image: "/svg/countries/ao.svg",
      code: "AO",
      phone_code: "+244",
    },
    {
      name: "Argentina",
      image: "/svg/countries/ar.svg",
      code: "AR",
      phone_code: "+54",
    },
    {
      name: "Armenia",
      image: "/svg/countries/am.svg",
      code: "AM",
      phone_code: "+374",
    },
    {
      name: "Australia",
      image: "/svg/countries/au.svg",
      code: "AU",
      phone_code: "+61",
    },
    {
      name: "Austria",
      image: "/svg/countries/at.svg",
      code: "AT",
      phone_code: "+43",
    },
    {
      name: "Azerbaijan",
      image: "/svg/countries/az.svg",
      code: "AZ",
      phone_code: "+994",
    },
    {
      name: "Bahamas",
      image: "/svg/countries/bs.svg",
      code: "BS",
      phone_code: "+1-242",
    },
    {
      name: "Bahrain",
      image: "/svg/countries/bh.svg",
      code: "BH",
      phone_code: "+973",
    },
    {
      name: "Bangladesh",
      image: "/svg/countries/bd.svg",
      code: "BD",
      phone_code: "+880",
    },
    {
      name: "Barbados",
      image: "/svg/countries/bb.svg",
      code: "BB",
      phone_code: "+1-246",
    },
    {
      name: "Belarus",
      image: "/svg/countries/by.svg",
      code: "BY",
      phone_code: "+375",
    },
    {
      name: "Belgium",
      image: "/svg/countries/be.svg",
      code: "BE",
      phone_code: "+32",
    },
    {
      name: "Belize",
      image: "/svg/countries/bz.svg",
      code: "BZ",
      phone_code: "+501",
    },
    {
      name: "Benin",
      image: "/svg/countries/bj.svg",
      code: "BJ",
      phone_code: "+229",
    },
    {
      name: "Bhutan",
      image: "/svg/countries/bt.svg",
      code: "BT",
      phone_code: "+975",
    },
    {
      name: "Bolivia",
      image: "/svg/countries/bo.svg",
      code: "BO",
      phone_code: "+591",
    },
    {
      name: "Bosnia & Herzegovina",
      image: "/svg/countries/ba.svg",
      code: "BA",
      phone_code: "+387",
    },
    {
      name: "Botswana",
      image: "/svg/countries/bw.svg",
      code: "BW",
      phone_code: "+267",
    },
    {
      name: "Brazil",
      image: "/svg/countries/br.svg",
      code: "BR",
      phone_code: "+55",
    },
    {
      name: "Brunei",
      image: "/svg/countries/bn.svg",
      code: "BN",
      phone_code: "+673",
    },
    {
      name: "Bulgaria",
      image: "/svg/countries/bg.svg",
      code: "BG",
      phone_code: "+359",
    },
    {
      name: "Burkina Faso",
      image: "/svg/countries/bf.svg",
      code: "BF",
      phone_code: "+226",
    },
    {
      name: "Burundi",
      image: "/svg/countries/bi.svg",
      code: "BI",
      phone_code: "+257",
    },
    {
      name: "Cabo Verde",
      image: "/svg/countries/cv.svg",
      code: "CV",
      phone_code: "+238",
    },
    {
      name: "Cambodia",
      image: "/svg/countries/kh.svg",
      code: "KH",
      phone_code: "+855",
    },
    {
      name: "Cameroon",
      image: "/svg/countries/cm.svg",
      code: "CM",
      phone_code: "+237",
    },
    {
      name: "Canada",
      image: "/svg/countries/ca.svg",
      code: "CA",
      phone_code: "+1",
    },
    {
      name: "Central African Republic",
      image: "/svg/countries/cf.svg",
      code: "CF",
      phone_code: "+236",
    },
    {
      name: "Chad",
      image: "/svg/countries/td.svg",
      code: "TD",
      phone_code: "+235",
    },
    {
      name: "Chile",
      image: "/svg/countries/cl.svg",
      code: "CL",
      phone_code: "+56",
    },
    {
      name: "China",
      image: "/svg/countries/cn.svg",
      code: "CN",
      phone_code: "+86",
    },
    {
      name: "Colombia",
      image: "/svg/countries/co.svg",
      code: "CO",
      phone_code: "+57",
    },
    {
      name: "Comoros",
      image: "/svg/countries/km.svg",
      code: "KM",
      phone_code: "+269",
    },
    {
      name: "Congo-Brazzaville",
      image: "/svg/countries/cg.svg",
      code: "CG",
      phone_code: "+242",
    },
    // {
    //     "name": "Congo (Democratic Republic of the Congo)",
    //     "image": "/svg/countries/cd.svg",
    //     "code": "CD",
    //     "phone_code": "+243"
    // },
    {
      name: "Costa Rica",
      image: "/svg/countries/cr.svg",
      code: "CR",
      phone_code: "+506",
    },
    {
      name: "Croatia",
      image: "/svg/countries/hr.svg",
      code: "HR",
      phone_code: "+385",
    },
    {
      name: "Cuba",
      image: "/svg/countries/cu.svg",
      code: "CU",
      phone_code: "+53",
    },
    {
      name: "Cyprus",
      image: "/svg/countries/cy.svg",
      code: "CY",
      phone_code: "+357",
    },
    {
      name: "Czech Republic",
      image: "/svg/countries/cz.svg",
      code: "CZ",
      phone_code: "+420",
    },
    {
      name: "Denmark",
      image: "/svg/countries/dk.svg",
      code: "DK",
      phone_code: "+45",
    },
    {
      name: "Djibouti",
      image: "/svg/countries/dj.svg",
      code: "DJ",
      phone_code: "+253",
    },
    {
      name: "Dominica",
      image: "/svg/countries/dm.svg",
      code: "DM",
      phone_code: "+1-767",
    },
    {
      name: "Dominican Republic",
      image: "/svg/countries/do.svg",
      code: "DO",
      phone_code: "+1-809",
    },
    {
      name: "Ecuador",
      image: "/svg/countries/ec.svg",
      code: "EC",
      phone_code: "+593",
    },
    {
      name: "Egypt",
      image: "/svg/countries/eg.svg",
      code: "EG",
      phone_code: "+20",
    },
    {
      name: "El Salvador",
      image: "/svg/countries/sv.svg",
      code: "SV",
      phone_code: "+503",
    },
    {
      name: "Equatorial Guinea",
      image: "/svg/countries/gq.svg",
      code: "GQ",
      phone_code: "+240",
    },
    {
      name: "Eritrea",
      image: "/svg/countries/er.svg",
      code: "ER",
      phone_code: "+291",
    },
    {
      name: "Estonia",
      image: "/svg/countries/ee.svg",
      code: "EE",
      phone_code: "+372",
    },
    {
      name: "Eswatini",
      image: "/svg/countries/sz.svg",
      code: "SZ",
      phone_code: "+268",
    },
    {
      name: "Ethiopia",
      image: "/svg/countries/et.svg",
      code: "ET",
      phone_code: "+251",
    },
    {
      name: "Fiji",
      image: "/svg/countries/fj.svg",
      code: "FJ",
      phone_code: "+679",
    },
    {
      name: "Finland",
      image: "/svg/countries/fi.svg",
      code: "FI",
      phone_code: "+358",
    },
    {
      name: "France",
      image: "/svg/countries/fr.svg",
      code: "FR",
      phone_code: "+33",
    },
    {
      name: "Gabon",
      image: "/svg/countries/ga.svg",
      code: "GA",
      phone_code: "+241",
    },
    {
      name: "Gambia",
      image: "/svg/countries/gm.svg",
      code: "GM",
      phone_code: "+220",
    },
    {
      name: "Georgia",
      image: "/svg/countries/ge.svg",
      code: "GE",
      phone_code: "+995",
    },
    {
      name: "Germany",
      image: "/svg/countries/de.svg",
      code: "DE",
      phone_code: "+49",
    },
    {
      name: "Ghana",
      image: "/svg/countries/gh.svg",
      code: "GH",
      phone_code: "+233",
    },
    {
      name: "Greece",
      image: "/svg/countries/gr.svg",
      code: "GR",
      phone_code: "+30",
    },
    {
      name: "Grenada",
      image: "/svg/countries/gd.svg",
      code: "GD",
      phone_code: "+1-473",
    },
    {
      name: "Guatemala",
      image: "/svg/countries/gt.svg",
      code: "GT",
      phone_code: "+502",
    },
    {
      name: "Guinea",
      image: "/svg/countries/gn.svg",
      code: "GN",
      phone_code: "+224",
    },
    {
      name: "Guinea-Bissau",
      image: "/svg/countries/gw.svg",
      code: "GW",
      phone_code: "+245",
    },
    {
      name: "Guyana",
      image: "/svg/countries/gy.svg",
      code: "GY",
      phone_code: "+592",
    },
    {
      name: "Haiti",
      image: "/svg/countries/ht.svg",
      code: "HT",
      phone_code: "+509",
    },
    {
      name: "Honduras",
      image: "/svg/countries/hn.svg",
      code: "HN",
      phone_code: "+504",
    },
    {
      name: "Hungary",
      image: "/svg/countries/hu.svg",
      code: "HU",
      phone_code: "+36",
    },
    {
      name: "Iceland",
      image: "/svg/countries/is.svg",
      code: "IS",
      phone_code: "+354",
    },
    {
      name: "India",
      image: "/svg/countries/in.svg",
      code: "IN",
      phone_code: "+91",
    },
    {
      name: "Indonesia",
      image: "/svg/countries/id.svg",
      code: "ID",
      phone_code: "+62",
    },
    {
      name: "Iran",
      image: "/svg/countries/ir.svg",
      code: "IR",
      phone_code: "+98",
    },
    {
      name: "Iraq",
      image: "/svg/countries/iq.svg",
      code: "IQ",
      phone_code: "+964",
    },
    {
      name: "Ireland",
      image: "/svg/countries/ie.svg",
      code: "IE",
      phone_code: "+353",
    },
    {
      name: "Israel",
      image: "/svg/countries/il.svg",
      code: "IL",
      phone_code: "+972",
    },
    {
      name: "Italy",
      image: "/svg/countries/it.svg",
      code: "IT",
      phone_code: "+39",
    },
    {
      name: "Jamaica",
      image: "/svg/countries/jm.svg",
      code: "JM",
      phone_code: "+1-876",
    },
    {
      name: "Japan",
      image: "/svg/countries/jp.svg",
      code: "JP",
      phone_code: "+81",
    },
    {
      name: "Jordan",
      image: "/svg/countries/jo.svg",
      code: "JO",
      phone_code: "+962",
    },
    {
      name: "Kazakhstan",
      image: "/svg/countries/kz.svg",
      code: "KZ",
      phone_code: "+7",
    },
    {
      name: "Kenya",
      image: "/svg/countries/ke.svg",
      code: "KE",
      phone_code: "+254",
    },
    {
      name: "Kiribati",
      image: "/svg/countries/ki.svg",
      code: "KI",
      phone_code: "+686",
    },
    {
      name: "Kuwait",
      image: "/svg/countries/kw.svg",
      code: "KW",
      phone_code: "+965",
    },
    {
      name: "Kyrgyzstan",
      image: "/svg/countries/kg.svg",
      code: "KG",
      phone_code: "+996",
    },
    {
      name: "Laos",
      image: "/svg/countries/la.svg",
      code: "LA",
      phone_code: "+856",
    },
    {
      name: "Latvia",
      image: "/svg/countries/lv.svg",
      code: "LV",
      phone_code: "+371",
    },
    {
      name: "Lebanon",
      image: "/svg/countries/lb.svg",
      code: "LB",
      phone_code: "+961",
    },
    {
      name: "Lesotho",
      image: "/svg/countries/ls.svg",
      code: "LS",
      phone_code: "+266",
    },
    {
      name: "Liberia",
      image: "/svg/countries/lr.svg",
      code: "LR",
      phone_code: "+231",
    },
    {
      name: "Libya",
      image: "/svg/countries/ly.svg",
      code: "LY",
      phone_code: "+218",
    },
    {
      name: "Liechtenstein",
      image: "/svg/countries/li.svg",
      code: "LI",
      phone_code: "+423",
    },
    {
      name: "Lithuania",
      image: "/svg/countries/lt.svg",
      code: "LT",
      phone_code: "+370",
    },
    {
      name: "Luxembourg",
      image: "/svg/countries/lu.svg",
      code: "LU",
      phone_code: "+352",
    },
    {
      name: "Madagascar",
      image: "/svg/countries/mg.svg",
      code: "MG",
      phone_code: "+261",
    },
    {
      name: "Malawi",
      image: "/svg/countries/mw.svg",
      code: "MW",
      phone_code: "+265",
    },
    {
      name: "Malaysia",
      image: "/svg/countries/my.svg",
      code: "MY",
      phone_code: "+60",
    },
    {
      name: "Maldives",
      image: "/svg/countries/mv.svg",
      code: "MV",
      phone_code: "+960",
    },
    {
      name: "Mali",
      image: "/svg/countries/ml.svg",
      code: "ML",
      phone_code: "+223",
    },
    {
      name: "Malta",
      image: "/svg/countries/mt.svg",
      code: "MT",
      phone_code: "+356",
    },
    {
      name: "Marshall Islands",
      image: "/svg/countries/mh.svg",
      code: "MH",
      phone_code: "+692",
    },
    {
      name: "Mauritania",
      image: "/svg/countries/mr.svg",
      code: "MR",
      phone_code: "+222",
    },
    {
      name: "Mauritius",
      image: "/svg/countries/mu.svg",
      code: "MU",
      phone_code: "+230",
    },
    {
      name: "Mexico",
      image: "/svg/countries/mx.svg",
      code: "MX",
      phone_code: "+52",
    },
    {
      name: "Micronesia",
      image: "/svg/countries/fm.svg",
      code: "FM",
      phone_code: "+691",
    },
    {
      name: "Moldova",
      image: "/svg/countries/md.svg",
      code: "MD",
      phone_code: "+373",
    },
    {
      name: "Monaco",
      image: "/svg/countries/mc.svg",
      code: "MC",
      phone_code: "+377",
    },
    {
      name: "Mongolia",
      image: "/svg/countries/mn.svg",
      code: "MN",
      phone_code: "+976",
    },
    {
      name: "Montenegro",
      image: "/svg/countries/me.svg",
      code: "ME",
      phone_code: "+382",
    },
    {
      name: "Morocco",
      image: "/svg/countries/ma.svg",
      code: "MA",
      phone_code: "+212",
    },
    {
      name: "Mozambique",
      image: "/svg/countries/mz.svg",
      code: "MZ",
      phone_code: "+258",
    },
    {
      name: "Myanmar",
      image: "/svg/countries/mm.svg",
      code: "MM",
      phone_code: "+95",
    },
    {
      name: "Namibia",
      image: "/svg/countries/na.svg",
      code: "NA",
      phone_code: "+264",
    },
    {
      name: "Nauru",
      image: "/svg/countries/nr.svg",
      code: "NR",
      phone_code: "+674",
    },
    {
      name: "Nepal",
      image: "/svg/countries/np.svg",
      code: "NP",
      phone_code: "+977",
    },
    {
      name: "Netherlands",
      image: "/svg/countries/nl.svg",
      code: "NL",
      phone_code: "+31",
    },
    {
      name: "New Zealand",
      image: "/svg/countries/nz.svg",
      code: "NZ",
      phone_code: "+64",
    },
    {
      name: "Nicaragua",
      image: "/svg/countries/ni.svg",
      code: "NI",
      phone_code: "+505",
    },
    {
      name: "Niger",
      image: "/svg/countries/ne.svg",
      code: "NE",
      phone_code: "+227",
    },
    {
      name: "Nigeria",
      image: "/svg/countries/ng.svg",
      code: "NG",
      phone_code: "+234",
    },
    {
      name: "North Korea",
      image: "/svg/countries/kp.svg",
      code: "KP",
      phone_code: "+850",
    },
    {
      name: "North Macedonia",
      image: "/svg/countries/mk.svg",
      code: "MK",
      phone_code: "+389",
    },
    {
      name: "Norway",
      image: "/svg/countries/no.svg",
      code: "NO",
      phone_code: "+47",
    },
    {
      name: "Oman",
      image: "/svg/countries/om.svg",
      code: "OM",
      phone_code: "+968",
    },
    {
      name: "Pakistan",
      image: "/svg/countries/pk.svg",
      code: "PK",
      phone_code: "+92",
    },
    {
      name: "Palau",
      image: "/svg/countries/pw.svg",
      code: "PW",
      phone_code: "+680",
    },
    {
      name: "Panama",
      image: "/svg/countries/pa.svg",
      code: "PA",
      phone_code: "+507",
    },
    {
      name: "Papua New Guinea",
      image: "/svg/countries/pg.svg",
      code: "PG",
      phone_code: "+675",
    },
    {
      name: "Paraguay",
      image: "/svg/countries/py.svg",
      code: "PY",
      phone_code: "+595",
    },
    {
      name: "Peru",
      image: "/svg/countries/pe.svg",
      code: "PE",
      phone_code: "+51",
    },
    {
      name: "Philippines",
      image: "/svg/countries/ph.svg",
      code: "PH",
      phone_code: "+63",
    },
    {
      name: "Poland",
      image: "/svg/countries/pl.svg",
      code: "PL",
      phone_code: "+48",
    },
    {
      name: "Portugal",
      image: "/svg/countries/pt.svg",
      code: "PT",
      phone_code: "+351",
    },
    {
      name: "Qatar",
      image: "/svg/countries/qa.svg",
      code: "QA",
      phone_code: "+974",
    },
    {
      name: "Romania",
      image: "/svg/countries/ro.svg",
      code: "RO",
      phone_code: "+40",
    },
    {
      name: "Russia",
      image: "/svg/countries/ru.svg",
      code: "RU",
      phone_code: "+7",
    },
    {
      name: "Rwanda",
      image: "/svg/countries/rw.svg",
      code: "RW",
      phone_code: "+250",
    },
    {
      name: "Saint Kitts & Nevis",
      image: "/svg/countries/kn.svg",
      code: "KN",
      phone_code: "+1-869",
    },
    {
      name: "Saint Lucia",
      image: "/svg/countries/lc.svg",
      code: "LC",
      phone_code: "+1-758",
    },
    // {
    //     "name": "Saint Vincent & Grenadines",
    //     "image": "/svg/countries/vc.svg",
    //     "code": "VC",
    //     "phone_code": "+1-784"
    // },
    {
      name: "Samoa",
      image: "/svg/countries/ws.svg",
      code: "WS",
      phone_code: "+685",
    },
    {
      name: "San Marino",
      image: "/svg/countries/sm.svg",
      code: "SM",
      phone_code: "+378",
    },
    {
      name: "São Tomé & Príncipe",
      image: "/svg/countries/st.svg",
      code: "ST",
      phone_code: "+239",
    },
    {
      name: "Saudi Arabia",
      image: "/svg/countries/sa.svg",
      code: "SA",
      phone_code: "+966",
    },
    {
      name: "Senegal",
      image: "/svg/countries/sn.svg",
      code: "SN",
      phone_code: "+221",
    },
    {
      name: "Serbia",
      image: "/svg/countries/rs.svg",
      code: "RS",
      phone_code: "+381",
    },
    {
      name: "Seychelles",
      image: "/svg/countries/sc.svg",
      code: "SC",
      phone_code: "+248",
    },
    {
      name: "Sierra Leone",
      image: "/svg/countries/sl.svg",
      code: "SL",
      phone_code: "+232",
    },
    {
      name: "Singapore",
      image: "/svg/countries/sg.svg",
      code: "SG",
      phone_code: "+65",
    },
    {
      name: "Slovakia",
      image: "/svg/countries/sk.svg",
      code: "SK",
      phone_code: "+421",
    },
    {
      name: "Slovenia",
      image: "/svg/countries/si.svg",
      code: "SI",
      phone_code: "+386",
    },
    {
      name: "Solomon Islands",
      image: "/svg/countries/sb.svg",
      code: "SB",
      phone_code: "+677",
    },
    {
      name: "Somalia",
      image: "/svg/countries/so.svg",
      code: "SO",
      phone_code: "+252",
    },
    {
      name: "South Africa",
      image: "/svg/countries/za.svg",
      code: "ZA",
      phone_code: "+27",
    },
    {
      name: "South Korea",
      image: "/svg/countries/kr.svg",
      code: "KR",
      phone_code: "+82",
    },
    {
      name: "South Sudan",
      image: "/svg/countries/ss.svg",
      code: "SS",
      phone_code: "+211",
    },
    {
      name: "Spain",
      image: "/svg/countries/es.svg",
      code: "ES",
      phone_code: "+34",
    },
    {
      name: "Sri Lanka",
      image: "/svg/countries/lk.svg",
      code: "LK",
      phone_code: "+94",
    },
    {
      name: "Sudan",
      image: "/svg/countries/sd.svg",
      code: "SD",
      phone_code: "+249",
    },
    {
      name: "Suriname",
      image: "/svg/countries/sr.svg",
      code: "SR",
      phone_code: "+597",
    },
    {
      name: "Sweden",
      image: "/svg/countries/se.svg",
      code: "SE",
      phone_code: "+46",
    },
    {
      name: "Switzerland",
      image: "/svg/countries/ch.svg",
      code: "CH",
      phone_code: "+41",
    },
    {
      name: "Syria",
      image: "/svg/countries/sy.svg",
      code: "SY",
      phone_code: "+963",
    },
    {
      name: "Taiwan",
      image: "/svg/countries/tw.svg",
      code: "TW",
      phone_code: "+886",
    },
    {
      name: "Tajikistan",
      image: "/svg/countries/tj.svg",
      code: "TJ",
      phone_code: "+992",
    },
    {
      name: "Tanzania",
      image: "/svg/countries/tz.svg",
      code: "TZ",
      phone_code: "+255",
    },
    {
      name: "Thailand",
      image: "/svg/countries/th.svg",
      code: "TH",
      phone_code: "+66",
    },
    {
      name: "Timor-Leste",
      image: "/svg/countries/tl.svg",
      code: "TL",
      phone_code: "+670",
    },
    {
      name: "Togo",
      image: "/svg/countries/tg.svg",
      code: "TG",
      phone_code: "+228",
    },
    {
      name: "Tonga",
      image: "/svg/countries/to.svg",
      code: "TO",
      phone_code: "+676",
    },
    {
      name: "Trinidad & Tobago",
      image: "/svg/countries/tt.svg",
      code: "TT",
      phone_code: "+1-868",
    },
    {
      name: "Tunisia",
      image: "/svg/countries/tn.svg",
      code: "TN",
      phone_code: "+216",
    },
    {
      name: "Turkey",
      image: "/svg/countries/tr.svg",
      code: "TR",
      phone_code: "+90",
    },
    {
      name: "Turkmenistan",
      image: "/svg/countries/tm.svg",
      code: "TM",
      phone_code: "+993",
    },
    {
      name: "Tuvalu",
      image: "/svg/countries/tv.svg",
      code: "TV",
      phone_code: "+688",
    },
    {
      name: "Uganda",
      image: "/svg/countries/ug.svg",
      code: "UG",
      phone_code: "+256",
    },
    {
      name: "Ukraine",
      image: "/svg/countries/ua.svg",
      code: "UA",
      phone_code: "+380",
    },
    {
      name: "United Arab Emirates",
      image: "/svg/countries/ae.svg",
      code: "AE",
      phone_code: "+971",
    },
    {
      name: "United Kingdom",
      image: "/svg/countries/gb.svg",
      code: "GB",
      phone_code: "+44",
    },
    {
      name: "Uruguay",
      image: "/svg/countries/uy.svg",
      code: "UY",
      phone_code: "+598",
    },
    {
      name: "Uzbekistan",
      image: "/svg/countries/uz.svg",
      code: "UZ",
      phone_code: "+998",
    },
    {
      name: "Vanuatu",
      image: "/svg/countries/vu.svg",
      code: "VU",
      phone_code: "+678",
    },
    {
      name: "Vatican City",
      image: "/svg/countries/va.svg",
      code: "VA",
      phone_code: "+379",
    },
    {
      name: "Venezuela",
      image: "/svg/countries/ve.svg",
      code: "VE",
      phone_code: "+58",
    },
    {
      name: "Vietnam",
      image: "/svg/countries/vn.svg",
      code: "VN",
      phone_code: "+84",
    },
    {
      name: "Yemen",
      image: "/svg/countries/ye.svg",
      code: "YE",
      phone_code: "+967",
    },
    {
      name: "Zambia",
      image: "/svg/countries/zm.svg",
      code: "ZM",
      phone_code: "+260",
    },
    {
      name: "Zimbabwe",
      image: "/svg/countries/zw.svg",
      code: "ZW",
      phone_code: "+263",
    },
    // Add more countries as needed
  ];
  // Validation regex
  const getUserData = async () => {
    console.log("hi");
      try {
        console.log("new")
        const response = await fetch(endpoints.getUserById, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response);

        if (response.ok) {
          const res_data = await response.json();
          console.log("res_data")
          console.log(res_data)
          setName(res_data.user.name);
          setAddress(res_data.user.address);
          setEmail(res_data.user.email);
          setPhone(res_data.user.phone_number);
          setSelectedItem({
            name: "India",
            image: "/svg/countries/in.svg",
            code: "IN",
            phone_code: res_data.user.phone_code
          });
        } else {
          console.log("Not able to find the user");
        }
      } catch (error) {
        console.log(error);
      }
  };


  useEffect(()=>{
    getUserData();
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contactData = {
      name: name, // e.g., "Abhishek Kumar"
      email: email, // e.g., "abhikriitd"
      message: message, // e.g., "Testing message"
      phone_code: "+91", // Assuming the phone code is fixed, or you can also add a phone_code state if needed
      phone_number: phone, // e.g., "8755273773"
      address: address, // e.g., "Test Address"
    };

    // Hit the API
    try {
      setTextState(1);
      const response = await fetch(
        endpoints.addContact,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactData),
        }
      );

      if (response.ok) {
        // alert("Form submitted successfully");
      } else {
        // alert("Error submitting form");
      }
      setTextState(2);
    } catch (error) {
      // alert("Error submitting form");
    }
  };

  return (
    <>
    <div className="contact_main">
      <Navbar />
      <div className="flex flex-col items-center  mx-4 lg:mx-16 p-4 md:p-16 text-[#8a919a] gap-16 mb-16 ">
        <h1 className="text-[40px] md:text-[60px] font-semibold md:leading-[80px] text-[#F0F6FC] text-center ">
          We would love to hear from you!
        </h1>

        <div className="flex flex-col gap-4 md:flex-row md:gap-8 lg:gap-20 md:w-full">
          <div className="flex flex-col  md:w-3/4 gap-9   p-2 md:p-8 bg-[#151B23] rounded-lg border border-[#3d444d]">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              {/* Name Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="form_name" className="text-white">
                  Name <span className="text-[#D82E5A]">*</span>
                </label>
                <input
                  id="form_name"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => {
                    setTextState(0);
                    setName(e.target.value);
                  }}
                  className="bg-[#0D1116]  border-[#3D444D] w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500  placeholder-gray-500 mb-4"
                  required
                  maxLength={100}
                />
              </div>

              {/* Email Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="form_email" className="text-white">
                  Email <span className="text-[#D82E5A]">*</span>
                </label>
                <input
                  id="form_email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => {
                    setTextState(0);
                    setEmail(e.target.value);
                  }}
                  className="bg-[#0D1116]  border-[#3D444D] w-full p-3 border  rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-500 mb-4"
                  required
                  maxLength={100}
                />
              </div>

              {/* Phone Input */}
              <div className="flex flex-col gap-2  ">
                <label htmlFor="form_phone" className="text-white">
                  Phone <span className="text-[#D82E5A]">*</span>
                </label>
                <div className="flex border border-[#3D444D] rounded-md focus-within:border-blue-500 ">
                  <div className="py-3 px-2  rounded-md rounded-l-md  rounded-r-none focus:outline-none   flex bg-[#0d1116]     ">
                    <div className="card flex justify-content-center">
                      <Dropdown
                        value={selectedItem}
                        onChange={(e) => setSelectedItem(e.value)}
                        options={countryList1}
                        virtualScrollerOptions={{ itemSize: 38 }}
                        placeholder="+91"
                        className="w-full md:w-14rem custom-dropdown bg-[#0d1116] text-[#6b7280]"
                        panelClassName="custom-dropdown-panel"
                        valueTemplate={(option) =>
                          option ? option.phone_code : ""
                        } // Display only the country code
                        itemTemplate={(option) => (
                          <div className="flex items-center justify-between">
                            <div className="flex">
                              <img
                                src={option.image} // Add the image URL from the option object
                                alt={option.name}
                                style={{
                                  width: "20px",
                                  marginRight: "10px",
                                }} // Customize size and spacing
                              />
                              <span>{option.name} </span>
                              {/* Display both code and name */}
                            </div>
                            {option.phone_code}
                          </div>
                        )}
                        filter // Enable filtering
                        filterBy="name,phone_code" // Filter by both name and code
                        filterFunction={(option, search) => {
                          const searchTerm = search.toLowerCase();
                          return (
                            option.name.toLowerCase().includes(searchTerm) ||
                            option.phone_code.toLowerCase().includes(searchTerm)
                          );
                        }}
                        // appendTo="body"
                      />
                    </div>
                  </div>
                  <input
                    type={isEmailMode ? "email" : "tel"} // Change input type based on mode
                    placeholder={
                      isEmailMode ? "you@company.com" : "123-456-7890"
                    } // Change placeholder
                    value={isEmailMode ? email : phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }} //
                    className="w-full p-3 pr-16 lg:pr-8  rounded-md  rounded-l-none   placeholder-gray-500 focus:outline-none bg-[#0d1116]     "
                    required
                    pattern={"[0-9]{5,11}"}
                    title="Please enter a valid phone number with 5 to 11 digits."
                  />
                </div>
              </div>

              {/* Address TextArea */}
              <div className="flex flex-col gap-2">
                <label htmlFor="form_address" className="text-white">
                  Address
                </label>
                <textarea
                  id="form_address"
                  placeholder="Your Address"
                  value={address}
                  onChange={(e) => {
                    setTextState(0);
                    setAddress(e.target.value);
                  }}
                  className="bg-[#0D1116]  border-[#3D444D] w-full p-3 border rounded-md focus:outline-none focus:border-blue-500  placeholder-gray-500 mb-4"
                  rows="3"
                />
              </div>

              {/* Message TextArea */}
              <div className="flex flex-col gap-2">
                <label htmlFor="form_message" className="text-white">
                  Message
                </label>
                <textarea
                  id="form_message"
                  placeholder="Your Message"
                  value={message}
                  onChange={(e) => {
                    setTextState(0);
                    setMessage(e.target.value);
                  }}
                  className="bg-[#0D1116]  border-[#3D444D] w-full p-3 border rounded-md focus:outline-none focus:border-blue-500  placeholder-gray-500"
                  rows="5"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-4">
                <button className="hero_cta_signup_content px-6 py-3 rounded-lg bg-[#783ec7] flex justify-center items-center hover:shadow-[0_2px_8px_0_rgba(255,255,255,0.3)] transition-shadow duration-300 ease-in-out w-full">
                  <h4 className="text-[16px] font-semibold leading-[16px] text-[#FFFFFF]">
                    {textState == 0 ? (
                      "Submit"
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
                </button>
              </div>
            </form>
          </div>
          <div className="flex-col md:w-1/4  ">
            <div className="flex flex-col gap-2 p-4 border-2 border-dotted border-gray-500">
              {/* <img src={nss} alt="" className="h-[60px]" /> */}
              <div>
                <div className=" ">Address:</div>
                <div className="hover:underline">
                  HSR Layout, Bangalore, India - 560103
                </div>
              </div>
              <div>
                <div>Phone:</div>
                <div className="hover:underline">
                  <a href="tel:+918755273773">+91 8755273773</a>
                </div>
              </div>
              <div>
                <div>Email:</div>
                <div className="hover:underline">
                  <a href="mailto:support@The First Web.com">support@thefirstweb.com</a>
                </div>
              </div>
              <div>
                <div>Follow us on :</div>
                <div className="flex gap-4 py-2 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 hover:fill-[#118C7E]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>

                  {/* <!-- Facebook --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 hover:fill-[#1A77F2]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>

                  {/* <!-- LinkedIn --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 hover:fill-[#0277b5]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>

                  {/* <!-- YouTube --> */}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 hover:fill-[#FF0000]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                  {/* <!-- Twitter --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 hover:fill-[#1EA1F1]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                  {/* <!-- Instagram --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 hover:fill-[#C13684]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer/>
    </>
  );
}

export default ContactUs;
