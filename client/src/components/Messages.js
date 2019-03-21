import React from "react";
import { connect } from "react-redux";
import Correct from "./Correct";

function Messages(props) {
  const { textArea } = props;
  const messages = textArea.map(msg => {
    const { type, userName, value } = msg;
    return (
      <>
        <li className="mb-4">
          <span className="ml-2 mr-4 font-bold w-1/5">{userName}</span>
          <span className="w-4/5">{value}</span>
        </li>
        {type === "answer" ? <Correct userName={userName} /> : ""}
      </>
    );
  });
  return (
    <ul className="mt-8 list-reset w-full max-w-lg h-64 max-h-lg flex flex-col break-words overflow-auto">
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
