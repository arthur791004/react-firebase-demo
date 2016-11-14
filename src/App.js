import React, { Component } from 'react';
import * as firebase from 'firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleReplace = this.handleReplace.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.firebaseRef = firebase.database().ref().child('react-firebase');
    this.state = {};
  }

  componentWillMount() {
    this.firebaseRef.on('value', snapshots => {
      const items = {};
      snapshots.forEach(snapshot => {
        items[snapshot.key] = snapshot.val();
      });

      this.setState({
        items,
      });
    });
  }

  componentWillUnmount() {
    this.firebaseRef.off();
  }

  handleCreate() {
    console.log('handleCreate');
    this.firebaseRef.push({
      name: 'firebase',
      description: 'create',
    });
  }

  handleReplace(key) {
    console.log('handleReplace', key);
    this.firebaseRef.child(key).set({
      description: 'replace',
    });
  }

  handleUpdate(key) {
    console.log('handleUpdate', key);
    this.firebaseRef.child.key.update({
      description: 'update',
    });
  }

  handleDelete(key) {
    console.log('handleDelete', key);
    this.firebaseRef.child(key).remove();
  }

  render() {
    const items = this.state.items || {};
    return (
      <div>
        <input type="button" value="create" onClick={this.handleCreate} />
        {
          Object.keys(items).map(key => {
            const value = JSON.stringify(items[key], null, 2);
            return (
              <div key={key}>
                <pre>{key}: {value}</pre>
                <input type="button" value="replace" onClick={() => this.handleReplace(key)} />
                <input type="button" value="update" onClick={() => this.handleUpdate(key)} />
                <input type="button" value="delete" onClick={() => this.handleDelete(key)} />
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default App;
