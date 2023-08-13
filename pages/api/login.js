import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const config = {
      method: "POST",
      data: {
        identifier: req.body.email,
        password: req.body.password,
      },
      url: `${process.env.MGT_BACKEND}/auth/local`,
    };

    try {
      const response = await axios(config);

      res.status(200).send({
        status: "success",
        data: response.data,
      });
    } catch (error) {
      res.status(200).send({
        status: "error",
        data: error?.response?.data?.error || null,
      });
    }
  }

  res.status(404).send();
}
