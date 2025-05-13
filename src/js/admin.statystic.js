import ApexCharts from 'apexcharts';
import { getAllUsers } from "../services/users/request.js";
import { checkadminuser } from "../components/header.js";
checkadminuser()
document.addEventListener('DOMContentLoaded', () => {
  const options = {
    chart: {
      type: 'line',
      height: 350
    },
    series: [{
      name: 'Sifariş Faizi',
      data: [23, 45, 31, 60, 70, 55, 68, 80, 72, 90, 95, 100]
    }],
    xaxis: {
      categories: [
        'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun',
        'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
      ]
    },
    stroke: {
      curve: 'smooth'
    },
    dataLabels: {
      enabled: true
    },
    title: {
      text: '2025-ci il üzrə aylıq sifariş faizləri',
      align: 'center'
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: {
        formatter: val => val + '%'
      },
      title: {
        text: 'Faiz'
      }
    }
  };

  const chart = new ApexCharts(document.querySelector("#orderChart"), options);
  chart.render();
});