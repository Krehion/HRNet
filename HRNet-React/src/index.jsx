import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./components/router/AppRouter.jsx";
import "./style/style.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<AppRouter />
	</React.StrictMode>
);
