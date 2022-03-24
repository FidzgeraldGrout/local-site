import { observer } from "mobx-react-lite";
import React from "react";
// import { useEffect } from 'react';
import { useStore } from "../hight/StoreProvider";

const FLoadingScreen = observer(function FLoadingScreen() {

    const mobxUI = useStore().MOBXui;

    // useEffect(() => {

    // });

    return (
        <div 
        className={`absolute z-50 flex items-center justify-center w-full h-full bg-color_C/50 ${mobxUI.isLoading ? 'block' : 'hidden'}`}
        />
    );
});

export default FLoadingScreen;