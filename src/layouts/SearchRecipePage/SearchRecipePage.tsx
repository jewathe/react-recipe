import RecipeModel from "../../models/RecipeModel";
import { useEffect, useState } from "react";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { SearchRecipe } from "./components/SearchRecipe";
import { Pagination } from "../../Utils/Pagination";

export const SearchRecipePage = () => {

    const [recipes, setrecipes] = useState<RecipeModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(5);
    const [totalAmountOfrecipes, setTotalAmountOfrecipes] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    const [categorySelection, setCategorySelection] = useState('Recipe category');

    useEffect(() => {
        const fetchrecipes = async () => {
            const baseUrl: string = "http://localhost:8080/api/recipes";
            let url: string = '';
            if (searchUrl === '') {
                url = `${baseUrl}?page=${currentPage - 1}&size=${recipesPerPage}`;
            } else {
                let searchWithPage = searchUrl.replace('<pageNumber>', `${currentPage - 1}`);
                url = baseUrl + searchWithPage;
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const responseJson = await response.json();
            const responseData = responseJson._embedded.recipes;
            setTotalAmountOfrecipes(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);
            const loadedrecipes: RecipeModel[] = [];

            for (const key in responseData) {
                loadedrecipes.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    description: responseData[key].description,
                    category: responseData[key].category,
                    img: responseData[key].img
                });
            }
            setrecipes(loadedrecipes);
            setIsLoading(false);
        };
        fetchrecipes().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0);
    }, [currentPage, searchUrl]);

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
    const searchHandleChange = () => {
        setCurrentPage(1);
        if (search === '') {
            setSearchUrl('');
        } else {
            setSearchUrl(`/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${recipesPerPage}`);
        }
        setCategorySelection('Recipe Category');
    }

    const categoryField = (value: string) => {
        setCurrentPage(1);
        if (
            value.toLowerCase() === 'pizza' ||
            value.toLowerCase() === 'sandwich' ||
            value.toLowerCase() === 'spaghetti' ||
            value.toLowerCase() === 'sushi'
        ) {
            setCategorySelection(value);
            setSearchUrl(`/search/findByCategory?category=${value}&page=<pageNumber>&size=${recipesPerPage}`);
        } else {
            setCategorySelection('All');
            setSearchUrl(`?page=<pageNumber>&size=${recipesPerPage}`);
        }
    }

    const indexOfLastRecipe: number = currentPage * recipesPerPage;
    const indexOfFirstRecipe: number = indexOfLastRecipe - recipesPerPage;
    let lastItem = recipesPerPage * currentPage <= totalAmountOfrecipes ?
        recipesPerPage * currentPage : totalAmountOfrecipes;
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-6">
                        <div className="d-flex">
                            <input className="form-control me-2" type="search"
                                placeholder="Search" aria-labelledby="Search"
                                onChange={e => setSearch(e.target.value)} />
                            <button className="btn btn-outline-succes"
                                onClick={() => searchHandleChange()}>
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button"
                                id="dropdownMenuButton1" data-bs-toggle="dropdown">
                                {categorySelection}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li onClick={() => categoryField('All')}>
                                    <a className="dropdown-item" href="#">All</a>
                                </li>
                                <li onClick={() => categoryField('Pizza')}>
                                    <a className="dropdown-item" href="#">Pizza</a>
                                </li>
                                <li onClick={() => categoryField('Sandwich')}>
                                    <a className="dropdown-item" href="#">Sandwich</a>
                                </li>
                                <li onClick={() => categoryField('Spaghetti')}>
                                    <a className="dropdown-item" href="#">Spaghetti</a>
                                </li>
                                <li onClick={() => categoryField('Sushi')}>
                                    <a className="dropdown-item" href="#">Sushi</a>
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div className="mt-3">
                        {totalAmountOfrecipes > 0 ?
                            <>
                                <h5>Number of results: ({totalAmountOfrecipes})</h5>
                                <p>
                                    {indexOfFirstRecipe + 1} to {lastItem} of {totalAmountOfrecipes} items:
                                </p>
                                {recipes.map(recipe => (
                                    < SearchRecipe recipe={recipe} key={recipe.id} />
                                ))}
                            </>
                            :
                            <div className="m-5">
                                <h3>
                                    Cn't find what you are looking for?
                                </h3>
                                <a type='button' className="btn main-color btn-md px-4 me-md-2 fw-bold text-white"
                                    href='#'>Food Services</a>
                            </div>
                        }
                        {totalPages > 1 &&
                            <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}