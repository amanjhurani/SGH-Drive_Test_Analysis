import React from 'react';
import 'chartjs/chart.js'
import { getKMeans } from '../../api/getData';
import { Scatter } from 'react-chartjs-2';
export default class KmeansChart extends React.PureComponent {
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
            await this.setState({ kmeans: data });
            const kdata = {
                datasets: [
                    {
                        label: '0',
                        data: this.state.kmeans.map((kmean) => {
                               if(kmean.label == 0) {
                                return {x: kmean.active_ecio, y: kmean.active_rscp}
                               }
                                
                        }).filter(km => km!=undefined),
                        backgroundColor: 'blue',
                    },
                    {
                        label: '1',
                        data: this.state.kmeans.map((kmean) => {
                               if(kmean.label == 1) {
                                return {x: kmean.active_ecio, y: kmean.active_rscp}
                               }
                                
                        }).filter(km => km!=undefined),
                        backgroundColor: '#ffff00',
                    },
                    {
                        label: '2',
                        data: this.state.kmeans.map((kmean) => {
                               if(kmean.label == 2) {
                                return {x: kmean.active_ecio, y: kmean.active_rscp}
                               }
                                
                        }),
                        backgroundColor: '#a6ff4d',
                    },
                    {
                        label: '3',
                        data: this.state.kmeans.map((kmean) => {
                               if(kmean.label == 3) {
                                return {x: kmean.active_ecio, y: kmean.active_rscp}
                               }
                                
                        }).filter(km => km!=undefined),
                        backgroundColor: '#ff0000', //fixed
                    },
                    {
                        label: '4',
                        data: this.state.kmeans.map((kmean) => {
                               if(kmean.label == 4) {
                                return {x: kmean.active_ecio, y: kmean.active_rscp}
                               }
                                
                        }).filter(km => km!=undefined),
                        backgroundColor: '#248f24', //fixed
                    }
                ],
            };
            this.setState({data: kdata})
        });
    }
    getColor(kmeans) {
        if (kmeans < 0 && Number(kmeans) > -60) {
            return '#6ace61';
        } else if (kmeans < -60 && kmeans > -75) {
            return '#fbfb43';
        } else if (kmeans < -75 && Number(kmeans) > -85) {
            return '#f7ba30';
        } else if (kmeans < -85 && Number(kmeans) > -95) {
            return '#ec031d';
        } else if (kmeans < -95 && Number(kmeans) > -124) {
            return '#ab0312';
        }
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
        <div className="chart">
            {this.state.data ? (<>{console.log(this.state.data)}<Scatter data={this.state.data} options={options} /></>): ""}
        </div>
        );
    }
}
