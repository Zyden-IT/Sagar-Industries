import axios from "axios";
import * as endpoints from "../ApiEndPoints.js";
import { axiosPost } from "../AxiosRequests.js";

//Contact us api
export const contactUs = (req) => axiosPost(endpoints.ContactUs, req);