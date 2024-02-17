import { useDispatch } from "react-redux";
import DashBoard from "./components/DashboardC/Dashboard";
import { setData } from "./redux/TableSlice";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        dispatch(setData(response.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dispatch]);

  return (
    <>
      <DashBoard />
    </>
  );
}

export default App;
