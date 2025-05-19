"use client";
import FrameA from "@/components/FrameA";
import HeaderCmp from "@/components/header";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/providers";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useSearchParams } from "next/navigation";
import { Suspense, useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import LoadingPage from "../loading";
import Notfound from "../not-found";
import Grid from "./minimap";
import Modal from "./seatmodal";

export interface matrixElement {
  islocked: boolean;
  reference: string;
  seatNumber: string;
  fare: number;
}
export interface ShowType {
  movie: string;
  theatre: string;
  time: Date;
  seatmatrix: matrixElement[][];
}

interface IshowType {
  showdetails: ShowType;
  success: boolean;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_SECRET);

const SeatSelection = () => {
  const searchParam = useSearchParams();
  const [selectedSeat, setselectedSeat] = useState<any[]>([]);
  const search = searchParam.get("search");
  const containerRef = useRef(null);
  const [visibleRows, setVisibleRows] = useState([]);
  const { seatCount, setSeatCount, loggedIn, setShowModal, showModal } =
    useContext(AuthContext);

  const createCheckOutSession = async () => {
    if (!loggedIn) return toast("login first");
    const stripe = await stripePromise;

    const checkoutSession = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/v1/checkout`,
      {
        item,
        search,
        selectedSeat,
      },
      { withCredentials: true }
    );
    if (checkoutSession.data.message == "locked")
      return toast("plz refresh page once before booking");
    const result = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  };
  const handleSeatCountSelect = (count) => {
    setSeatCount(count);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [item, setItem] = useState({
    name: "ddlj",
    description: "Latest movie",
    image:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    quantity: 0,
    fare: 0,
  });

  const { data: showdesc, isLoading } = useQuery<IshowType>({
    queryFn: () =>
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/v1/findshowbyid`,
          {
            showId: search,
          }
        )
        .then((res) => res.data),

    queryKey: ["showId"],
  });

  if (isLoading) {
    return <LoadingPage />;
  }
  if (!showdesc.success) return <Notfound />;
  if (!showdesc) {
    return <div>Error fetching show details</div>;
  }

  return (
    <>
      <Grid rows={10} cols={25} />
      {showModal && (
        <Modal
          onClose={handleCloseModal}
          onSeatSelect={handleSeatCountSelect}
          seatCount={seatCount}
        />
      )}

      <div className="h-screen flex flex-col justify-between">
        <HeaderCmp
          details={showdesc.showdetails.theatre}
          seatCount={seatCount}
          setShowModal={setShowModal}
        />

        <div className="flex-grow flex justify-center items-center">
          <FrameA
            details={showdesc.showdetails}
            selectedSeat={selectedSeat}
            setselectedSeat={setselectedSeat}
            setItem={setItem}
            item={item}
          />
        </div>

        <div className="flex justify-center items-center">
          {selectedSeat.length === seatCount && (
            <Button
              className="bg-pink-700 lg:px-[170px] px-[120px] py-[17px]"
              onClick={createCheckOutSession}
            >
              Proceed with {item.fare}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

const Pagee = () => (
  <Suspense fallback={<LoadingPage />}>
    <SeatSelection />
  </Suspense>
);
export default Pagee;
