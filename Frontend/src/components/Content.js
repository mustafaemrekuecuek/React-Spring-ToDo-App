import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Home";
import Navbar from "./Navbar";

export default function Content({date}) {
    const today = new Date();
    const tomorrow = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));

    date = {
        date: date,
        content: ""        
    };

    function isSameDate(date1, date2) {
        if(!date1 || !date2) {
            return false;
        }
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    }

    if(isSameDate(date.date, today)){
        date.content = "Heute";
    } else if (isSameDate(date.date,tomorrow)){
        date.content = "Morgen";
    }

    return (
        <div>
            <Navbar />
            <div style={{ marginLeft: '200px' }}> {/* Verschieben des Inhalts nach rechts */}
            <Home date={date}/>
            </div>
        </div>
    )
}