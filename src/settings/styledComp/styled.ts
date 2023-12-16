import { Field } from "formik";
import styled, { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
    *::before, *::after, *{
        box-sizing: border-box;
    }
    body{
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;    
    }
    .container{
        max-width: 1500px;
        margin: 0 auto;
        padding: 0 20px;
    }
    .border-transparent{
        border: 1px solid transparent;
        outline: 1px solid transparent;
    }
    .error__form{
        color: crimson !important;
        font-size: 14px;
        font-weight: 400 !important;
        margin: 0;  
    }
    .container__fluid{
        padding: 10px 10px;
    }
    .black{
        color: #fff !important;
    }
    .white{
        color: #000 !important;
    }
    ul{
        list-style: none;
        margin: 0;
        padding: 0;
    }
`;
export const GoogleBtn = styled.button.attrs({
  className: "border-transparent",
})`
  padding: 0.5rem 1rem;
  background: #fff;
  color: #000;
  border: "1px solid #000";
  width: 100%;
  border-radius: 10px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  font-weight: 500;
  letter-spacing: 1px;
  background-image: url("https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png");
  background-size: 20px;
  background-position: calc(10%);
  background-repeat: no-repeat;
  border: 1px solid rgba(128, 128, 128, 0.458);
  &:hover {
    opacity: 0.8;
  }
`;
export const Input = styled.input<{ styledType: "error" | "" , darkMode?: string }>`
  padding: 0.5rem 1rem;
  background: ${({darkMode}) => darkMode === "dark" ? "#282828": "#b5b4b470"};
  color: ${({darkMode}) => darkMode === "dark" ? "#fff": "auto"} !important;
  border: ${({ styledType }) =>
    styledType === "error"
      ? "1px solid crimson"
      : "1px solid rgba(128, 128, 128, 0.458)"};
  width: 100%;
  border-radius: 2px;
  outline: 1px solid transparent;
  &:focus {
    border: ${({ styledType }) =>
      styledType === "error"
        ? "1px solid crimson"
        : "1px solid rgba(128, 128, 128, 0.800)"};
  }
  &::placeholder {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif;
    color: ${({ styledType }) => styledType === "error" ? "crimson" : ""};
  }
`;
export const Button = styled.button.attrs<{ styledDisabled?: boolean }>({
  className: "border-transparent",
})`
  width: 100%;
  padding: 0.5rem 1rem;
  background: rgb(0, 149, 246);
  color: #fff;
  border-radius: 15px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  font-weight: 700;
  opacity: ${({ styledDisabled }) => (styledDisabled ? 0.5 : 1)};
`;
export const FieldFormik = styled(Field)<{ styledType: "error" | "" }>`
  padding: 0.5rem 1rem;
  border: ${({ styledType }) =>
    styledType === "error"
      ? "1px solid crimson"
      : "1px solid rgba(128, 128, 128, 0.458)"};
  width: 100%;
  border-radius: 2px;
  outline: 1px solid transparent;
  &:focus {
    border: ${({ styledType }) =>
      styledType === "error"
        ? "1px solid crimson"
        : "1px solid rgba(128, 128, 128, 0.800)"};
  }
  &::placeholder {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif;
    color: ${({ styledType }) => styledType === "error" ? "crimson" : ""};
  }
`;
export const Avatar = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
  border-radius: 50%;
`;
export const AvatarText = styled.div<{ styledType?: string }>`
  padding: 0.3rem !important;
  background: #fff;
  border-radius: 50%;
  font-size: 14px;
  display: inline-block;
  margin-right: 0.5rem !important;
  background: ${({ styledType }) => styledType === "black" ? "white" : "black"};
  color: ${({ styledType }) => styledType === "black" ? "black !important" : "white !important"};
`;

export const ButtonBar = styled.button<{darkMode: string, active?: boolean}>`
  padding: 0.3rem ;
  padding-bottom: 0rem;
  font-size: ${({active}) => active ? "15px": "20px"};
  background: transparent;
  color: ${({darkMode}) => darkMode === "dark" ? "#fff": "#000" };
  opacity: ${({active}) => active ? 0.7: 1};
  &:hover{
    opacity: 0.4;
    
  }
`