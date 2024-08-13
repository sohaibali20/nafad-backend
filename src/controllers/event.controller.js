import Event from '../models/event.model.js';

// Create a new event
const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.send(events);
  } catch (error) {
    res.status(500).send(error);
    }
};

// Get a single event
const getEventByName = async (req, res) => {
  try {
    const name = req.params.name;
    const event = await Event.findOne({name});
    if (!event) {
      return res.status(404).send({ message: 'Event not found' });
    }
    res.send(event);
  } catch (error) {
    res.status(500).send(error);
  }
};

//Get Event Stats
const getEventStats = async (req, res) => {
  try {
    const events = await Event.find();
    let totalAttendees = 0;
    let totalRevenue = 0;
    let totalExpenditure = 0;
    let totalProfit = 0;
    let totalTicketPrice = 0;
    let totalEvents = events.length;
    events.forEach((event) => {
      totalAttendees += event.attendance.length;
      totalRevenue += event.revenue;
      totalExpenditure += event.expenditure;
      totalProfit += event.revenue - event.expenditure;
      totalTicketPrice += event.ticketPrice;
    });
    const avgTicketPrice = totalTicketPrice / totalEvents;
    res.send({
      totalAttendees,
      totalRevenue,
      totalExpenditure,
      totalProfit,
      avgTicketPrice,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

//Update an event
const updateEvent = async (req, res) => {
  try {
    const name = req.params.name;
    const event = await Event.findOneAndUpdate({name}, req.body,{new: true, runValidators: true});
    if (!event) {
      return res.status(404).send({ message: 'Event not found' });
    }
    await event.save();
    res.send(event);
    } catch (error) {
    res.status(400).send({error: error.message});
    }
};

//Delete an event
const deleteEvent = async (req, res) => {
  try {
    const  name = req.params.name;
    const event = await Event.findOneAndDelete({name});
    if (!event) {
      return res.status(404).send({ message: 'Event not found' });
    }
    res.send(event);
  } catch (error) {
    res.status(500).send(error);
  }
};







export { createEvent, getEvents, getEventByName, getEventStats, updateEvent, deleteEvent };