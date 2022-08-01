import axios from "axios";

export const fetchUser = async () => {
  try {
    const res = await axios.get("http://localhost:3000/user");

    const result = await Promise.resolve(res.data);
    console.log(result);
    return result[0];
  } catch (e) {
    console.error(e);
  }
};
