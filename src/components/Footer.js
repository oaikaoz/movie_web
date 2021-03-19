import React from "react";

//redux
import { updateProfile } from "../redux/actions/authAction";
import { useDispatch } from "react-redux";
const Footer = () => {
  const dispatch = useDispatch();
  const getProfile = () => {
    const profileValue = localStorage.getItem("profile");
    if (profileValue) {
      dispatch(updateProfile(profileValue));
    }
  };
  React.useEffect(() => {
    getProfile();
  }, []);
  return <>

  </>;
};

export default Footer;
