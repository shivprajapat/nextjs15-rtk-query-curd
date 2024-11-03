"use client";
// import { add } from "@/lib/store/features/cartSlice";
import { AppStore, makeStore } from "@/store";
import { useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    // storeRef.current.dispatch(add({ id: 1, name: "test" }));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
