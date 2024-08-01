import { Carousel } from "./components/Carousel";
import { RecipeServices } from "./components/RecipeServices";
import { ExploreTopRecipes } from "./components/ExploreTopRecipes";
import { Heros } from "./components/Heros";

export const HomePage = () => {
    return (
        <>
            <ExploreTopRecipes />
            <Carousel />
            <Heros />
            <RecipeServices />
        </>
    );
}