const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			questions: [
				{
					id: "1",
					title: "Question 1",
					description: "description 1"
				},
				{
					id: "2",
					title: "Question 2",
					description: "description 2"
				},
				{
					id: "3",
					title: "Question 3",
					description: "description 3"
				}
			]
		},
		actions: {
			getAllQuestions: () => {
				let store = getStore();
				return store.questions;
			},
			getQuestionById: id => {
				let store = getStore();
				var question = store.questions.find(obj => {
					return obj.id == id;
				});
				return question;
			}
		}
	};
};

export default getState;
