import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { HomePage } from './HomePage/HomePage';
import { SearchRecipe } from './layouts/SearchRecipePage/components/SearchRecipe';
import { SearchRecipePage } from './layouts/SearchRecipePage/SearchRecipePage';
import { Redirect, Route, Switch } from 'react-router-dom';
import { RecipeCheckoutPage } from './layouts/BookCheckoutPage/RecipeCheckoutPage';


export const App = () => {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
      <div className='flex-grow-1'>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/home' />
          </Route>
          <Route path='/home'>
            <HomePage />
          </Route>
          <Route path='/search'>
            <SearchRecipePage />
          </Route>
          <Route path='/checkout/:bookId'>
            <RecipeCheckoutPage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>

  );
}


