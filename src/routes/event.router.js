import {Router} from 'express';
import { createEvent, getEvents, getEventByName, getEventStats, updateEvent, deleteEvent, getTotalTicketsSoldOnDate, generateTicket, sellTicket } from '../controllers/event.controller.js';

const eventRouter = Router();

eventRouter.route("/create").post(createEvent);

eventRouter.route("/").get(getEvents);

eventRouter.route("/:name").get(getEventByName);

eventRouter.route("/stats").get(getEventStats);

eventRouter.route("/update/:name").put(updateEvent);

eventRouter.route("/delete/:name").delete(deleteEvent);

eventRouter.route("/tickets-sold/:date").get(getTotalTicketsSoldOnDate);

eventRouter.route("/generate-ticket/:name").post(generateTicket);

eventRouter.route("/sell-ticket/:name/:buyerEmail").post(sellTicket);



export default eventRouter;