import Modal from "react-modal";
import React from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Answers } from "../api/answers.js";

class ModalComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			answer: ""
		};
	}

	onChange(event) {
		this.setState({
			answer: event.target.value
		});
	}

	onClick() {
		Meteor.call(
			"Answers.insert", // method name
			this.state.answer, // parameter
			this.props.postID,
			// arrow function
			(err, res) => {
				if (err) {
					alert("There was error inserting. Check the console.");
					console.log(err);
				}

				console.log("Answer submitted", res);

				this.setState({
					topic: ""
				});
			}
		);

		this.setState({ 
			isOpen: false 
		});
		
	}

	renderSubmittedAnswer() {
		let matchedAnswer = this.props.Answers.filter(a => a.parentId === this.props.postID);

		return  matchedAnswer.map(a => (
			<div key={a._id}>
				Author {a.author} : {a.content}

				<button>{a.likes}</button>
			</div>
		));
	}

	render() {
		return (
			<div>
				<button onClick={() => this.setState({ isOpen: true })}>
					{" "}
					+ Add my answer
				</button>

				<Modal
					isOpen={this.state.isOpen}
					contentLabel="Follow the topic"
					ariaHideApp={false}
				>
					<p>Try to finish the story</p>

					<form>
						<input
							type="text"
							placeholder="your answer"
							value={this.state.answer}
							onChange={this.onChange.bind(this)}
						/>
					</form>

					<button onClick={this.onClick.bind(this)}>
						{" "}
						Submit{" "}
					</button>
				</Modal>

				<div className="answer">{this.renderSubmittedAnswer()}</div>
			</div>
		);
	}
}

ModalComponent.propTypes = {
	postID: PropTypes.string.isRequired,
	Answers: PropTypes.arrayOf(PropTypes.object).isRequired
};

// higher order component
export default withTracker(() => {
	const handle1 = Meteor.subscribe("answers");
	return {
		Answers: Answers.find({}).fetch(),
		author: Meteor.user(),
		ready: handle1.ready()
	};
})(ModalComponent);








