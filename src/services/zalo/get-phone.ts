import axios from 'axios';

export const getPhoneNumberByToken = async (token, accessToken) => {
  try {
    const respond = await axios.post(
      'https://api.auradental.vn/api/v1/zalo/phone-number',
      {
        token: token,
        accessToken: accessToken,
      }
    );

    return respond.data.data;
  } catch (error) {
    console.log('call api get number backend error', error);
  }
};
