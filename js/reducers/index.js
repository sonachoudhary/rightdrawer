import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import drawer from "./drawer";
import driver from "./driver";
import trainer from "./trainer";
import customer from "./customer";
import entrypage from "./entrypage";
import network from "./network";
import basicAppConfig from "./basicAppConfig";
import viewStore from "./viewStore";
import all from "./all";
import chat from "./chat";
import app from "./app";

export default combineReducers({
  drawer,
  entrypage,
  form,
  driver,
  trainer,
  customer,
  network,
  basicAppConfig,
  viewStore,
  all,
  chat,
  app
});
