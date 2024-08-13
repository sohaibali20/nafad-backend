import Event from '../models/event.model.js';
import User from '../models/user.model.js';
import moment from 'moment';

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


// Generate Ticket for an event
const generateTicket = async (req, res) => {
  try {
    const { name } = req.params;
    const { category, price } = req.body;

    const event = await Event.findOne({ name });
    if (!event) {
      return res.status(404).send({ message: 'Event not found' });
    }

    const newTicket = {
      category,
      price,
    };

    event.tickets.push(newTicket);
    await event.save();

    res.status(201).send(event);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};


//Get Total Tickets Sold on a specific Date
const getTotalTicketsSoldOnDate = async (req, res) => {
  try {
    const { date } = req.params;
    const events = await Event.find();

    let totalTicketsSold = 0;
    const targetDate = new Date(date);

    events.forEach(event => {
      event.tickets.forEach(ticket => {
        if (moment(ticket.purchaseDate).isSame(targetDate, 'day')) {
          totalTicketsSold += 1;
        }
      });
    });

    const formattedDate = moment(date).format('YYYY-MM-DD');
    const day = moment(date).day();

    res.send({
      totalTicketsSold,
      date: formattedDate,
      day
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Sell a ticket
const sellTicket = async (req, res) => {
  try {
    const { name, buyerEmail } = req.params;
    const { category } = req.body;

    // Find the event by name and User By Email
    const event = await Event.findOne({ name });
    if (!event) {
      return res.status(404).send({ message: 'Event not found' });
    }

    const buyer = await User.findOne({ email: buyerEmail });
    if (!buyer) {
      return res.status(404).send({ message: 'Buyer not found' });
    }

    // Find an unsold ticket
    const ticket = event.tickets.find(ticket => !ticket.soldStatus && ticket.category === category);
    if (!ticket) {
      return res.status(400).send({ message: `No available tickets in category ${category}` });
    }

    // Update the ticket's soldStatus, buyer, and purchasedDate
    ticket.soldStatus = true;
    ticket.buyer = buyer._id;
    ticket.purchaseDate = Date.now();

    // Add the ticketId to the buyer's tickets array
    buyer.tickets.push(ticket._id);

    // Save the updated user
    await buyer.save();

    // Save the updated event
    await event.save();

    res.status(200).send(event);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};







export { createEvent, getEvents, getEventByName, getEventStats, updateEvent, deleteEvent, getTotalTicketsSoldOnDate, generateTicket, sellTicket };