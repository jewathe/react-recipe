import { Link } from "react-router-dom";
import RecipeModel from "../../../models/RecipeModel";

export const SearchRecipe: React.FC<{ recipe: RecipeModel }> = (props) => {
    /*
     React.FC is a type that stands for "Function Component" in React. 
     It is a generic type that allows you to specify the props that a function component will accept.
     */
    return (
        <div className="card mt-3 shadow p-3 mb-3 bg-dody rounded">
            <div className="row g-0">
                <div className="col-md-3">
                    <div className="d-none d-lg-block">
                        {
                            props.recipe.img ?
                                <img src={require('../../../Images/RecipesImages/' + props.recipe.img)}
                                    height="250"
                                    width="280"
                                    alt="recipe" />
                                :
                                <img src={require('../../../Images/RecipesImages/Chopstick_with_nigiri.jpg')}
                                    width="100px"
                                    alt="recipe" />
                        }
                    </div>
                    {/*Mobile*/}
                    <div className="d-lg-none d-flex justify-content-center align-items-center">
                        {
                            props.recipe.img ?
                                <img src={require('../../../Images/RecipesImages/' + props.recipe.img)}
                                    width="100%"
                                    alt="recipe" />
                                :
                                <img src={require('../../../Images/RecipesImages/Chopstick_with_nigiri.jpg')}
                                    width="100%"
                                    alt="recipe" />
                        }
                    </div>
                </div>
                <div className="d-none d-lg-block col-md-6">
                    <div className="card-body">
                        <h4>
                            {props.recipe.title}
                        </h4>
                        <p>
                            {props.recipe.description}
                        </p>
                    </div>
                </div>
                {/*Mobile*/}
                <div className="d-lg-none d-block col-md-6 text-center">
                    <div className="card-body">
                        <h4>
                            {props.recipe.title}
                        </h4>
                        <p>
                            {props.recipe.description}
                        </p>
                    </div>
                </div>
                <div className="col-md-3 d-flex justify-content-center align-items-center">
                    <Link className="btn btn-md main-color text-white" to={`/checkout/${props.recipe.id}`} >
                        View details
                    </Link>
                </div>
            </div>
        </div >
    );
}