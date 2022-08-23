import React, { useState } from "react"
import UAuth from "@uauth/js"
import styled from "styled-components";

const uauth = new UAuth({
    clientID: "9733b59c-e741-4cfb-9165-d0942ebe1f98",
    redirectUri: "https://hashlips-nft-minting-dapp-qmicon.vercel.app/",
    scope: "openid wallet"
  })
const StyledButton = styled.button`
  padding: 10px;
  margin-right:70px;
  margin-top:10px;
  float: right;
  border-radius: 50px;
  border: none;
  background-color: var(--secondary);
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;
function UDomain() {
    const [Uauth, setUauth] = useState()

    async function Connect() {
        try {
            const authorization = await uauth.loginWithPopup()
            setUauth(JSON.parse(JSON.stringify(authorization))["idToken"])

            await authenticate()
        } catch (error) {
            console.error(error)
        }
    }

    async function logOut() {
       await uauth.logout()
       setUauth(null)
    }

    function log() {
        if (Uauth === null || Uauth === undefined) {
            Connect()
        } else {
            logOut()
        }
    }

    return (
        <>
            <StyledButton
                      onClick={log}
                    >
            {Uauth != null ? Uauth["sub"] : "Login with UNSD"}
            </StyledButton>
        </>
    )
}

export default UDomain