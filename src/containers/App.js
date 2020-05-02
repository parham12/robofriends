import React, { Fragment, Component } from "react"
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll'
import './App.css';


class App extends Component {
    
    constructor() {
        super();
        this.myRef = React.createRef();
        this.state = {
            robots: [],
            searchField: ''
        }
    }
    
    
    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value });
    }
    
    onCardClick = (event) => {
        const node = this.myRef.current;
         console.log(event.target);
    }
    
    
    render() {
        const {robots, searchField} = this.state;
        
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });
        
        return !robots.length ?
            <h1 className='tc'>Loading</h1> :
            (
            <Fragment>
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                <CardList robots={filteredRobots} handleClick={this.onCardClick}/>
                </Scroll>
            </div>
            </Fragment>
            );
    };


    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users} ));
    }
}
    

export default App;