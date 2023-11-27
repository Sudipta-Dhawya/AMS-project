import { getAccessKey, getUserCredential, setAccessKey } from './auth.login';


class ServerConnector {

	constructor() {
	}

	async postData(json_data, success, failed) {

		json_data["_access_key"] = getAccessKey();
		let userDetails = getUserCredential();
		if (userDetails !== null) {
		
			if (!json_data.hasOwnProperty("mobile_number")) {
				if (userDetails._mobile_number.length !== 0) {
					json_data["mobile_number"] = userDetails._mobile_number;
				}
			}
			if (!json_data.hasOwnProperty("password")) {
				if (userDetails._password.length !== 0) {
					json_data["password"] = userDetails._password;
				}
			}
		}

		const requestOptions = {
			method: 'POST',
			headers: {
				// 'Content-Type': 'application/json',
				// 'Access-Control-Allow-Origin': 'http://localhost:3000'
			},
			body: JSON.stringify(json_data)
		};

		consoleData(getUrlPath(json_data._action_code));
		consoleData(requestOptions);
		try {
			const response = await fetch(getUrlPath(json_data._action_code), requestOptions);
			if (response.status == 500) {
				failed("500", "There is an issue detected at the server side.", null);
			}
			else if (response.status != 200) {
				failed("200", "Could not connect to the server. Please try again later.", null);
			}
			else {
				try {
					const resultData = await response.json();
					consoleData("Response for " + json_data._action_code + ": ");
					consoleData(resultData);
					if (resultData._access_key && resultData._access_key.length > 0) {
						
						setAccessKey(resultData._access_key);

					}
					if (resultData.status == "SUCCESS") {
						if (success != null) {
							success(resultData);
						}
					}
					else {
						if (failed != null) {
							failed(resultData.err_cd, resultData.msg, resultData);
						}
					}

				} catch (error) {
					consoleData("Error for " + json_data._action_code + ": ");
					consoleData(error);
					failed("PARSE_ERROR", "The server returned nothing!", null);
				}
			}

		} catch (error) {
			consoleData("Error for " + json_data._action_code + ": ");
			consoleData(error);
			failed("UNKNOWN_ERROR", "Could not reach server. (" + error + ")", null);
		}
	}
}

function consoleData(data) {
	console.log(data);

}

function getUrlPath(_action_code) {
	let baseUrl = "http://www.archimageworks.com:12000";
	return `${baseUrl}/attendance/adminservice`;
}

export default ServerConnector;
