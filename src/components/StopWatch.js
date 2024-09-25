import React, { useState, useEffect } from "react";
import "./StopWatch.css";
import Lap from "./Lap";
export default function StopWatch() {
const [seconds, setSeconds] = useState(0);
const [minutes, setMinutes] = useState(0);
const [hours, setHours] = useState(0);
const [miliSeconds, setMiliSeconds] = useState(0);
const [activities, setActivities] = useState([]);
const [isActive, setIsActive] = useState(false);
const formatWithLeadingZero = (number) => {
if (number < 10) return "0" + number;
else return number.toString();
};
useEffect(() => {
let interval;
if (isActive) {
interval = setInterval(() => {
setMiliSeconds((miliSeconds) => {
if (miliSeconds >= 99) {
setSeconds((seconds) => {
if (seconds >= 59) {
setMinutes((minutes) => {
if (minutes >= 59) {
setHours((prevHours) => prevHours + 1);
return 0;
} else {
return minutes + 1;
}
});
return 0;
} else {
return seconds + 1;
}
});
return 0;
} else {
return miliSeconds + 1;
}
});
}, 10);
}
return () => clearInterval(interval);
}, [isActive]);
const handleStart = () => {
setIsActive(true);
};
const handlePause = () => {
setIsActive(false);
};
const handleLap = () => {
const lapTime =formatWithLeadingZero(hours) +
":" +
formatWithLeadingZero(minutes) +
":" +
formatWithLeadingZero(seconds) +
"." +
formatWithLeadingZero(miliSeconds);
setActivities((prevLaps) => [...prevLaps, lapTime]);
};
const handleReset = () => {
setIsActive(false);
setMiliSeconds(0);
setSeconds(0);
setMinutes(0);
setHours(0);
setActivities([]);
};
return (
<div className="container">
<div className="timeDisplay">
{formatWithLeadingZero(hours)} : {formatWithLeadingZero(minutes)} :{" "}
{formatWithLeadingZero(seconds)} : {formatWithLeadingZero(miliSeconds)}
</div>
<div className="buttons">
<button
className="btn"
onClick={handleStart}
disabled={isActive}
style={{ cursor: isActive ? "not-allowed" : "pointer" }}
>
Start
</button>
<button className="btn" onClick={handlePause}>
Pause
</button>
<button className="btn" onClick={handleLap}>
Activity
</button>
<button className="btn" onClick={handleReset}>
Reset
</button>
</div>
<Lap laps={activities} />
</div>
);
}