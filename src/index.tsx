import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from 'react-hot-loader';

// redux store
import { Provider } from "react-redux"
import initStore from "./store/root/store"

import App from "./app"

const store = initStore()
const render = Component =>
  ReactDOM.render(
    <div>
      <AppContainer>
        <Provider store={store}>
          <div>
            <Component />
          </div>
        </Provider>
      </AppContainer>
    </div>
    ,
    document.getElementById("root")
  );

render(App)