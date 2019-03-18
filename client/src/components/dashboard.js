import React from "react";
import { connect } from "react-redux";
import requiresLogin from "./requires-login";
import { fetchProtectedData } from "../actions/protected-data";
import AnswerInput from "./AnswerInput";

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProtectedData());
  }

  render() {
    let data = ["¡Hola!", "buenos días", "Buenas tardes", "Buenas noches", "Me llamo", "Gracias", "De nada"];
    let dataIndex = 0;
    return (
      <div className="dashboard container mx-auto mt-32">
        <div className="answer-box bg-white rounded flex flex-col justify-center items-center">
          <p className="text-xl">Type the right answer</p>
          <p className="text-5xl mt-8">{data[]}</p>
          <AnswerInput
            type="text"
            placeholder="Type english answer here"
            callback={val => console.log(val)}
            className="mt-8 max-w-sm shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex flex-row justify-around mt-4">
          <button
            type="button"
            className="text-grey-darkest font-bold py-2 px-4 rounded"
          >
            Skip
          </button>
          <button
            type="button"
            className="bg-orange hover:bg-orange-dark text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    protectedData: state.protectedData.data
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
