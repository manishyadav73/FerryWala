import { useNavigate } from "react-router-dom";

const categories = [

    {
        name: "Sabjiwala",

        slug: "sabji",

        image:
            "https://images.unsplash.com/photo-1597362925123-77861d3fbac7"
    },

    {
        name: "Fruit Seller",

        slug: "fruits",

        image:
            "https://images.unsplash.com/photo-1573246123716-6b1782bfc499"
    },

    {
        name: "Chaiwala",

        slug: "chai",

        image:
            "https://images.unsplash.com/photo-1515442261605-65987783cb6a"
    },

    {
        name: "Street Snacks",

        slug: "snacks",

        image:
            "https://images.unsplash.com/photo-1601050690597-df0568f70950"
    },

    {
        name: "Clothes Vendor",

        slug: "clothes",

        image:
            "https://images.unsplash.com/photo-1529139574466-a303027c1d8b"
    },

    {
        name: "Toy Seller",

        slug: "toys",

        image:
            "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088"
    }
];

function Categories() {

    const navigate = useNavigate();

    return (

        <section className="categories">

            <h2>
                Explore Nearby Indian Vendors
            </h2>

            <div className="category-grid">

                {
                    categories.map((category, index) => (

                        <div
                            className="category-card"
                            key={index}

                            onClick={() =>

                                navigate(

                                    `/vendors/${category.slug}`
                                )
                            }
                        >

                            <img
                                src={`${category.image}?auto=format&fit=crop&w=1000&q=80`}
                                alt={category.name}
                            />

                            <div className="category-content">

                                <h3>
                                    {category.name}
                                </h3>

                                <p>
                                    Discover Local Indian {category.name}
                                </p>

                            </div>

                        </div>
                    ))
                }

            </div>

        </section>
    );
}

export default Categories;