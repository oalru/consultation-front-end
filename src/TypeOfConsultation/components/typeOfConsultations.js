import React from 'react';
import { getAllTypeOfConsultation, deleteTypeOfConsultationByID } from '../api';

import TypeOfConsultation from './typeOfConsultation';
import { Link } from 'react-router-dom';

class TypeOfConsultations extends React.Component {
  componentDidMount() {
    getAllTypeOfConsultation()
      .then((response) => {
        this.props.setTypeOfConsultations(response.data.typeOfConsultations);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteTypeOfConsultation = (id) => {
    deleteTypeOfConsultationByID(id,this.props.user)
      .then((response) => {
        const newTypeOfConsultationsList = this.props.typeOfConsultations.filter((typeOfConsultation) => {
          return typeOfConsultation._id !== id;
        });

        this.props.setTypeOfConsultations(newTypeOfConsultationsList);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log(this.props);

    let allTypeOfConsultations = <h2>No Type Of Consultations</h2>

    if (this.props.typeOfConsultations.length > 0) {
      allTypeOfConsultations = this.props.typeOfConsultations.map((typeOfConsultation, index) => {
        return <TypeOfConsultation
          user={this.props.user}
          category={typeOfConsultation.category}
          description={typeOfConsultation.description}
          image={typeOfConsultation.image}
          id={typeOfConsultation._id}
          typeOfConsultation={typeOfConsultation}
          deleteTypeOfConsultation={this.deleteTypeOfConsultation}
          key={index} />;
      });
    }

    return (
      <div>
        <Link to='/typeOfConsultation/createTypeOfConsultation'> <button>Create Type Of Consultation</ button> </ Link>
        {allTypeOfConsultations}
      </ div>
    );;
  }
}

export default TypeOfConsultations; 