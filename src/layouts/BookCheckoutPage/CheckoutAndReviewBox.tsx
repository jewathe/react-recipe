import { Link } from "react-router-dom";
import RecipeModel from "../../models/RecipeModel";
export const CheckoutAndReviewBox: React.FC<{ recipe: RecipeModel | undefined, mobile: boolean }> = (props) => {
    return (
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-4 container d-flex mb-5'}>
            <div className="card-body container">
                <div className="mt-3">
                    <p>
                        <b>0/5</b>
                        Recipe checked out
                    </p>
                    <hr />
                    {props.recipe?.available === true ?
                        <h5 className="text-success">Available</h5>
                        :
                        <h5 className="text-danger">
                            Wait list
                        </h5>
                    }
                </div>
                <div className="row">
                    <p className="col-6 lead">
                        Very requested.
                    </p>
                    <p className="col-6 lead">
                        Good choice.
                    </p>
                </div>
                <Link to="/#" className="btn btn-success btn-lg">Sign in</Link>
                <hr />
                <p>
                    Sign to be able to leave a review.
                </p>
            </div>
        </div>
    );
}