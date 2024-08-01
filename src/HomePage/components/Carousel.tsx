import { Link } from "react-router-dom";
import RecipeModel from "../../models/RecipeModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { ReturnRecipe } from "./ReturnRecipe";
import { useEffect, useState } from "react";
export const Carousel = () => {

    const [recipes, setrecipes] = useState<RecipeModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchrecipes = async () => {
            const baseUrl: string = "http://localhost:8080/api/recipes";
            const url: string = `${baseUrl}?page=0&size=9`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const responseJson = await response.json();
            const responseData = responseJson._embedded.recipes;
            const loadedrecipes: RecipeModel[] = [];

            for (const key in responseData) {
                loadedrecipes.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    description: responseData[key].description,
                    category: responseData[key].category,
                    img: responseData[key].img,
                    available: responseData[key].available
                });
            }
            setrecipes(loadedrecipes);
            setIsLoading(false);
        };
        fetchrecipes().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);

    if (isLoading) {
        return (
            <div className="container m-5">
                <SpinnerLoading />
            </div>
        )
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div className="container mt-5" style={{ height: 550 }}>
            <div className="homepage-carousel-title">
                <h3>Find your next "I stayed up too late ..."</h3>
            </div>
            <div id='carouselExampleControls' className="carousel carousel-dark slide mt-5 d-none d-lg-block" data-bs-interval='false'>
                {/* Desktop */}

                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row d-flex justify-content-center align-items-center">
                            {recipes.slice(0, 3).map(recipe => (
                                <ReturnRecipe recipe={recipe} key={recipe.id} />
                            ))}
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            {recipes.slice(3, 6).map(recipe => (
                                <ReturnRecipe recipe={recipe} key={recipe.id} />
                            ))}
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            {recipes.slice(6, 9).map(recipe => (
                                <ReturnRecipe recipe={recipe} key={recipe.id} />
                            ))}
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type='button'
                    data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                    <span className="carousel-control-prev-icon" aria-hidden='true'></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type='button'
                    data-bs-target='#carouselExampleControls' data-bs-slide='next'>
                    <span className="carousel-control-next-icon" aria-hidden='true'></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/*Mobile */}
            <div className="d-lg-none mt-3">
                <div className="row d-flex justify-content-center align-items-center">
                    <ReturnRecipe recipe={recipes[2]} key={recipes[2].id} />
                </div>
            </div>

            <div className="homepage-carousel-title mt-3">
                <Link className="btn btn-outline-secondary btn-lg" to='/search'>View more</Link>
            </div>
        </div >
    );
}