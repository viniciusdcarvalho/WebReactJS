import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';

class App extends Component {
  state = {
    usuarios: [],
    newUsuarioData: {
      nome: '',
      celular: ''
    },
    editUsuarioData: {
      id: '',
      nome: '',
      celular: ''
    },
    newUsuarioModal: false,
    editUsuarioModal: false
  }
  componentWillMount() {
    this._refreshUsuarios();
  }
  toggleNewUsuarioModal() {
    this.setState({
      newUsuarioModal: ! this.state.newUsuarioModal
    });
  }
  toggleEditUsuarioModal() {
    this.setState({
      editUsuarioModal: ! this.state.editUsuarioModal
    });
  }
  addUsuario() {
    let {nome, celular } = this.state.newUsuarioData;
      axios.post('http://localhost:5000/usuarios', 
    { nome, celular
    }).then((response) => {
        this._refreshUsuarios();
  
        this.setState({
          newUsuarioModal: false, newUsuarioData: { nome: '', celular: '' }
        })
      });
    }
  updateUsuario() {
    let {id, nome, celular } = this.state.editUsuarioData;

    axios.put('http://localhost:5000/usuarios/', {
      id, nome, celular
    }).then((response) => {
      this._refreshUsuarios();

      this.setState({
        editUsuarioModal: false, editUsuarioData: { id: '', nome: '', celular: '' }
      })
    });
  }
  editUsuario(id, nome, celular) {
    this.setState({
      editUsuarioData: { id, nome, celular }, editUsuarioModal: ! this.state.editUsuarioModal
    });
  }
  deleteUsuario(id) {
    axios.delete('http://localhost:5000/usuarios/' + id,{
    data: {id: id}
      }).then((response) => {
      this._refreshUsuarios();
    });
  }
  _refreshUsuarios() {
    axios.get('http://localhost:5000/usuarios').then((response) => {
      this.setState({
        usuarios: response.data
      })
    });
  }
  render() {
    let usuarios = this.state.usuarios.map((usuarios) => {
      return (
        <tr key={usuarios.id}>
          <td>{usuarios.id}</td>
          <td>{usuarios.nome}</td>
          <td>{usuarios.celular}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editUsuario.bind(this, usuarios.id, usuarios.nome, usuarios.celular)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteUsuario.bind(this, usuarios.id)}>Delete</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">

      <h1>Usuarios App</h1>

      <Button className="my-3" color="primary" onClick={this.toggleNewUsuarioModal.bind(this)}>Add Usuario</Button>

      <Modal isOpen={this.state.newUsuarioModal} toggle={this.toggleNewUsuarioModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewUsuarioModal.bind(this)}>Add a new usuarios</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="nome">Nome</Label>
            <Input id="nome" value={this.state.newUsuarioData.nome} onChange={(e) => {
              let { newUsuarioData } = this.state;

              newUsuarioData.nome = e.target.value;

              this.setState({ newUsuarioData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="celular">Celular</Label>
            <Input id="celular" value={this.state.newUsuarioData.celular} onChange={(e) => {
              let { newUsuarioData } = this.state;

              newUsuarioData.celular = e.target.value;

              this.setState({ newUsuarioData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addUsuario.bind(this)}>Add Usuario</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewUsuarioModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.editUsuarioModal} toggle={this.toggleEditUsuarioModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditUsuarioModal.bind(this)}>Edit a new usuarios</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="nome">nome</Label>
            <Input id="nome" value={this.state.editUsuarioData.nome} onChange={(e) => {
              let { editUsuarioData } = this.state;

              editUsuarioData.nome = e.target.value;

              this.setState({ editUsuarioData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="celular">Celular</Label>
            <Input id="celular" value={this.state.editUsuarioData.celular} onChange={(e) => {
              let { editUsuarioData } = this.state;

              editUsuarioData.celular = e.target.value;

              this.setState({ editUsuarioData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateUsuario.bind(this)}>Update Usuario</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditUsuarioModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>


        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Celular</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {usuarios}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
