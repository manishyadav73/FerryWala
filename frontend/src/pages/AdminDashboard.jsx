import AIInsightsPanel from "../components/AIInsightsPanel";
import LiveActivityFeed from "../components/LiveActivityFeed";
import NotificationCenter from "../components/NotificationCenter";
import {

    useEffect,
    useState

} from "react";

import {

    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    PieChart,
    Pie,
    Cell

} from "recharts";

import Navbar from "../components/Navbar";

function AdminDashboard() {

    const [stats, setStats] =
        useState({

            totalVendors: 0,

            totalOrders: 0,

            totalRevenue: 0,

            totalReviews: 0
        });

    // CHART DATA
    const revenueData = [

        {
            month: "Jan",
            revenue: 1200
        },

        {
            month: "Feb",
            revenue: 2100
        },

        {
            month: "Mar",
            revenue: 3200
        },

        {
            month: "Apr",
            revenue: 2800
        },

        {
            month: "May",
            revenue: 4600
        },

        {
            month: "Jun",
            revenue: 6200
        }
    ];

    const orderData = [

        {
            name: "Delivered",
            value: 70
        },

        {
            name: "Preparing",
            value: 20
        },

        {
            name: "Cancelled",
            value: 10
        }
    ];

    const COLORS = [

        "#22c55e",
        "#f59e0b",
        "#ef4444"
    ];

    useEffect(() => {

        const vendors = JSON.parse(

            localStorage.getItem(
                "registeredVendors"
            )

        ) || [];

        const orders = JSON.parse(

            localStorage.getItem(
                "vendorOrders"
            )

        ) || [];

        const reviews = JSON.parse(

            localStorage.getItem(
                "vendorReviews"
            )

        ) || [];

        // TOTAL REVENUE
        const revenue = orders.reduce(

            (sum, order) =>

                sum +
                (order.totalAmount || 0),

            0
        );

        setStats({

            totalVendors:
                vendors.length,

            totalOrders:
                orders.length,

            totalRevenue:
                revenue,

            totalReviews:
                reviews.length
        });

    }, []);

    return (

        <>

            <Navbar />

            <div className="admin-dashboard page-transition">

                <h1>
                    🛠️ Admin Dashboard
                </h1>

                {/* KPI GRID */}

                <div className="admin-grid">

                    <div className="admin-card">

                        <h2>
                            👨‍🍳 Total Vendors
                        </h2>

                        <p>
                            {stats.totalVendors}
                        </p>

                        <span>
                            Active street vendors
                        </span>

                    </div>

                    <div className="admin-card">

                        <h2>
                            📦 Total Orders
                        </h2>

                        <p>
                            {stats.totalOrders}
                        </p>

                        <span>
                            Orders processed
                        </span>

                    </div>

                    <div className="admin-card">

                        <h2>
                            💰 Total Revenue
                        </h2>

                        <p>
                            ₹ {stats.totalRevenue}
                        </p>

                        <span>
                            Platform earnings
                        </span>

                    </div>

                    <div className="admin-card">

                        <h2>
                            ⭐ Total Reviews
                        </h2>

                        <p>
                            {stats.totalReviews}
                        </p>

                        <span>
                            Customer feedback
                        </span>

                    </div>

                </div>

                {/* ANALYTICS */}

                <div className="dashboard-grid">

                    {/* REVENUE CHART */}

                    <div className="analytics-card">

                        <h2>
                            📈 Revenue Growth
                        </h2>

                        <ResponsiveContainer
                            width="100%"
                            height={320}
                        >

                            <AreaChart
                                data={revenueData}
                            >

                                <defs>

                                    <linearGradient
                                        id="colorRevenue"

                                        x1="0"
                                        y1="0"

                                        x2="0"
                                        y2="1"
                                    >

                                        <stop
                                            offset="5%"
                                            stopColor="#22c55e"
                                            stopOpacity={0.8}
                                        />

                                        <stop
                                            offset="95%"
                                            stopColor="#22c55e"
                                            stopOpacity={0}
                                        />

                                    </linearGradient>

                                </defs>

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                />

                                <XAxis dataKey="month" />

                                <YAxis />

                                <Tooltip />

                                <Area

                                    type="monotone"

                                    dataKey="revenue"

                                    stroke="#22c55e"

                                    fillOpacity={1}

                                    fill="url(#colorRevenue)"
                                />

                            </AreaChart>

                        </ResponsiveContainer>

                    </div>

                    {/* PIE CHART */}

                    <div className="analytics-card">

                        <h2>
                            🚚 Order Status
                        </h2>

                        <ResponsiveContainer
                            width="100%"
                            height={320}
                        >

                            <PieChart>

                                <Pie

                                    data={orderData}

                                    dataKey="value"

                                    outerRadius={110}

                                    label
                                >

                                    {
                                        orderData.map(

                                            (
                                                entry,
                                                index
                                            ) => (

                                                <Cell

                                                    key={`cell-${index}`}

                                                    fill={
                                                        COLORS[index]
                                                    }
                                                />
                                            )
                                        )
                                    }

                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                </div>

                {/* AI INSIGHTS */}

                <div className="ai-recommendations">

                    <h2>
                        🤖 AI Insights
                    </h2>

                    <div className="recommendation-grid">

                        <div className="recommendation-card">

                            <h3>
                                📈 Revenue Increasing
                            </h3>

                            <p>

                                Revenue has increased
                                by 32% this month.

                            </p>

                        </div>

                        <div className="recommendation-card">

                            <h3>
                                🚚 Delivery Speed
                            </h3>

                            <p>

                                Average delivery time
                                reduced to 14 mins.

                            </p>

                        </div>

                        <div className="recommendation-card">

                            <h3>
                                ⭐ Customer Satisfaction
                            </h3>

                            <p>

                                Customer ratings are
                                improving consistently.

                            </p>

                        </div>

                    </div>

                </div>
<NotificationCenter />
<LiveActivityFeed />
<AIInsightsPanel />
            </div>

        </>
    );
}

export default AdminDashboard;