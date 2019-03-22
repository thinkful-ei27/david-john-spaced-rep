import React from "react";
import { connect } from "react-redux";
import Correct from "./Correct";

function Messages(props) {
  const { textArea } = props;
  const messages = textArea.map(msg => {
    const { type, userName, value, score } = msg;
    if (type === "server") {
      return (
        <div
          className="bg-blue-lightest border-t border-b border-blue text-blue-dark px-4 py-3 mb-8"
          role="alert"
        >
          <p className="font-bold text-center">{value}</p>
        </div>
      );
    }
    return (
      <>
        <li className="mb-4">
          <span className="ml-2 mr-4 font-bold w-1/5">{userName}</span>
          <span className="w-4/5">{value}</span>
        </li>
        {type === "answer" ? <Correct userName={userName} score={score} /> : ""}
      </>
    );
  });
  return (
    <ul className="mt-8 list-reset w-full max-w-lg flex flex-col break-words">
      {messages}
    </ul>
  );
}

const mapStateToProps = state => {
  return {
    textArea: state.chatBox.textArea
  };
};

export default connect(mapStateToProps)(Messages);
