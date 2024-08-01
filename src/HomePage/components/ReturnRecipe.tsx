import React from "react";
import RecipeModel from "../../models/RecipeModel";

export const ReturnRecipe: React.FC<{ recipe: RecipeModel }> = (props) => {
    return (
        <div className="col-xs-6 col-sm-6 col-md-4 collg-3 mb-3">
            <div className="text-center">
                {
                    props.recipe.img ?
                        <img src={require('./../../Images/RecipesImages/' + props.recipe.img)}
                            alt="recipe" />
                        :
                        <img src={require('./../../Images/RecipesImages/Chopstick_with_nigiri.jpg')} alt="recipe"
                            width='151'
                            height='233'
                        />
                }

                <h6 className="mt-2">{props.recipe.title}</h6>
                <p>{props.recipe.category}</p>
                <a className="btn main-color text-white" href='www.google.com'>Reserve</a>
            </div>
        </div>
    );
}