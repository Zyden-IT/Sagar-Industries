import * as endpoints from "../ApiEndPoints.js";
import { axiosPost } from "../AxiosRequests.js";

// Product related services
export const userLogin = (req) => axiosPost(endpoints.UserLogin, req);
