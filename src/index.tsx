import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from 'react-hot-loader';

// redux store
import { Provider } from "react-redux"
import initStore from "./store/root/store"
import setUpAxiosInterceptors from "store/utils/axios_interceptor";

import App from "./app"
import "store/utils/socket.io"

setUpAxiosInterceptors(() => console.log("axios error"))

const store = initStore()
const render = () =>
  ReactDOM.render(
    <div>
      <AppContainer>
        <Provider store={store}>
          <div>
            <App />
          </div>
        </Provider>
      </AppContainer>
    </div>
    ,
    document.getElementById("root")
  );

render()