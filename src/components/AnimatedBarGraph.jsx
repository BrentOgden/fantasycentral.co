import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function AnimatedBarGraph() {
    const options = {
        chart: {
            type: 'line',
            animation: Highcharts.svg // Enable animation
        },
        title: {
            text: 'CORRECT PICKS LAST WEEK'
        },
        xAxis: {
            categories: ['14-16 correct', '11-13 correct', '8-10 correct', '5-7 correct', 'Less than 5 correct']
        },
        yAxis: {
            title: {
                text: 'Correct Picks'
            }
        },
        series: [{
            name: 'Correct Picks',
            data: [0, 1, 5, 1, 5],
            dataLabels: {
                enabled: true,
                color: '#FFFFFF',
                align: 'right',
                text: 2,
                
                y: 10
            },
            color: 'darkred',
            borderColor: 'rgba(255, 99, 132, 1)'
        }]
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    );
}

export default AnimatedBarGraph;
