"use client";
import FrameA from "@/components/FrameA";
import HeaderCmp from "@/components/header";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import LoadingPage from "../loading";

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

const stripePromise = loadStripe(
  "pk_test_51O07tpSC4QlQZ4KyvCIAcKoXHmhRZt4zXs1c03fAPYkErsN4SJ6LNtJpM13jJBvKOxaNwP9NeXGHTiANIZokrYtU00axKLOBrx"
);

const SeatSelection = () => {
  const createCheckOutSession = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await axios.post(
      "http://localhost:3001/api/v1/checkout",
      {
        item,
        search,
        selectedSeat,
      }
    );
    const result = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  };
  const searchParam = useSearchParams();
  const [showdesc, setshowdesc] = useState<ShowType | null>(null);
  const [selectedSeat, setselectedSeat] = useState<any[]>([]);
  const search = searchParam.get("search");

  const [item, setItem] = useState({
    name: "ddlj",
    description: "Latest movie",
    image:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    quantity: 0,
    fare: 0,
  });
  console.log(showdesc);

  const { data, isLoading } = useQuery({
    queryFn: () =>
      axios
        .post("http://localhost:3001/api/v1/findshowbyid", {
          showId: search,
        })
        .then((res) => res.data),

    queryKey: ["showId"],
  });

  useEffect(() => {
    if (data) {
      setshowdesc(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!showdesc) {
    return <div>Error fetching show details</div>;
  }

  return (
    <div className="h-screen flex flex-col justify-between">
      <HeaderCmp details={showdesc.theatre} />

      <div className="flex-grow flex justify-center items-center">
        <FrameA
          details={showdesc}
          selectedSeat={selectedSeat}
          setselectedSeat={setselectedSeat}
          setItem={setItem}
          item={item}
        />
      </div>

      <div className="flex justify-center items-center">
        {selectedSeat.length === 3 && (
          <Button
            className="bg-pink-700 px-[170px] py-[17px]"
            onClick={createCheckOutSession}
          >
            Proceed with {item.fare}
          </Button>
        )}
      </div>
    </div>
  );
};

const Pagee = () => (
  <Suspense fallback={<LoadingPage />}>
    <SeatSelection />
  </Suspense>
);
export default Pagee;
