import React ,{Component} from 'react';
import {Navbar,NavbarBrand} from 'reactstrap';
import Menu from './Menucomponents';
import {DISHES} from '../shared/dishes';
import DishDetail from './DishdetailComponent';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state ={
      dishes:DISHES,
      selectedDish:null
    };
  }
  onDishSelect(dishID){
    this.setState({
        selectedDish: dishID
    });
}
  render(){
  return (
    <div>
      <Navbar dark color="primary">
      <div className='container'>
      <NavbarBrand href="/">Restuarant</NavbarBrand>
      </div>
      </Navbar>
      <Menu dishes={this.state.dishes} 
      onClick={(dishID)=> this.onDishSelect(dishID)}/>
      <DishDetail 
        dish={this.state.dishes.filter((dish)=> dish.id === this.state.selectedDish)[0]} />
    </div>
  );
  }
}

export default Main;
