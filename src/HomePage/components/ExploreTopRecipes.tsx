import { Link } from "react-router-dom";

export const ExploreTopRecipes = () => {
    return (
        <div className="p-5 bg-dark header">
            <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
                <div>
                    <h1 className="display-5 fw-bold">Find your next food</h1>
                    <p className="col-md-8 fs-4">What would you like to eat next?</p>
                    <Link type='button' className="btn main-color btn-lg text-white" to="/search">
                        Explore top recipes
                    </Link>
                </div>
            </div>
        </div>
    );
}