import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "./StoreProvider";

const LoadingScreen = observer(function FLoadingScreen() {

    const mobxUI = useStore().MOBXui;

    return (
        <div 
        className={`absolute z-50 flex items-center justify-center w-full h-full bg-color_C/50 ${mobxUI.isLoading ? 'block' : 'hidden'}`}
        />
    );
});

export default LoadingScreen;