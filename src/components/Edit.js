import React, { Component } from 'react'
import axios from 'axios';
import { resolvePreset } from '@babel/core';
import {Redirect} from 'react-router';
export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            redirect:false
        }
    }

    componentDidMount() {
        
        axios.get('http://localhost/ReactPHPCRUD/getById.php?id=' + this.props.match.params.id).then((res) => {
         
            this.setState({
                first_name: res.data.fName,
                last_name: res.data.lName,
                email: res.data.email
            })
        }).catch(function(error){
            console.log(error)
        })
    }
    onChangeFirstName(e) {
        this.setState({
            first_name: e.target.value
        })
    }
    onChangeLastName(e) {
        this.setState({
            last_name: e.target.value
        })
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault();
        const obj = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email
        }
        axios.post('http://localhost/ReactPHPCRUD/update.php?id='+this.props.match.params.id, obj).then(res=>{
            this.setState({redirect: true})
            console.log(res.data)
        })
    }
    render() {
        const{redirect} = this.state;
        if(redirect){
            return <Redirect to='/view'/>;
        }
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Add New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>First Name:</label>
                        <input type="text" className="form-control" value={this.state.first_name} onChange={this.onChangeFirstName} />
                    </div>
                    <div className="form-group">
                        <label>Last Name:</label>
                        <input type="text" className="form-control" value={this.state.last_name} onChange={this.onChangeLastName} />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="text" className="form-control" value={this.state.email} onChange={this.onChangeEmail} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update User" className="btn btn-primary" /></div>
                </form>
            </div>
        )
    }
}