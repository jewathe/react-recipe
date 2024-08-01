import { useEffect, useState } from "react";
import RecipeModel from "../../models/RecipeModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { StarsReview } from "../../Utils/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import ReviewModel from "../../models/ReviewModel";
import { LatestReviews } from "./LatestReviews";




export const RecipeCheckoutPage = () => {

    const [recipe, setrecipe] = useState<RecipeModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // Review State
    const [reviews, setRevews] = useState<ReviewModel[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);

    const recipeId = (window.location.pathname).split('/')[2];
    useEffect(() => {
        const fetchrecipe = async () => {
            const baseUrl: string = `http://localhost:8080/api/recipes/${recipeId}`;

            const response = await fetch(baseUrl);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const responseJson = await response.json();
            const loadedrecipe: RecipeModel = {
                id: responseJson.id,
                title: responseJson.title,
                description: responseJson.description,
                category: responseJson.category,
                img: responseJson.img,
                available: responseJson.available
            };

            setrecipe(loadedrecipe);
            setIsLoading(false);
        };
        fetchrecipe().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);

    useEffect(() => {
        const fetchRecipeReviews = async () => {
            const reviewUrl = `http://localhost:8080/api/reviews/search/findByRecipeId?recipeId=${recipeId}`;
            const responseReviews = await fetch(reviewUrl);
            if (!responseReviews.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJsonReviews = await responseReviews.json();
            const responseData = responseJsonReviews._embedded.reviews;

            const loadedReviews: ReviewModel[] = [];

            let weightedStarReviews: number = 0;

            for (const key in responseData) {
                loadedReviews.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    recipe_id: responseData[key].recipeId,
                    reviewDescription: responseData[key].reviewDescription
                })
                weightedStarReviews = weightedStarReviews + responseData[key].rating;
            }
            if (loadedReviews) {
                const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1);
                setTotalStars(Number(round));
            }
            setRevews(loadedReviews);
            setIsLoadingReview(false);
        };

        fetchRecipeReviews().catch((error: any) => {
            setIsLoadingReview(false);
            setHttpError(error.message);
        })
    }, []);

    if (isLoading || isLoadingReview) {
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
        <div>
            <div className="container d-none d-lg-block">
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-2 col-lg-3">
                        {recipe?.img ?
                            <img src={require('./../../Images/RecipesImages/' + recipe?.img)} alt="recipe" />
                            :
                            <img src={require('./../../Images/RecipesImages/Chopstick_with_nigiri.jpg')} alt="recipe"
                                width='151'
                                height='233'
                            />
                        }
                    </div>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h5>{recipe?.title}</h5>
                            <h6 className='text-primary'>
                                {recipe?.category}
                            </h6>
                            <p className="lead">{recipe?.description}</p>
                            <StarsReview rating={totalStars} size={32} />
                        </div>
                    </div>
                    <CheckoutAndReviewBox recipe={recipe} mobile={false} />
                    <hr />
                    <LatestReviews reviews={reviews} recipeId={Number(recipe?.id)} mobile={false} />
                </div>
                <hr />
            </div>
            <div className="container d-lg-none mt-5">
                <div className="d-flex justify-content-center align-items-center">
                    {recipe?.img ?
                        <img src={require('./../../Images/RecipesImages/' + recipe?.img)} alt="recipe"
                            width="100%" />
                        :
                        <img src={require('./../../Images/RecipesImages/Chopstick_with_nigiri.jpg')} alt="recipe"
                            width="100%"
                        />
                    }
                </div>

                {/*Mobile*/}
                <div className="mt-4 d-lg-none d-block">
                    <div className="ml-2">
                        <h5 className="text-center">{recipe?.title}</h5>
                        <p className="lead">{recipe?.description}</p>
                        <StarsReview rating={totalStars} size={32} />
                    </div>
                </div>
                <CheckoutAndReviewBox recipe={recipe} mobile={true} />
                <hr />
                <LatestReviews reviews={reviews} recipeId={Number(recipe?.id)} mobile={true} />
            </div>
        </div>
    )
}