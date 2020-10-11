import React from 'react';
import './index.css';
import './Components/css/styles.css';
import 'bootstrap/dist/css/bootstrap.css';

import { render } from "react-dom";
import * as serviceWorker from './serviceWorker';
import App from './App';
import Footer from './Components/Footer';


render([<App key="1" />, <Footer key="2" />], document.getElementById("root"));
serviceWorker.unregister();