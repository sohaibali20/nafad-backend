import DailySales from "../models/dailysales.model.js";
import Event from "../models/event.model.js";
import moment from "moment";

// Create a new daily sale
const createDailySale = async (req, res) => {
  try {
    const dailySale = new DailySales(req.body);
    await dailySale.save();
    res.status(201).send(dailySale);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all daily sales
const getDailySales = async (req, res) => {
  try {
    const dailySales = await DailySales.find();
    res.send(dailySales);
  } catch (error) {
    res.status(500).send(error);
    }
}

// Get dailysales for this week
const getDailySalesForThisWeek = async (req, res) => {
  try {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
    const dailySales = await DailySales.find({
      date: {
        $gte: startOfWeek,
        $lte: endOfWeek,
      },
    });
    res.send(dailySales);
  } catch (error) {
    res.status(500).send(error);
  }
};


// Get total tickets sold on a specific date
const storeTotalTicketsSoldOnDate = async (req, res) => {
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
      const day = moment(date).day(); // Get the day
  
      // Create a new DailySales document
      const dailySales = new DailySales({
        date: formattedDate,
        day: day,
        totalSales: totalTicketsSold
      });
  
      // Save the document to the database
      await dailySales.save();
      res.status(201).send(dailySales);
  
    } catch (error) {
      res.status(500).send(error);
      console.log(error);
    }
  };

  //Update Daily Sales value
  const updateDailySale = async (req, res) => {
    try {
        const { date } = req.params;
        const dailySale = await DailySales.findOneAndUpdate({ date }, req.body, { new: true });

        if (!dailySale) {
            return res.status(404).send({ message: 'Daily Sale not found' });
        }

        res.send(dailySale);
    } catch (error) {
        res.status(500).send(error);
    }
}

  //Delete Daily Sale
const deleteDailySale = async (req, res) => {
    try {
      const { date } = req.params;
      const dailySale = await DailySales.findOneAndDelete({ date });
  
      if (!dailySale) {
        return res.status(404).send({ message: 'Daily Sale not found' });
      }
  
      res.send(dailySale);
    } catch (error) {
      res.status(500).send(error);
    }
};

  export { createDailySale, getDailySales, getDailySalesForThisWeek, storeTotalTicketsSoldOnDate, updateDailySale, deleteDailySale };

