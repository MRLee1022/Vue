import httpRequest from './http';

const api = {
	test(param){
		return httpRequest.get('/test',param);
	}
}




export default api