import palette from '../../../../theme/palette';
import numeral from 'numeral'

export const options = {
  responsive: true,
  maintainAspectRatio: true,
  animation: false,
  legend: { display: true },
  cornerRadius: 20,
  tooltips: {
    callbacks: {
        label: function(tooltipItem, data) {
              return numeral(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]).format('0,0');
         }
    },
    enabled: true,
    mode: 'index',
    intersect: false,
    borderWidth: 1,
    borderColor: palette.divider,
    backgroundColor: palette.white,
    titleFontColor: palette.text.primary,
    bodyFontColor: palette.text.secondary,
    footerFontColor: palette.text.secondary
  },
  layout: { padding: 0 },
  scales: {
    xAxes: [
      {
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0,
        categoryPercentage: 0,
        ticks: {
          fontColor: palette.text.secondary,
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    // yAxes: [
    //   {
    //     ticks: {
    //       fontColor: palette.text.secondary,
    //       beginAtZero: false,
    //       // min: 0,
    //       callback(value) {
    //         // you can add your own method here (just an example)
    //         return Number(value).toLocaleString('en')
    //       }
    //     },
    //     gridLines: {
    //       borderDash: [2],
    //       borderDashOffset: [2],
    //       color: palette.divider,
    //       drawBorder: false,
    //       zeroLineBorderDash: [2],
    //       zeroLineBorderDashOffset: [2],
    //       zeroLineColor: palette.divider
    //     }
    //   }
    // ]
  }
};
