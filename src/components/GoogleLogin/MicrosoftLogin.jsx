/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

import { useIsAuthenticated } from '@azure/msal-react';
import SignInButton  from './SignInButton';
import SignOutButton  from './SignOutButton';

/**
 * Renders the navbar component with a sign-in or sign-out button depending on whether or not a user is authenticated
 * @param props
 */
const  MicrosoftLogin = (props) => {
    const isAuthenticated = useIsAuthenticated();
    console.log(isAuthenticated)

    return (
        <>
            <Navbar bg="primary" variant="dark" className="navbarStyle text-[#ffffff]">
                <a className="navbar-brand" href="/">
                    Microsoft Identity Platform  
                </a>
                <div className="">
                    {isAuthenticated ? <SignOutButton /> : <SignInButton />}
                </div>
            </Navbar>
            <h5>
                <center>Welcome to the Microsoft Authentication Library For Javascript - React Quickstart</center>
            </h5>
            <br />
            <br />
            {props.children}
        </>
    );
};
export default MicrosoftLogin