import React from 'react';

function TimelineItem({ data }) {
    return (
        <div className="timeline-item">
            <div className="timeline-item-content">
                <span className="date">{data.date}</span>
                <p>{data.event}</p>
                <span className="circle" />
            </div>
        </div>
    );
}

export default TimelineItem;
