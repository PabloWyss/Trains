import Section from "./section.jsx";
import React, {createRef, useState, useEffect, Component} from "react"

type ConnectionProps = {
  connection: {
    duration: string;
    transfers: number;
    sections: {
      departure: {
        departure: string;
        platform: string;
        delay: string;
      };
      journey: {
        passList: {
          location: { name: string };
          arrival: string;
        }[];
      };
    }[];
  };
}


const Connection = ({ connection }: ConnectionProps) => {
  return (
    <div className="grid grid-cols-2 gap-">
      <p>Duration</p>
      <p>{connection.duration}</p>
      <p>transfers</p>
      <p>{connection.transfers}</p>
      {connection.sections.map((section, index) => (
        <Section key={index} section={section} />
      ))}
    </div>
  );
};

export default Connection;