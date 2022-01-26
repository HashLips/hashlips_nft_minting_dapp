import styled from "styled-components";

export const MainContent = styled.div`
  display: flex;
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: ${({ fd }) => (fd ? fd : "column")};
  justify-content: ${({ jc }) => (jc ? jc : "flex-start")};
  align-items: ${({ ai }) => (ai ? ai : "flex-start")};
  background-color: ${({ test }) => (test ? "pink" : "none")};
  width: 100%;
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const PicContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  max-width: 50%;

  @media screen and (max-width: 1000px) {
    width: 100%;
    max-width: 100%;
  }

  .extra-pics:last-child img:last-child {
    grid-area: pic6;

    @media screen and (max-width: 2450px) {
      display: none;
    };
      
  };

  .extra-pics:last-child img:nth-last-child(2) {
    @media screen and (max-width: 1850px) {
      display: none;
    };
  };

  .extra-pics:last-child img:nth-last-child(3) {
    @media screen and (max-width: 1850px) {
      display: none;
    };
  };

  .extra-pics:last-child img:nth-last-child(4) {
    @media screen and (max-width: 1850px) {
      display: none;
    };
  };

  .extra-pics >img {
    @media screen and (max-width: 1300px) {
      display: none;
    };
  };
}
`

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: var(--secondary);
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

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  background-color: var(--primary);
  font-weight: bold;
  font-size: 15px;
  color: var(--primary-text);
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 50%;
  padding: 24px;

  @media screen and (min-width: 767px) {
    flex-direction: row;
  };

  @media screen and (max-width: 1000px) {
    margin-top: 10px;
    padding: 0px;
    justify-content: center;
    align-items: center;
    width: 100%;
  };
`;

export const MintFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  justify-content: center;
  align-items: center;
  background-color: var(--accent);
  padding: 5px;
  border-radius: 24px;
  border: 4px solid var(--secondary);
  box-shadow: 0px 5px 11px 2px rgba(0,0,0,0.7);
  background-size: cover;
  background-position: center;
  width: 50%;

  @media screen and (max-width: 250px) {
    max-height: 10vh;
  }

  @media screen and (max-width: 1000px) {
    width: 100%;
    padding: 10px;
  };
`

export const StyledLogo = styled.img`
  width: 10em;
  @media (min-width: 767px) {
    width: 12vw;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 4px solid var(--secondary);
  background-color: var(--accent);
  width: 100%;

  @media (min-width: 600px) {
    width: 15em;
  }

  @media (max-width: 600px) {
    width: 15em;
  }
  @media (min-width: 900px) {
    width: 15em;
  }
  @media (min-width: 1000px) {
    width: 15em;
  }
  transition: width 0.5s;
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;