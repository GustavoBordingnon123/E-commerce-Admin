"use client";

import { useEffect, useState } from "react";

import { StoreModal } from "@/components/modals/store.modal";

export const ModalProvider = () => {
    const [IsMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!IsMounted){
        return null;
    }

    return(
        <StoreModal />
    );
}