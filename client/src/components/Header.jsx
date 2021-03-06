import React from 'react';
import { Menu, Button, Dropdown, Divider} from 'semantic-ui-react'
import { Link } from 'react-router';
import Search from './Search.jsx'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleItemClick = this.handleItemClick.bind(this);
  }
  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state
    console.log('this.props.loggedIn', this.props.loggedIn);

    return (
      <Menu fixed='top'>
        <Menu.Item as={Link} to='/'name='smart' active={activeItem === 'smart'} onClick={this.handleItemClick}>SMart</Menu.Item>
        <Menu.Item>
          <Search searchData={this.props.searchData}/>
        </Menu.Item>
        <Menu.Menu position='right'>
          {this.props.loggedIn ? (
            <Dropdown item text={this.props.appState.user.first_name}>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={`/u/${this.props.appState.user.id}/selling`}>My Profile</Dropdown.Item>
                <Divider />
                <a href='/logout'><Dropdown.Item onClick={this.props.logout}>Log Out</Dropdown.Item></a>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Menu.Item as={Link} to='/login' name='Log in' active={activeItem === 'Log in'} onClick={this.handleItemClick} >
              <Button basic color='red' >
                Log in
              </Button>
            </Menu.Item>
          )}
          <Menu.Item position='right' as={Link} to='/post' name='Sell Your Stuff' active={activeItem === 'Sell Your Stuff'} onClick={this.handleItemClick} >
            <Button color='red'>
              Sell Your Stuff
            </Button>
          </Menu.Item>
        </Menu.Menu>      
      </Menu>      
    );
  }
}

export default Header;




// <Menu.Item as={Search}></Menu.Item>
       
// import React from 'react';
// import { Menu } from 'semantic-ui-react'
// import { Link } from 'react-router';

// class Header extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }


//   render() {
//     return (
//       <nav className="navbar navbar-default">
//         <div className="container-fluid">
//           <div className="navbar-header">
//             <a className="navbar-brand" href="#">sMart</a>
//             <form className="navbar-form navbar-left" role="search">
//               <div className="form-group">
//                 <input type="text" className="form-control" placeholder="What are you looking for?" />
//               </div>
//               <button type="submit" className="btn btn-default">Search</button>
//             </form>              
//             <div className="navbar-right">
//             <Link to='login' type="button" className="btn btn-default navbar-btn">Log in</Link>
//             <button type="button" className="btn btn-default navbar-btn">Sell Your Stuff</button>
//             </div>
//           </div>
//         </div>
//       </nav>   
//     );
//   }
// }

// export default Header;

