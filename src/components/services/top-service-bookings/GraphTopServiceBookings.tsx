import { Mix } from '@ant-design/charts';
import useFetchTopServiceBookings from 'common/stores/services/service-bookings';
import useFetchTopTenServices from 'common/stores/services/top-ten-services';
import { take } from 'lodash';
import React, { useEffect, useState } from 'react';

const GraphTopTenServiceBookings = () => {
  const { topServiceBookings } = useFetchTopServiceBookings();
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    if (topServiceBookings) {
      const topTen = take(topServiceBookings, 10);

      const formatDataForGraph = () => {
        const dataFormat = topTen.map((service: any) => {
          return {
            service_name: service.service_name,
            revenue: service.revenue / 1000000,
            booking: service.total,
            debit: service.debit,
            customer_paid: service.customer_paid,
          };
        });
        setData(dataFormat);
      };
      formatDataForGraph();
    }
  }, [topServiceBookings]);

  const config = {
    appendPadding: 8,

    tooltip: {
      shared: true,
    },

    syncViewPadding: true,
    plots: [
      {
        type: 'column',
        options: {
          data: [
            ...data.map((service) => ({
              service_name: service.service_name,
              value: service.debit,
              type: 'Công nợ',
            })),
            ...data.map((service) => ({
              service_name: service.service_name,
              value: service.customer_paid,
              type: 'Thực thu',
            })),
          ],

          isStack: true,
          xField: 'service_name',
          yField: 'value',
          xAxis: false,

          seriesField: 'type',
          meta: {
            date: {
              sync: true,
            },
            value: {
              alias: '',
              // formatter: (v) => `${(v * 100).toFixed(1)}%`,
              formatter: (datum: any) => {
                // Customize the tooltip content here
                return `${datum / 1000000}`;
              },
            },
          },
          label: false,

          color: ['#D8315B', '#5A68ED', '#34B764'],
        },
      },
      {
        type: 'line',
        options: {
          data: data.map((service) => ({
            service_name: service.service_name,
            value: service.booking,
          })),
          xField: 'service_name',
          yField: 'value',
          xAxis: false,

          yAxis: {
            line: null,
            grid: null,
            position: 'right',
            // max: 0.16,
            tickCount: 8,
          },
          meta: {
            date: {
              sync: 'date',
            },
            value: {
              alias: 'Số bookings',
              // formatter: (v) => `${(v * 100).toFixed(1)}%`,
            },
          },
          point: {
            size: 5,
            shape: 'circle',
            style: {
              fill: '#99E5B5',
              stroke: '#99E5B5',
              lineWidth: 3,
            },
          },
          smooth: true,

          label: {
            callback: (value: any) => {
              return {
                style: {
                  fill: '#000000',
                  fontWeight: 700,
                  // stroke: '#99E5B5',
                  lineWidth: 1,
                },
              };
            },
          },
          color: '#1AAF8B',
        },
      },
    ],
  };
  return <Mix {...(config as any)} />;
};

export default GraphTopTenServiceBookings;
