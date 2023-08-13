import axios from "axios";

export const requestProcessor = async (route, data) => {
  let config;

  switch (route) {
    case "login":
      config = {
        method: "POST",
        data,
        url: "/api/login",
      };

    default:
      break;
  }

  if (config) {
    return (await axios(config)).data;
  }
};
