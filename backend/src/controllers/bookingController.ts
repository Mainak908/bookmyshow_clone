import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { stripe } from "../index";
import ShowCreate from "../models/Show";
import Booking from "../models/booking";
export interface Ijwt {
  _id: string;
  name: string;
  email: string;
  picture: string;
  iat: number;
  exp: number;
}
export const checkout = async (req: Request, res: Response) => {
  try {
    const { item, search, selectedSeat } = req.body;

    const { accessToken } = req.cookies;

    const { _id: userid } = jwt.decode(accessToken) as Ijwt;
    if (!userid) return;

    const transformedItem = {
      price_data: {
        currency: "inr",
        unit_amount: (item.fare * 100) / item.quantity, //TODO:
        product_data: {
          images: [item.image],
          name: item.name,
          description: item.description,
        },
      },
      quantity: item.quantity,
    };
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [transformedItem],
      mode: "payment",
      success_url: `${process.env.CORSORIGIN}/success`,
      cancel_url: `${process.env.CORSORIGIN}/failed`,

      metadata: {
        images: item.image,
        Showid: search,
        seat: JSON.stringify(selectedSeat),
        userid,
      },
    });
    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};

export const webHookfn = async (req: Request, res: Response) => {
  let event;
  const endpointSecret = process.env.WEBHOOKSECRET!;
  const sig = req.headers["stripe-signature"];
  if (typeof sig !== "string") return;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (error) {
    console.log("Error verifying webhook signature: ", error);
    return res.sendStatus(400);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const details: any = event.data.object.metadata;

        const seatNumber = JSON.parse(details.seat);
        const showId = details.Showid;
        const userId = details.userid;

        const showFind = await ShowCreate.findById(showId);

        const newBooking = new Booking({
          user: mongoose.Types.ObjectId.createFromHexString(userId),
          seatNumber,
        });

        const newbooksave = await newBooking.save();

        const updatePromises = seatNumber.map((seatNumber: any) => {
          const i = seatNumber[0];
          const j = seatNumber[1];

          const updateConditions = {
            _id: showFind?._id,
            [`seatmatrix.${i}.${j}.reference`]: { $exists: false },
          };

          const updateOperation = {
            //!TODO:
            $set: {
              [`seatmatrix.${i}.${j}.reference`]: newbooksave._id,
            },
          };

          return ShowCreate.updateOne(updateConditions, updateOperation, {
            upsert: true,
          });
        });

        Promise.all(updatePromises)
          .then((results) => {
            results.forEach((result) => {
              console.log("database booked done");
            });
          })
          .catch((err) => {
            console.error(err);
          });

        res.status(201).json({ newBooking, showFind });
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.log("phirse error", error);
  }

  res.send();
};
