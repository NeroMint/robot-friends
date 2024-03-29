import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import ErrorBoundry from './ErrorBoundry';




class App extends Component{
    constructor(){
        super();
        this.state = {
            robots: [],
            searchfield: ''        
        }
    }

    onSearchChange = (event) =>{
        //console.log(event.target.value);
        this.setState({searchfield: event.target.value});       
    }

    componentDidMount(){
        //console.log(this.props.store.getState());
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response =>{
            return response.json();
        })
        .then(users => {
            this.setState({robots:users})
        });    
    }

    render(){
        const {robots, searchfield} = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        });
        return !robots.length ? 
            <h1> Loading </h1> :        
            (
                <div className='tc'>
                    <h1 className='f1'> RobotFriends </h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundry>
                    </Scroll>                   
                </div>
            );     
        }   
}


export default App;