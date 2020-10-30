const getState = ({ getStore, getActions, setStore }) => {
	const DEV_ROOT = "https://3000-f4686e89-3f28-4d9f-b041-346f4456ba04.ws-eu01.gitpod.io/";
	const BACKEND_ROOT = "https://questioner-back.herokuapp.com/";
	const LOGIN_ENDPOINT = "login";
	const CHECK_PROTECTED_ENDPOINT = "check-protected";
	const LOGOUT_ENDPOINT = "logout";
	const QUESTIONS_ENDPOINT = "questions";
	const QUESTION_ENDPOINT = "question";

	// Si aglo está en el flux (datos, array, ...) solo debe estar en el flux.
	// Por ejemplo, datos que van a ser usados en varias vistas.
	// Y solo métodos que manejan esos datos. Ojo, doFetch si porque es llamado desde
	// varios sitios.
	return {
		store: {
			questions: [
				{
					id: "1",
					title:
						"Getting a “java.sql.SQLException: You can't operate on a closed Statement”, with an open connection",
					description:
						"I have a program that makes several requests to a database, opening and closing connections to do what it needs to do. For each connection, it does a select that return 50 results and an update; it does this roughly 10 times per connection. After that, the connection is closed, and a new one is taken. But recently we have been having some random issues in which this SQL exception appears:",
					isAnswered: true,
					numberOfAnswers: 2
				},
				{
					id: "2",
					title:
						"Cannot connect to database with ASP.NET. System.InvalidOperationException: No service for type *Context has been registered",
					description:
						"I am new in C# and try to add the database connection to the MVC project with ASP.NET core:",
					isAnswered: true,
					numberOfAnswers: 3
				},
				{
					id: "3",
					title: "Linux Unity Editor Archive",
					description:
						"I want to install unity editor Linux version archive but I cannot find its link can. It is not being downloaded in unity hub due to slow network by I can download the archive in my phone so please send me the link of unity editor. It will help me a lot. I am trying to find link using Wireshark. But I cannot know how to use it.",
					isAnswered: false,
					numberOfAnswers: 0
				}
			],
			answers: [
				{
					id: "1",
					idQuestion: "1",
					title: "Prueba con esto",
					description: "Prueba con esto que seguro que te funciona.",
					isBestAnswer: false
				},
				{
					id: "2",
					idQuestion: "1",
					title: "Necesito mas datos",
					description:
						"You should probably start with a little theory and simple examples such as the midpoint displacement algorithm. You should also learn a little about Perlin Noise if you are interested in generating graphics. I used this to get me started with my final year project on procedural generation. Fractals are closely related to procedural generation. Terragen and SpeedTree will show you some amazing possibilities of procedural generation. Procedural generation is a technique that can be used in any language (it is definitely not restricted to procedural languages such as C, as it can be used in OO languages such as Java, and Logic languages such as Prolog). A good understanding of recursion in any language will strengthen your grasp of Procedural Generation.",
					isBestAnswer: false
				},
				{
					id: "3",
					idQuestion: "2",
					title: "Necesito mas datos",
					description:
						"You should probably start with a little theory and simple examples such as the midpoint displacement algorithm. You should also learn a little about Perlin Noise if you are interested in generating graphics. I used this to get me started with my final year project on procedural generation. Fractals are closely related to procedural generation. Terragen and SpeedTree will show you some amazing possibilities of procedural generation. Procedural generation is a technique that can be used in any language (it is definitely not restricted to procedural languages such as C, as it can be used in OO languages such as Java, and Logic languages such as Prolog). A good understanding of recursion in any language will strengthen your grasp of Procedural Generation.",
					isBestAnswer: false
				}
			],
			users: [
				{
					id: "1",
					name: "Diego Ezquerro Calvo",
					email: "diego.ezquerro@gmail.com",
					isActive: true
				},
				{
					id: "2",
					name: "kristen_khan",
					email: "kristen_khan@hotmail.com",
					isActive: true
				},
				{
					id: "3",
					name: "tuan_mccormick",
					email: "tuan_mccormick@aol.com",
					isActive: true
				},
				{
					id: "4",
					name: "kyung_prentice",
					email: "kyung_prentice@outlook.com",
					isActive: true
				},
				{
					id: "5",
					name: "lesha_iles",
					email: "lesha_iles@hotmail.com",
					isActive: true
				},
				{
					id: "6",
					name: "chris_buxton",
					email: "chris_buxton@gmail.com",
					isActive: true
				},
				{
					id: "7",
					name: "tamra_gould",
					email: "tamra_gould@gmail.com",
					isActive: true
				},
				{
					id: "8",
					name: "lurlene_bourne",
					email: "lurlene_bourne@aol.com",
					isActive: true
				}
			]
		},
		actions: {
			// TODO: añadir validación en los endpoints:
			// - @jwt_required --> en backend
			// const headers = { "Content-Type": "application/json", Authorization: "Bearer " + accessToken };
			fetchLogin: async data => {
				const headers = { "Content-Type": "application/json" };
				let json = await getActions().doFetch(BACKEND_ROOT + LOGIN_ENDPOINT, "POST", headers, data);

				if (json) {
					return json;
				}
			},
			fetchCheckProtected: async () => {
				const accessToken = localStorage.getItem("accessToken");
				const headers = { "Content-Type": "application/json", Authorization: "Bearer " + accessToken };
				let json = await getActions().doFetch(BACKEND_ROOT + CHECK_PROTECTED_ENDPOINT, "POST", headers);

				if (json) {
					return json;
				}
			},
			fetchLogout: async () => {
				const headers = { "Content-Type": "application/json" };
				let json = await getActions().doFetch(BACKEND_ROOT + LOGOUT_ENDPOINT, "POST", headers);

				if (json) {
					return json;
				}
			},
			doFetch: (endpoint, method, headers, data) => {
				let fetchOptions = {
					method: method,
					headers: headers,
					body: JSON.stringify(data)
				};
				// TODOs: header application/json aquí y body condicionarlo también a si
				// le paso algo en data.
				console.log("fetch");
				console.log(endpoint);
				console.log(fetchOptions);
				return fetch(endpoint, fetchOptions)
					.then(response => {
						if (response.ok) {
							return response.json();
						} else {
							throw Error(response.status);
						}
					})
					.catch(error => {
						// TODO: gestionar errores: 422
						alert(error);
						return null;
					});
			},
			fetchGetQuestons: async () => {
				const headers = { "Content-Type": "application/json" };
				let json = await getActions().doFetch(BACKEND_ROOT + QUESTIONS_ENDPOINT, "GET", headers);
				if (json) {
					return json;
				}
			},
			/*getAllQuestions: () => {
				let store = getStore();
				return store.questions;
            },*/
			fetchGetQuestionById: async id => {
				const headers = { "Content-Type": "application/json" };
				const data = {
					id: id
				};
				let json = await getActions().doFetch(BACKEND_ROOT + QUESTION_ENDPOINT + "/" + id, "GET");
				if (json) {
					return json;
				}
			},
			/*getQuestionById: id => {
				let store = getStore();
				var question = store.questions.find(obj => {
					return obj.id == id;
				});
				return question;
			},*/
			getAnswerById: id => {
				let store = getStore();
				var answer = store.answers.find(obj => {
					return obj.id == id;
				});
				return answer;
			},
			getAnswersByQuestionId: idQuestion => {
				let store = getStore();
				var answers = store.answers.filter(answer => {
					return answer.idQuestion == idQuestion;
				});
				return answers;
			},
			getAllUsers: () => {
				let store = getStore();
				return store.users;
			}
		}
	};
};

export default getState;
