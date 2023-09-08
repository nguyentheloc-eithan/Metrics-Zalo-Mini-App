import axios from "axios";
import { getAccessToken, getPhoneNumber, login } from "zmp-sdk";

export const getPhoneNumberByToken = async (token, accessToken) => {
  try {
    const respond = await axios.post(
      "https://api.auradental.vn/api/v1/zalo/phone-number",
      {
        token: token,
        accessToken: accessToken,
      },
    );

    return respond.data.data;
  } catch (error) {
    console.log("call api get number backend error", error);
  }
};
export const getPhoneNumberZalo = async () => {
  try {
    await login({});
    const accessToken = await getAccessToken({});
    const { token } = await getPhoneNumber();
    console.log("accessToken", accessToken);
    console.log("token", token);
    if (accessToken && token) {
      let number = await getPhoneNumberByToken(token, accessToken);
      if (number) return number;
    }
  } catch (e) {}
  return null;
};
