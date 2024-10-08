import { Router } from "express";

import {createDailySale, getDailySales, getDailySalesForThisWeek, storeTotalTicketsSoldOnDate, updateDailySale, deleteDailySale, incrementDailySales} from "../controllers/dailysales.controller.js";

const dailySalesRouter = Router();

dailySalesRouter.route("/create").post(createDailySale);

dailySalesRouter.route("/create/:date").post(storeTotalTicketsSoldOnDate);

dailySalesRouter.route("/").get(getDailySales);

dailySalesRouter.route("/this-week").get(getDailySalesForThisWeek);

dailySalesRouter.route("/update/:id").put(updateDailySale);

dailySalesRouter.route("/delete/:id").delete(deleteDailySale);

dailySalesRouter.route("/increment").post(incrementDailySales);


export default dailySalesRouter;