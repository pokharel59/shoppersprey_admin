import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';

const DashboardOverview = () => {
  // Replace these dummy data with actual data from your backend or state management
  const totalSales = 2456;
  const totalOrders = 156;
  const totalRevenue = 13425.5;
  const topSellingProducts = [
    { id: 1, name: 'Product A', sales: 45, revenue: 678 },
    { id: 2, name: 'Product B', sales: 34, revenue: 567 },
    { id: 3, name: 'Product C', sales: 28, revenue: 489 },
    // Add more products as needed
  ];

  return (
    <div className="flex flex-col items-center mt-2">
      <div className="flex items-center mb-4">
        <h1 className="text-2xl font-bold ml-0">Dashboard</h1>
      </div>
      <div className="max-w-6xl p- bg-white rounded-lg overflow-x-auto flex justify-between">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card className="p-4">
              <CardContent>
                <Typography variant="h6" component="h2">
                  Total Sales
                </Typography>
                <Typography variant="h4" color="primary">
                  {totalSales}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className="p-4">
              <CardContent>
                <Typography variant="h6" component="h2">
                  Total Orders
                </Typography>
                <Typography variant="h4" color="primary">
                  {totalOrders}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className="p-4">
              <CardContent>
                <Typography variant="h6" component="h2">
                  Total Revenue
                </Typography>
                <Typography variant="h4" color="primary">
                  ${totalRevenue.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className="p-4">
              <CardContent>
                <Typography variant="h6" component="h2">
                  Top Selling Products
                </Typography>
                <ul className="list-disc list-inside mt-2">
                  {topSellingProducts.map((product) => (
                    <li key={product.id}>
                      <Typography variant="body1">
                        {product.name} - Sales: {product.sales}, Revenue: $
                        {product.revenue.toFixed(2)}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default DashboardOverview;
