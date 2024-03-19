import axios from "axios";
export const checkAuth = async () => {
  axios.defaults.withCredentials = true;
  const res = await axios.get("http://localhost:5000/api/checkAuth", {
    withCredentials: true,
  });
  const data = await res.data;
  console.log("The data from logout is : ", data);
  return data.success;
};
