import {

    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer

} from "recharts";

function VendorAnalytics() {

    // GET ORDERS
    const storedOrders = JSON.parse(
        localStorage.getItem("vendorOrders")
    ) || [];

    // TOTAL REVENUE
    const totalRevenue = storedOrders.reduce(

        (sum, order) =>

            sum + (order.totalAmount || 0),

        0
    );

    // TOTAL ORDERS
    const totalOrders = storedOrders.length;

    // PRODUCT ANALYTICS
    const productMap = {};

    storedOrders.forEach((order) => {

        order.items?.forEach((item) => {

            if (!productMap[item.name]) {

                productMap[item.name] = 0;
            }

            productMap[item.name] += item.quantity;
        });
    });

    // CHART DATA
    const chartData = Object.keys(productMap).map(

        (product) => ({

            name: product,

            sales: productMap[product]
        })
    );

    return (

        <div className="analytics-container">

            <h2 className="analytics-title">

                📊 Vendor Analytics

            </h2>

            {/* TOP CARDS */}

            <div className="analytics-cards">

                <div className="analytics-card">

                    <h3>
                        💰 Total Revenue
                    </h3>

                    <p>
                        ₹ {totalRevenue}
                    </p>

                </div>

                <div className="analytics-card">

                    <h3>
                        📦 Total Orders
                    </h3>

                    <p>
                        {totalOrders}
                    </p>

                </div>

                <div className="analytics-card">

                    <h3>
                        🚀 AI Growth
                    </h3>

                    <p>
                        +{Math.min(totalOrders * 12, 95)}%
                    </p>

                </div>

            </div>

            {/* SALES CHART */}

            <div className="chart-box">

                <h3>
                    🔥 Top Selling Products
                </h3>

                <ResponsiveContainer
                    width="100%"
                    height={300}
                >

                    <BarChart data={chartData}>

                        <XAxis dataKey="name" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="sales"
                            fill="#2563eb"
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}

export default VendorAnalytics;