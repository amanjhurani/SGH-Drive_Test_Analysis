import React from 'react';
import 'chartjs/chart.js'
import { getKMeans } from '../../api/getData';
import { Pie } from 'react-chartjs-2';
export default class KmeanPie extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            kmeans: [],
            position: [],
            colors: ['#6ace61'],
            values: [],
            greenOptions: { fillColor: 'blue' },
        };
    }
    componentDidMount() {
        getKMeans(localStorage.getItem('current_file')).then(async (res) => {
            var data = res.data;
            var kdata = data.map((kmean) => {
                 return kmean.label
            })
            await this.setState({ kmeans: data });
            const kmean_data = {
                datasets: [
                    {
                        label: ['Good', 'Fair', 'Very Good', 'Poor', 'Excellent'],
                        data: [kdata.filter(k => k==0).length,kdata.filter(k => k==1).length,kdata.filter((k) => k==2).length, kdata.filter((k) => k==3).length, kdata.filter((k) => k==4).length],
                        backgroundColor: [
                            'blue',
                            '#ffff00',
                            '#a6ff4d',
                            '#ff0000',
                            '#248f24'
                          ], 
                    }
                ],
            };
            this.setState({data: kmean_data})
        });
    }
    render() {
        const options = {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          };
        return (
        <div className="chart pie-chart">
            {this.state.data ? (<>{console.log(this.state.data)}<Pie data={this.state.data} /></>): ""}
        </div>
        );
    }
}
