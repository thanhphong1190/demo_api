import React, { Component } from 'react';
import { Table, Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import './Users.css';
import Pagination from "../common/pagination/Pagination";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params: {
                page: 1
            },
            totalPages: 0,
            page: 1,
            userData: []
        };
    }

    handlePageClick = e => {
        this.setState(
            {
                params: {
                    page: e.selected + 1
                }
            },
            () => this.getUserData()
        )
    }

    componentDidMount() {
        this.getUserData();
    }

    getUserData = () => {
        const { params } = this.state;
        axios.get('https://reqres.in/api/users', { params })
            .then(response => {
                const responseData = response.data;
                this.setState({ userData: responseData.data, totalPages: responseData.total_pages, page: responseData.page })
            })
            .catch(error => {
                console.log(error);
            });
    }


    render() {
        const { userData, totalPages, page } = this.state;
        return (
            <div className="Users">
                <Container>
                    <h2>Manage Users</h2>
                    <div className="UserData">
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Avatar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userData && userData.length > 0 && userData.map(user => {
                                        return (
                                            <tr key={user.id}>
                                                <td>{user.email}</td>
                                                <td>{user.first_name}</td>
                                                <td>{user.last_name}</td>
                                                <td><img className="UserAvatar" src={user.avatar} alt="user avatar" /></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                        <Pagination
                            totalPages={totalPages}
                            page={page}
                            pageRangeDisplayed={3}
                            onPageChange={this.handlePageClick}
                        />
                    </div>
                </Container>
            </div>
        );
    }
}

export default Users;