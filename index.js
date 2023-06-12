const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3001;

mongoose
  .connect(
    "mongodb+srv://admin123:admin123@zuitt-bootcamp.cnhvgta.mongodb.net/nestle_stock_historical_price?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to the cloud database"))
  .catch((error) => console.error("Connection error:", error));

const stockPriceSchema = new mongoose.Schema({
  Date: String,
  OpenPrice: Number,
  HighPrice: Number,
  LowPrice: Number,
  ClosePrice: Number,
  WAP: Number,
  "No.ofShares": Number,
  "No.ofTrades": Number,
  "TotalTurnover(Rs.)": Number,
  DeliverableQuantity: Number,
  "%Deli.QtytoTradedQty": Number,
  SpreadHighLow: Number,
  SpreadCloseOpen: Number,
});

const StockPrice = mongoose.model(
  "StockPrice",
  stockPriceSchema,
  "nestle_stock_prices"
);

app.get("/", (req, res) => {
  res.send("Hello, welcome to the backend of our application");
});

app.get("/stockprices", (req, res) => {
  StockPrice.find({})
    .exec()
    .then((result) => {
      return res.status(200).json({
        data: result,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    });
});

app.listen(port, () => console.log(`Server running at port ${port}`));
