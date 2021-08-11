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
            var klength = kdata.length
            await this.setState({ kmeans: data });
            const kmean_data = {
              labels: ['Good', 'Fair', 'Very Good', 'Poor', 'Excellent'],
                datasets: [
                    {
                        label: ['Good', 'Fair', 'Very Good', 'Poor', 'Excellent'],
                        data: [(kdata.filter(k => k==0).length/klength)*100,(kdata.filter(k => k==1).length/klength)*100,(kdata.filter(k => k==2).length/klength)*100, (kdata.filter(k => k==3).length/klength)*100, (kdata.filter(k => k==4).length/klength)*100],
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
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              var dataset = data.datasets[tooltipItem.datasetIndex];
              var meta = dataset._meta[Object.keys(dataset._meta)[0]];
              var total = meta.total;
              var currentValue = dataset.data[tooltipItem.index];
              var percentage = parseFloat((currentValue/total*100).toFixed(1));
              return currentValue + ' (' + percentage + '%)';
            },
            title: function(tooltipItem, data) {
              return data.labels[tooltipItem[0].index];
            }
          }
        }
      }
        return (
        <div className="chart pie-chart">
            {this.state.data ? (<>{console.log(this.state.data)}<Pie data={this.state.data} options={options} /></>): ""}
        </div>
        );
    }
}
