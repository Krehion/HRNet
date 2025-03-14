import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./utils/router/AppRouter.jsx";
import { Provider } from "jotai";
import "./style/style.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider>
			<AppRouter />
		</Provider>
	</React.StrictMode>
);
