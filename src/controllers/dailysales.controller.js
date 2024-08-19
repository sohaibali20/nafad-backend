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
    const endOfWeek = new Date(today);

    // Set startOfWeek to the previous Sunday
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    // Set endOfWeek to the next Saturday
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

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


//Increment daily sales amount of the current day by 1 when api is called after every sale
const incrementDailySales =  async () => {
  try {
      const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
      const currentDay = new Date().getDay();

      // Check if an entry with the current date already exists
      const existingEntry = await DailySales.findOne({ date: currentDate });

      if (existingEntry) {
          // If entry exists, update the daily sales amount
          existingEntry.totalSales += 1;
          await existingEntry.save();
          res.json('Daily Sale was updated');
      } else {
          // If no entry exists, create a new daily sale entry
          const newDailySale = new DailySales({
              date: currentDate,
              day: currentDay,
              totalSales: 1
          });
          await newDailySale.save();
          console.log('New Daily Sale entry was created');
      }
  } catch (err) {
      console.error(err.message);
  }
};

  export { createDailySale, getDailySales, getDailySalesForThisWeek, storeTotalTicketsSoldOnDate, updateDailySale, deleteDailySale, incrementDailySales };

